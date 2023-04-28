import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import "../css/SearchPaciente.css"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";

const SearchPaciente = () => {
    const [paciente, setPaciente] = useState({});
    const [pacienteExiste, setPacienteExiste] = useState()
    const [cpf, setCpf] = useState("");
    const [preAtendimento, setPreAtendimento] = useState([])
    const [anestesicoLocal, setAnestesicoLocal] = useState([])
    const [medicamentos, setMedicamentos] = useState([])
    const [implante, setImplante] = useState([])
    const [open1, setOpen1] = useState()
    const [open2, setOpen2] = useState()
    const url = 'http://localhost:3000'

    useEffect(() => {
        if (cpf != null && cpf.length == 11 ) {
            fetch(`${url}/api/paciente/condicao?cpf=${cpf}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => resp.json())
                .then(data => {

                    if (data) {
                        
                        setCpf(null)
                        setPaciente(data)
                        setPacienteExiste(true)
                        setOpen1(true);
                    }else{
                        setPacienteExiste(false)
                        console.log("teste212")
                        setOpen2(true)
                    }
                }

                )
                .catch(err => console.log(err))


        }
    }, [cpf]);


    useEffect(() => {
        if (paciente != null && Object.keys(paciente).length !== 0) {
            setPacienteExiste(true);
            
            for (let i = 0; i < paciente.condicoes.length; i++) {
                setPreAtendimento(preAtendimento.concat(paciente.condicoes[i].preAtendimento))
                setAnestesicoLocal(anestesicoLocal.concat(paciente.condicoes[i].anestesicoLocal))
                setMedicamentos(medicamentos.concat(paciente.condicoes[i].medicamentos))
                setImplante(implante.concat(paciente.condicoes[i].implante))
                if(pacienteExiste){
            
            
        }
            }
        } else {
            setPacienteExiste(false);
            
            
        }
        
        

    }, [paciente])

    function campoCompleto() {
        let campo = document.getElementById("busca");
        if (campo.value.length === 11) {
            setCpf(campo.value);
            campo.value = ""
        }
    }

    function handleClose(){
        setOpen1(false)
    }

    function handleClose2(){
        setOpen2(false)
    }
      
    return (
        <>
        
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="search-box">
                <Input type="search" placeholder="CPF: 00000000000" typeSearch="number" id="busca" limiteChar="11" event={campoCompleto}></Input>
            </div>
        {
            open1?
            <Snackbar open={open1} autoHideDuration={1200} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Paciente encontrado com sucesso!
            </Alert>
          </Snackbar>:
          open2?
          <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose2}>
            <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
              Paciente não foi encontrado!
            </Alert>
          </Snackbar>:""
        }

            {
                pacienteExiste ?

                    <div className="drops">
                        <h1>{paciente.name}</h1>
                        <div className="divCondicoes">
                            <h1>Condições</h1>
                            <div className="containerCondicoes">
                            {
                                paciente.condicoes.map((condicao) => (
                                    <div className="divCondicao">{condicao.nome}</div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="drop"> <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ background: 'rgba(98, 168, 219, 0.41)' }}
                                className="drop"
                            >
                                <Typography>Pre-atendimento</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {preAtendimento.map((pre) =>
                                        <> <p>{pre}</p></>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        </div>

                        <div className="drop"><Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ background: 'rgba(98, 168, 219, 0.41)' }}
                                className="drop"
                            >
                                <Typography>Anestesico local</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {anestesicoLocal.map((ane) =>
                                        <> <p>{ane}</p></>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion></div>

                        <div className="drop"><Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ background: 'rgba(98, 168, 219, 0.41)' }}
                                className="drop"
                            >
                                <Typography>Medicamentos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {medicamentos.map((med) =>
                                        <> <p>{med}</p></>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion></div>

                        <div className="drop"> <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ background: 'rgba(98, 168, 219, 0.41)' }}
                                className="drop"
                            >
                                <Typography>Implante</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {implante.map((imp) =>
                                        <> <p>{imp}</p></>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion></div>


                    </div>


                    : (

                            <div className="loader-box">
                                
                               
                            <Typography variant="h3" width={"70%"}><Skeleton animation="wave" /></Typography>

                            <Skeleton animation="wave" height={"30px"} width={"90%"} />
                            <Skeleton animation="wave" height={"30px"} width={"90%"} />
                            <Skeleton animation="wave" height={"30px"} width={"90%"} />
                            <Skeleton animation="wave" height={"30px"} width={"90%"} />

                        </div>)
            }

        </>
    )
}

export default SearchPaciente
