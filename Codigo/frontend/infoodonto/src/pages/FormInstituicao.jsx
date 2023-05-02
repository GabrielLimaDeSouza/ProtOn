import {useState } from 'react'
import React from 'react'

import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import InputOptions from '../components/input/option/InputOptions'
import Snackbar from '@mui/material/Snackbar';

import styles from '../css/FormDentista.module.css'

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 
const FormInstituicao = () => {

    const listaTipos = ['Universidade', 'Clínica', 'Hospital']
    const [tipo,setTipo] = useState("")
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openEmailError, setOpenEmailError] = useState(false)

    function validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setOpen(false)
      setOpenEmailError(false)
      setOpenError(false)
    };

    const messageAdd= () => {
      setOpen(true);
    };

    const messageError= () => {
      setOpenError(true);
    };

    const messageEmailError = () => {
      setOpenEmailError(true);
    };

    function handleTipoChange(valor){
      setTipo(valor)
    }

    function createInstituicao(e){
        e.preventDefault()

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const senha = document.getElementById("senha").value

        if(!name || !email || !senha || !tipo){
          messageError()
          return
        }

        if (!validarEmail(email)) {
          messageEmailError()
          return
        }

        fetch(`http://localhost:3000/api/instituicao/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "senha": senha,
                "tipo": tipo
            })
          })
          .then(resp => resp.json())
          .then(messageAdd())
          .catch(err => console.error(err))
    }

   return (
        <>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo" />
            </div>


            <form className={styles.form} onSubmit={createInstituicao}>
            <div className={styles.uni}><Input type="text" placeholder="Nome" id="name"/></div>
                <div className={styles.uni}><Input type="text" placeholder="Email" id="email"/></div>
                <div className={styles.uni}><Input type="password" placeholder="Senha" id="senha"/></div>
                <div className={styles.uni}><InputOptions type="options" name="Tipo" onChange={handleTipoChange} content={listaTipos} /></div>
                <div className={styles.divButton}>
                    <button type="submit" className={styles.confirmar}>Confirmar</button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Instituição cadastrada com sucesso!
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
        </>
   )
 }
 
 export default FormInstituicao