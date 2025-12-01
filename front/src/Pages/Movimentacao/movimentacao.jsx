import React, { useState, useEffect } from "react";
import axios from "axios";
import './movimentacao.css'
import Header from '../../Components/Header/header'

export default function Movimentacao() {
    const [produtos, setProdutos] = useState([])
    const [movimentacoes, setMovimentacoes] = useState([])
    const [produtoId, setProdutoId] = useState("")
    const [tipo, setTipo] = useState("entrada")
    const [quantidade, setQuantidade] = useState(0)
    const token = localStorage.getItem('token')

    // Buscar produtos para o select
    useEffect(() => {
        if (!token) return

        axios.get('http://127.0.0.1:8000/api/produtos/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setProdutos(res.data))
        .catch(err => console.log(err))
    }, [])

    // Buscar movimentações recentes
    useEffect(() => {
        if (!token) return

        axios.get('http://127.0.0.1:8000/api/movimentacao/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setMovimentacoes(res.data))
        .catch(err => console.log(err));
    }, []);

    // Criar movimentação
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!produtoId || quantidade <= 0) return alert("Preencha todos os campos corretamente.")

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/movimentacao/', {
                produto_id: produtoId,
                tipo,
                quantidade: parseInt(quantidade)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            // Atualiza lista de movimentações
            setMovimentacoes([response.data, ...movimentacoes])
            // Reseta formulário
            setProdutoId("");
            setQuantidade(0);
            setTipo("entrada");
        } catch (err) {
            console.log(err);
            alert("Erro ao registrar movimentação.")
        }
    }

    return (
        <>
            <Header/>

            <div className="mov-container">
                <div className="mov-box">
                    <h2>Registrar Movimentação</h2>

                    <form className="mov-form" onSubmit={handleSubmit}>
                        <label>Produto:</label>
                        <select value={produtoId} onChange={e => setProdutoId(e.target.value)}>
                            <option value="">Selecione um produto</option>
                            {produtos.map(p => (
                                <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                        </select>

                        <label>Tipo:</label>
                        <select value={tipo} onChange={e => setTipo(e.target.value)}>
                            <option value="entrada">Entrada</option>
                            <option value="saida">Saída</option>
                        </select>

                        <label>Quantidade:</label>
                        <input 
                            type="number" 
                            value={quantidade} 
                            onChange={e => setQuantidade(e.target.value)} 
                            min="1"
                        />

                        <button type="submit">Registrar</button>
                    </form>

                    <h3>Movimentações Recentes</h3>
                    <table className="mov-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Tipo</th>
                                <th>Quantidade</th>
                                <th>Usuário</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimentacoes.map(m => (
                                <tr key={m.id}>
                                    <td>{m.produto.nome}</td>
                                    <td>{m.tipo}</td>
                                    <td>{m.quantidade}</td>
                                    <td>{m.usuario}</td>
                                    <td>{new Date(m.data_movimentacao).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}