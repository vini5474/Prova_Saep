import React, {useState} from "react";
import axios from "axios";
import './cadastro.css'
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const criar = async(novoProduto) => {
        console.log("Novo produto: ", novoProduto)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/produtos/',
                {
                    nome: novoProduto.nome,
                    descricao: novoProduto.descricao,
                    quantidade: novoProduto.quantidade,
                    preco: novoProduto.preco,
                    estoque_minimo: novoProduto.estoque_minimo
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoProduto])
            navigate('/estoque')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="cadastro-container">
            <div className="cadastro-box">
                <h1>Cadastro de Produto</h1>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    const novoProduto = {
                        nome: e.target.nome.value,
                        descricao: e.target.descricao.value,
                        quantidade: parseInt(e.target.quantidade.value),
                        preco: parseFloat(e.target.preco.value),
                        estoque_minimo: parseInt(e.target.estoque_minimo.value)
                    }
                    criar(novoProduto)
                }}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do produto"
                        required
                    />

                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do produto"
                        required
                    />

                    <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        required
                    />

                    <input
                        type="number"
                        step="0.01"
                        name="preco"
                        placeholder="Preço"
                        required
                    />

                    <input
                        type="number"
                        name="estoque_minimo"
                        placeholder="Estoque mínimo"
                        required
                    />

                    <div className="botoes">
                        <button type="submit">Cadastrar</button>
                        <button type="button" onClick={() => navigate('/estoque')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}