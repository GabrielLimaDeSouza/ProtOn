import { React ,useState } from 'react'

import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import "../css/FormPaciente.css"
import InputOptions from '../components/input/InputOptions'
 
 const FormInstituicao = () => {

    const listaTipos = ['Universidade', 'Clínica', 'Hospital']

    function createInstituicao(e){
        e.preventDefault()
        fetch(`http://localhost:3000/api/instituicao/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": document.getElementById("name").value,
                "email": document.getElementById("email").value,
                "senha": document.getElementById("senha").value,
                "instituicao": {
                  "name": "Universidade C",
                  "tipo": "Universidade"
                }
            })
          })
          .then(resp => resp.json())
          .then(alert("Dentista cadastrado!"))
          .catch(err => console.error(err))
    }

   return (
        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <form className="form input-container" onSubmit={createInstituicao}>
            <div className="uni"><Input type="text" placeholder="Nome" id="name"/></div>
                <div className="uni"><Input type="text" placeholder="Email" id="email"/></div>
                <div className="uni"><Input type="text" placeholder="Senha" id="senha"/></div>
                <div className="uni"><InputOptions type="options" name="Tipo" content={listaTipos} /></div>
                <div className="divButton">
                    <button type="submit" className="confirmar">Confirmar</button>
                </div>
            </form>
        </>
   )
 }
 
 export default FormInstituicao