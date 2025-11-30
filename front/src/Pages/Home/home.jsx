import React from "react";
import './home.css'
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate()

    return (
        <main className="home-container">
            <div className="body_home">
                <h1>Home</h1>
                <button onClick={() => navigate('/estoque')}>Estoque</button>
                <button onClick={() => navigate('/cadastro')}>Cadastro de produtos</button>
                <button onClick={() => navigate('/movimentacao')}>Fazer movimentação</button>
                <button onClick={() => navigate('/')}>Sair</button>
            </div>
        </main>
    )
}