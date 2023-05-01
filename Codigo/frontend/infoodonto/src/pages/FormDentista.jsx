import React from "react";

import Logo from "../img/logo.png"

import { useState, useEffect } from "react"

import Input from "../components/input/Input"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import styles from '../css/FormDentista.module.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormDentista = () => {

    const [instituicoes, setInstituicoes] = useState([])
    const [instituicao, setInstituicao] = useState({})
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false)
    const [openEmailError, setOpenEmailError] = useState(false)
    
    const messageAdd = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
        setOpenEmailError(false)
        setOpenError(false)
    };

    const messageError = () => {
        setOpenError(true);
    };
    

    const messageEmailError = () => {
        setOpenEmailError(true);
    };
    
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

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    function createDentista(input){
        input.preventDefault();
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var senha = document.getElementById("senha").value
        var matricula = document.getElementById("matricula").value

        if(!name || !email || !senha || !matricula || !instituicao){
            messageError()
            return
        }

        if (!validarEmail(email)) {
            messageEmailError()
            return
        }

        fetch(`http://localhost:3000/api/dentista/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "senha": senha,
                "matricula": matricula,
                "instituicao": {
                    "_id": instituicao._id
                }
            })
          })
          .then(resp => resp.json())
          .then(messageAdd())
          .catch(err => console.error(err))

    }

    return (

        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo" />
            </div>

            <form className={styles.form} onSubmit={createDentista}>
                <div className={styles.uni}><Input type="text" placeholder="Nome" id="name"/></div>
                    <div className={styles.uni}><Input type="text" placeholder="Email" id="email"/></div>
                    <div className={styles.uni}><Input type="password" placeholder="Senha" id="senha"/></div>
                    <div className={styles.uni}>
                        <input placeholder="Instituição" className={styles.drop} type="text" list="lista" id="option" onInput={handleInstituicaoChange}></input>
                        <span className="input-highlight"></span>
                        <datalist id="lista">
                            {instituicoes.map((instituicao)=> 
                                <option key={instituicao._id} tipo={instituicao.tipo} value={instituicao.name}>{instituicao.name}</option>
                            )}
                        </datalist>
                </div>
                <div className={styles.uni}><Input type="text" placeholder="Matrícula" id="matricula"/></div>
                <div className={styles.divButton}>
                    <button type="submit" className={styles.confirmar}>Confirmar</button>
                </div>
            </form>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Dentista cadastro com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Preencha todos os campos!
                </Alert>
            </Snackbar>
            <Snackbar open={openEmailError} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Email inválido!
                </Alert>
            </Snackbar>
        </div>

    )
}
  
export default FormDentista; 