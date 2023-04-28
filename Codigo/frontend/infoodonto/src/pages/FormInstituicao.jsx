import {useState } from 'react'
import React from 'react'

import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import "../css/FormPaciente.css"
import InputOptions from '../components/input/InputOptions'
import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 
const FormInstituicao = () => {

    const listaTipos = ['Universidade', 'Clínica', 'Hospital']
    const [tipo,setTipo] = useState("")
    const [open, setOpen] = useState(false);
        
    const messageAdd= () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setOpen(false);
    };

    function handleTipoChange(valor){
      setTipo(valor)
    }

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
                "tipo": tipo
            })
          })
          .then(resp => resp.json())
          .then(messageAdd())
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
                <div className="uni"><Input type="password" placeholder="Senha" id="senha"/></div>
                <div className="uni"><InputOptions type="options" name="Tipo" onChange={handleTipoChange} content={listaTipos} /></div>
                <div className="divButton">
                    <button type="submit" className="confirmar">Confirmar</button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Instituição cadastrada com sucesso!
              </Alert>
          </Snackbar>
        </>
   )
 }
 
 export default FormInstituicao