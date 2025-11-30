import React, { useState } from "react";
import './login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const logar = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                {
                    username: user,
                    password: password
                }
            )
            console.log("Token: ", response.data.access);
            localStorage.setItem('token', response.data.access)
            navigate('/home')
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={logar}>Entrar</button>
            </div>
        </div>
    )
}