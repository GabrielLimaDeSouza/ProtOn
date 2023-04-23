import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import "../css/SearchPaciente.css"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useState, useEffect } from "react";

const SearchPaciente = () => {
    const [paciente, setPaciente] = useState([]);
    const [cpf, setCpf] = useState("");

    const url = 'http://localhost:3000'

    useEffect(() => {
        if (cpf.length == 11) {
            fetch(`${url}/api/paciente/cpf/${cpf}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))


        }
    }, [cpf]);

    function campoCompleto() {
        let campo = document.getElementById("busca");
        if (campo.value.length === 11) {
            setCpf(campo.value);
            campo.value = ""
        }
    }

    return (
        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="search-box">
                <Input type="search" placeholder="CPF: 00000000000" typeSearch="number" id="busca" limiteChar="11" event={campoCompleto}></Input>
            </div>

            <div className="loader-box">
                
                        <Typography variant="h3" width={"70%"}><Skeleton animation="wave" /></Typography>

                        <Skeleton animation="wave" height={"30px"} width={"90%"}  />
                        <Skeleton animation="wave" height={"30px"} width={"90%"}  />
                        <Skeleton animation="wave" height={"30px"} width={"90%"}  />
                        <Skeleton animation="wave" height={"30px"} width={"90%"}  />
                   
            </div>
        </>
    )
}

export default SearchPaciente
