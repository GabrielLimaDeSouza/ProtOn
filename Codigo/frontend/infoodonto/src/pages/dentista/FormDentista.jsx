import React from "react";

import Logo from "../../img/logo.png";

import { useState, useContext } from "react";

import Input from "../../components/inputs/Input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { AiOutlineArrowLeft } from "react-icons/ai";

import styles from "../../css/FormDentista.module.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import Header from "../../components/headers/Header";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormDentista = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openEmailError, setOpenEmailError] = useState(false);
  const navigate = useNavigate();

  const { user, updateUser } = useContext(LoginContext);

  const messageAdd = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenEmailError(false);
    setOpenError(false);
  };

  const messageError = () => {
    setOpenError(true);
  };

  const messageEmailError = () => {
    setOpenEmailError(true);
  };

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function handleNameChange(name) {
    setName(name);
  }

  function handleEmailChange(email) {
    setEmail(email);
  }

  function handleSenhaChange(senha) {
    setSenha(senha);
  }

  function handleMatriculaChange(matricula) {
    setMatricula(matricula);
  }

  function createDentista(event) {
    event.preventDefault();

    if (!name || !email || !senha || !matricula) {
      messageError();
      return;
    }

    if (!validarEmail(email)) {
      messageEmailError();
      return;
    }

    fetch(`http://localhost:3000/api/instituicao/${user._id}/dentista`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        senha,
        matricula,
        instituicao: user._id,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(user);

        user.dentistas.push(data.dentista);
        updateUser(user);

        messageAdd();
        setTimeout(() => {
          navigate("/perfil");
        }, 2000);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.divArrow}>
        <a href="/perfil">
          <AiOutlineArrowLeft className={styles.arrowBack} />
        </a>
      </div>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>

      <form className={styles.form} onSubmit={createDentista}>
        <div className={styles.uni}>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            id="name"
            onChange={handleNameChange}
          />
        </div>
        <div className={styles.uni}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            id="email"
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.uni}>
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            id="senha"
            onChange={handleSenhaChange}
          />
        </div>
        <div className={styles.uni}>
          <Input
            type="number"
            name="matricula"
            placeholder="Matrícula"
            id="matricula"
            onChange={handleMatriculaChange}
          />
        </div>
        <div className={styles.divButton}>
          <button type="submit" className={styles.confirmar}>
            Confirmar
          </button>
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Dentista cadastro com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Preencha todos os campos!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openEmailError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Email inválido!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormDentista;
