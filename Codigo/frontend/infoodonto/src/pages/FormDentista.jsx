import React from "react";

import Logo from "../img/logo.png"

import { useState, useEffect, useContext } from "react"

import Input from "../components/input/Input"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {AiOutlineArrowLeft} from 'react-icons/ai'

import styles from '../css/FormDentista.module.css'
import { useParams } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormDentista = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [matricula, setMatricula] = useState("");
    const [instituicao, setInstituicao] = useState({})
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false)
    const [openEmailError, setOpenEmailError] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/instituicao?id=${id}`);
            if (response.ok) {
              const data = await response.json();
              setInstituicao(data)
            } else {
              console.error('Erro ao obter os dados da API:', response.status);
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          }
        };
      
        fetchData();
      }, []);
    
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

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    function limparCampos(){
        setEmail("")
        setName("")
        setSenha("")
        setMatricula("")
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }
    
    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    
    function handleSenhaChange(event) {
        setSenha(event.target.value);
    }
    
    function handleMatriculaChange(event) {
        setMatricula(event.target.value);
    }

    function createDentista(event){
        event.preventDefault();

        if(!name || !email || !senha || !matricula){
            messageError()
            return
        }

        if (!validarEmail(email)) {
            messageEmailError()
            return
        }

        fetch(`http://localhost:3000/api/instituicao/${id}/dentista`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "senha": senha,
                "matricula": matricula,
                "instituicao": id
            })
          })
          .then(resp => resp.json())
          .then(()=>{
            limparCampos()
            messageAdd()
          })
          .catch(err => console.error(err))
    }

    return (

        <div className={styles.container}>
            <div className={styles.divArrow}>
                <a href="/homeInstituicao"><AiOutlineArrowLeft className={styles.arrowBack} /></a>
            </div>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo" />
            </div>

            <form className={styles.form} onSubmit={createDentista}>
                <div className={styles.uni}><Input type="text" placeholder="Nome" id="name" value={name} onInput={handleNameChange}/></div>
                <div className={styles.uni}><Input type="text" placeholder="Email" id="email" value={email} onChange={handleEmailChange}/></div>
                <div className={styles.uni}><Input type="password" placeholder="Senha" id="senha" value={senha} onChange={handleSenhaChange}/></div>
                <div className={styles.uni}><Input type="text" placeholder="Matrícula" id="matricula" value={matricula} onChange={handleMatriculaChange}/></div>
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