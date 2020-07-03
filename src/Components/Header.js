import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/listalivro">
                    <h3>Biblioteca Online</h3>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/listalivro" className="navbar-item">Listar</Link>
                    <Link to="/" className="navbar-item">Cadastrar</Link>
                </div>
            </div>
        </nav>
    )
}