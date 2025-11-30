import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./Pages/Login/login"
import Home from "./Pages/Home/home"
import Estoque from "./Pages/Estoque/estoque"
import Cadastro from './Pages/Cadastro/cadastro'
import Movimentacao from "./Pages/Movimentacao/movimentacao"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/estoque" element={<Estoque/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/movimentacao" element={<Movimentacao/>}/>
      </Routes>
    </Router>
  )
}