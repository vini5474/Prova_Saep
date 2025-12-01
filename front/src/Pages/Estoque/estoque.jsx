import React, {useState, useEffect, useRef} from "react";
import {FaTrash, FaPlus} from 'react-icons/fa'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './estoque.css'
import Header from '../../Components/Header/header'

export default function Estoque() {
    const [dados, setDados] = useState([])
    const [filtro, setFiltro] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const alertShown = useRef(false);

    useEffect(() => {
        if (!token) return

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/produtos/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setDados(response.data)

                const produtosCriticos = response.data.filter(
                    (p) => p.quantidade < p.estoque_minimo
                )

                if (!alertShown.current && produtosCriticos.length > 0) {
                    alertShown.current = true

                    const nomes = produtosCriticos.map((p) => p.nome).join(', ')
                    alert(`Atenção! Estoque baixo para os seguintes produtos: ${nomes}`)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])



    const apagar = async (id) => {
        if (window.confirm("Tem certeza que deseja apagar ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/produtos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setDados(dados.filter((produto) => produto.id !== id))
            } catch (error) {
                console.log("Error:", error)
            }
        }
    }

    return (
        <>
            <Header/>

            <main className="estoque-container">
                <div className="estoque-box">
                    <h1>Estoque de Produtos</h1>

                    <div className="top-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar produto por nome:"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />

                        <button className="add-btn" onClick={() => navigate('/cadastro')}>
                            <FaPlus /> Novo Produto
                        </button>
                    </div>

                    <table className="tabela-estoque">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Estoque Mínimo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {dados
                                .filter(item =>
                                    item.nome.toLowerCase().includes(filtro.toLowerCase())
                                )
                                .map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.quantidade}
                                            {item.quantidade < item.estoque_minimo && (<span className="alerta-estoque">Estoque Baixo</span>)}
                                        </td>
                                        <td>R$ {item.preco}</td>
                                        <td>{item.estoque_minimo}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => apagar(item.id)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}