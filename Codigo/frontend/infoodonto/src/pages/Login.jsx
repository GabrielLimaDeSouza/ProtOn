import { useState, useContext } from "react"
import { LoginContext } from "../context/LoginContext"

import Input from "../components/inputs/Input"
import Button from "../components/buttons/Button"
import { Alert } from "@mui/material"

import {AiOutlineArrowLeft} from 'react-icons/ai'

import styles from "../css/Login.module.css"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState(null)

    const { login } = useContext(LoginContext)

    const handleSubmit = async e => {
        e.preventDefault()

        const resp = await login(email, senha)

        if(resp.status !== 201) {
            setError(resp.msg)
        }
    }

    return (
        <div className={ styles.body }>

            <div className="divArrow">
              <a href="/"><AiOutlineArrowLeft className="arrowBackWhite" /></a>
            </div>

            <section className="logo-login">
                <div className={ styles.logo }>
                    <img src="/logo.svg" alt="ProtOn" />
                </div>
            </section>

            <section className="content-login">
                <div className={ styles.content }>
                    <div className={ styles.divTitle }>
                        <h1 className={ styles.title }>Login</h1>
                        <p className={ styles.descripton }>Faça o login para acessar a plataforma</p>
                    </div>
                    <div className={ styles.divForm }>
                        { error && <Alert severity="error">{ error }</Alert> }

                        <form className={ styles.form } onSubmit={ handleSubmit }>
                            <Input type="email" placeholder="Email" id="email" name="email" onChange={ setEmail }/>
                            <Input type="password" placeholder="Senha" id="senha" name="senha" onChange={ setSenha }/>
                            
                            <div>
                                <Button type="submit" id="login" className="submit">Entrar</Button>
                            </div>
                        </form>
                        <p className={ styles.signUp }>Não possui conta? <Link className={ styles.link } to="/formPaciente">Cadastrar</Link></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login