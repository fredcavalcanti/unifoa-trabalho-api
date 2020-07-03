import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Sobre.css';
class Sobre extends Component {
 render() {
 return (
    <div className="App">
       <header className="App-header">
          <h3 className="App-title title">Trabalho feito por:</h3>
          <p className="act">Frederico Sampaio & Guilherme Courty</p>
          <p className="act">APIs públicas utilizadas:</p>
          <p className="act"><a href="https://covid.saude.gov.br/" target="blank" > Covid Saude GOV </a></p>
          <p className="act"><a href="https://servicodados.ibge.gov.br/api/docs/agregados?versao=3" target="blank" >IBGE</a></p>
          <p className="act"><Link to="/">Voltar</Link></p>          
       </header>
    </div>
 );
 }
}
export default Sobre;