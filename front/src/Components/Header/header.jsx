import React, { useEffect, useState } from "react";
import './header.css'
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

export default function Header() {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState("Usuário")

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        const fetchNomeUsuario = async () => {
            const payload = parseJwt(token)
            console.log(payload);
            if (payload && payload.username) {
                setNomeUsuario(payload.username)
            }
        }

        fetchNomeUsuario()
    }, [])

    return (
        <header className="header-container">
            <div className="header-left">
                <h1>Usuário logado: {nomeUsuario}</h1>
            </div>

            <nav className="header-nav">
                <ul className="nav-menu">
                    <li onClick={() => navigate('/estoque')}>Estoque</li>
                    <li onClick={() => navigate('/cadastro')}>Cadastro de produtos</li>
                    <li onClick={() => navigate('/movimentacao')}>Fazer movimentação</li>
                    <li className="logout" onClick={logout}><CiLogout size={24} /></li>
                </ul>
            </nav>
        </header>
    )
}

// decodificar token
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        return JSON.parse(jsonPayload)
    } catch (e) {
        console.log("Erro ao decodificar JWT:", e)
        return null
    }
}