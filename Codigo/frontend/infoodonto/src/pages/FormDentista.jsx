import Logo from "../img/logo.png"

import { useState } from "react"

import Input from "../components/input/Input"
import InputOptions from "../components/input/InputOptions"

const FormDentista = () => {

    const [instituicao, setInstituicao] = useState("");

    function handleInstituicaoChange(valor) {
      setInstituicao(valor);
    }

    function createDentista(input){
        input.preventDefault();

        fetch(`http://localhost:3000/api/dentista/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": document.getElementById("name").value,
                "email": document.getElementById("email").value,
                "senha": document.getElementById("senha").value,
                "instituicao": {
                    "name": instituicao,
                    "tipo": "Hospital"
                }
            })
          })
          .then(resp => resp.json())
          .then(alert("Dentista cadastrado!"))
          .catch(err => console.error(err))

    }

    const instituicoes = ['Hospital Belo Horizonte', 'Hospital Madre Tereza', 'Hospital da Baleia']

    return (

        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <form className="form input-container" onSubmit={createDentista}>
            <div className="uni"><Input type="text" placeholder="Nome" id="name"/></div>
                <div className="uni"><Input type="text" placeholder="Email" id="email"/></div>
                <div className="uni"><Input type="text" placeholder="Senha" id="senha"/></div>
                <div className="uni"><InputOptions content={instituicoes} name="Instituição"/></div>
                <div className="uni"><Input type="text" placeholder="Matrícula" onChange={handleInstituicaoChange} id="matricula"/></div>
                <div className="divButton">
                    <button type="submit" className="confirmar">Confirmar</button>
                </div>
            </form>
        </>

    )
}
  
export default FormDentista; 