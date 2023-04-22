import Logo from "../img/logo.png"

import { useState, useEffect } from "react"

import Input from "../components/input/Input"

const FormDentista = () => {

    const [instituicoes, setInstituicoes] = useState([])
    const [instituicao, setInstituicao] = useState({})
    const [tipo, setTipo] = useState("")

    useEffect(() => {
        fetch('http://localhost:3000/api/instituicao/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(resp => resp.json())
          .then(data => setInstituicoes(data))
          .catch(err => console.error(err))
    }, [])

    function handleInstituicaoChange(valor) {
        setInstituicao(valor.target.value);
        const instituicaoSelecionada = instituicoes.find(i => i.name === valor.target.value);
        if (instituicaoSelecionada) {
            setInstituicao(instituicaoSelecionada);
        }
    }

    function createDentista(input){
        input.preventDefault();
        console.log(instituicao)

        fetch(`http://localhost:3000/api/dentista/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": document.getElementById("name").value,
                "email": document.getElementById("email").value,
                "senha": document.getElementById("senha").value,
                "matricula": document.getElementById("matricula").value,
                "instituicao": {
                    "_id": instituicao._id
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


            <form className="form input-container" onSubmit={createDentista}>
            <div className="uni"><Input type="text" placeholder="Nome" id="name"/></div>
                <div className="uni"><Input type="text" placeholder="Email" id="email"/></div>
                <div className="uni"><Input type="password" placeholder="Senha" id="senha"/></div>
                <div className="uni">
                    <input placeholder="Instituição" className="input-field" type="text" list="lista" id="option" onInput={handleInstituicaoChange}></input>
                    <span className="input-highlight"></span>
                    <datalist id="lista">
                        {instituicoes.map((instituicao)=> 
                            <option key={instituicao._id} tipo={instituicao.tipo} value={instituicao.name}>{instituicao.name}</option>
                        )}
                    </datalist>
                </div>
                <div className="uni"><Input type="text" placeholder="Matrícula" id="matricula"/></div>
                <div className="divButton">
                    <button type="submit" className="confirmar">Confirmar</button>
                </div>
            </form>
        </>

    )
}
  
export default FormDentista; 