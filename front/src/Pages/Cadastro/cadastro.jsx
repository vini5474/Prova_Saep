import React, {useState, useEffect} from "react";
import axios from "axios";
import './cadastro.css'
import { useNavigate, useParams } from "react-router-dom";

export default function Cadastro() {
    const [dados, setDados] = useState({
        nome: "",
        descricao: "",
        quantidade: "",
        preco: "",
        estoque_minimo: ""
    })

    const { id } = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:8000/api/produtos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setDados(res.data)
            }).catch(err => console.log(err))
        }
    }, [id])

    const salvar = async (e) => {
        e.preventDefault()

        try {
            if (id) {
                // Atualizar produto existente
                await axios.put(
                    `http://127.0.0.1:8000/api/produtos/${id}`,
                    dados,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            } else {
                await axios.post(
                    `http://127.0.0.1:8000/api/produtos/`,
                    dados,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            }

            navigate('/estoque')
        } catch (error) {
            console.log(error)
        }
    }

    const alterar = (e) => {
        setDados({...dados, [e.target.name]: e.target.value})
    }

    return (
        <main className="cadastro-container">
            <div className="cadastro-box">
                <h1>{id ? "Editar Produto" : "Cadastro de Produto"}</h1>

                <form onSubmit={salvar}>

                    <input type="text" name="nome" value={dados.nome}
                        onChange={alterar} placeholder="Nome do produto" required />

                    <input type="text" name="descricao" value={dados.descricao}
                        onChange={alterar} placeholder="Descrição do produto" required />

                    <input type="number" name="quantidade" value={dados.quantidade}
                        onChange={alterar} placeholder="Quantidade" required />

                    <input type="number" step="0.01" name="preco" value={dados.preco}
                        onChange={alterar} placeholder="Preço" required />

                    <input type="number" name="estoque_minimo" value={dados.estoque_minimo}
                        onChange={alterar} placeholder="Estoque mínimo" required />

                    <div className="botoes">
                        <button type="submit">{id ? "Salvar Alterações" : "Cadastrar"}</button>
                        <button type="button" onClick={() => navigate('/estoque')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}