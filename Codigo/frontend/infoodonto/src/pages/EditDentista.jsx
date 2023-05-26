import React from "react";
import Logo from "../img/logo.png"

import { getDentista } from "../services/api";

import styles from '../css/EditDentista.module.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const EditDentista = () => {

    const [dentista,setDentista] = useState({})
    const [open, setOpen] = useState(false);
    const [openEmailError, setOpenEmailError] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/dentista?id=${id}`);
            if (response.ok) {
              const data = await response.json();
                setDentista(data)
            } else {
              console.error('Erro ao obter os dados da API:', response.status);
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          }
        };
      
        fetchData();
      }, []);

    const messageError = () => {
        setOpen(true);
    };

    const messageEmailError = () => {
        setOpenEmailError(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenEmailError(false);
    };

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }


    function editDentista(e){
        e.preventDefault();
        const valoresDentista = Object.values(dentista);
        if (valoresDentista.some(valor => valor === "")) {
            messageError()
            return;
        }

        if(!validarEmail(dentista.dentista.user.email)){
            messageEmailError()
            return
        }

        fetch(`http://localhost:3000/api/dentista?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: dentista.dentista.name,
                email:  dentista.dentista.user.email,
                senha:  dentista.dentista.user.senha
            })
        }).then(() => {
            navigate("/homeInstituicao")
        })
    }

    return (
        <>
            <div className={styles.divArrow}>
                <a href="/homeInstituicao"><AiOutlineArrowLeft className={styles.arrowBack} /></a>
            </div>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo" />
            </div>
            <form className="form input-container" onSubmit={editDentista}>
                <div className={styles.uni}>
                    <div className={styles.divLabel}>
                        <label htmlFor="inputName" className="label">Nome</label>
                    </div>
                    <input type="text" value={dentista.dentista?.name} id="inputName" className={styles.inputEdit} onChange={(event) => setDentista({ ...dentista, dentista: { ...dentista.dentista, name: event.target.value } })}/>
                </div>
                <div className={styles.uni}>
                    <div className={styles.divLabel}>
                        <label htmlFor="inputEmail" className="label" >Email</label>
                    </div>
                    <input
  type="text"
  value={dentista.dentista?.user?.email}
  id="inputEmail"
  className={styles.inputEdit}
  onChange={(event) =>
    setDentista({
      ...dentista,
      dentista: {
        ...dentista.dentista,
        user: {
          ...dentista.dentista.user,
          email: event.target.value
        }
      }
    })
  }
/>
                </div>
                <div className={styles.uni}>
                    <div className={styles.divLabel}>
                        <label htmlFor="inputSenha" className="label" >Senha</label>
                    </div>
                    <input
  type="text"
  value={dentista.dentista?.user?.senha}
  id="inputSenha"
  className={styles.inputEdit}
  onChange={(event) =>
    setDentista({
      ...dentista,
      dentista: {
        ...dentista.dentista,
        user: {
          ...dentista.dentista.user,
          senha: event.target.value
        }
      }
    })
  }
/>
                </div>
                <div className={styles.divButton}>
                    <button type="submit" className={styles.editar} onClick={editDentista}>Editar</button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
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
  
export default EditDentista; 