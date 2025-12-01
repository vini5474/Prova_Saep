import React, {useState, useEffect} from "react";
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

    useEffect(() => {
        if (!token) return
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/produtos/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Header/>

            <main className="estoque-container">
                <div className="estoque-box">
                    <h1>Estoque de Produtos</h1>

                    <div className="top-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar produto..."
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
                                            <button className="delete-btn">
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