import React from "react";
import Logo from "../img/logo.png"

import '../css/EditDentista.css'

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";


const EditDentista = () => {

    const [dentista,setDentista] = useState({})
    const navigate = useNavigate();
    const { id } = useParams();


    function editDentista(e){
        e.preventDefault();
        fetch(`http://localhost:3000/api/dentista?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dentista)
        }).then(() => {
            navigate("/homeInstituicao")
        })
    }

    useEffect(()=> {
        fetch(`http://localhost:3000/api/dentista/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setDentista(data))
        .catch(err => console.log(err))
    },[])

    return (
        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <form className="form input-container" onSubmit={editDentista}>
                <div className="uni">
                    <div className="divLabel">
                        <label htmlFor="inputName" className="label">Nome</label>
                    </div>
                    <input type="text" value={dentista.name} id="inputName" className="inputEdit" onChange={(event) => setDentista({ ...dentista, name: event.target.value })} />
                </div>
                <div className="uni">
                    <div className="divLabel">
                        <label htmlFor="inputEmail" className="label" >Email</label>
                    </div>
                    <input type="text" value={dentista.email} id="inputName" className="inputEdit" onChange={(event) => setDentista({ ...dentista, email: event.target.value })} />
                </div>
                <div className="uni">
                    <div className="divLabel">
                        <label htmlFor="inputSenha" className="label" >Senha</label>
                    </div>
                    <input type="text" value={dentista.senha} id="inputName" className="inputEdit" onChange={(event) => setDentista({ ...dentista, senha: event.target.value })} />
                </div>
                <div className="divButton">
                    <button type="submit" className="confirmar" onClick={editDentista}>Editar</button>
                </div>
            </form>
        </>

    )
}
  
export default EditDentista; 