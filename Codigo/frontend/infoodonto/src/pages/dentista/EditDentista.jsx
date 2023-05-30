import React, { useContext } from "react";
import Logo from "../../img/logo.png";

import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";

import styles from "../../css/EditDentista.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { CircularProgress } from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";
import { LoginContext } from "../../context/LoginContext";
import Header from "../../components/headers/Header";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditDentista = () => {
  const { user, updateUser } = useContext(LoginContext);
  const { id } = useParams();
  const [dentista, setDentista] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEmailError, setOpenEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setDentista(user.dentistas.find((dentista) => dentista._id === id));
    console.log(user.dentistas.find((dentista) => dentista._id === id));

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const messageError = () => {
    setOpen(true);
  };

  const messageEmailError = () => {
    setOpenEmailError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenEmailError(false);
  };

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function editDentista(e) {
    e.preventDefault();
    console.log(dentista);

    const valoresDentista = Object.values(dentista);

    if (valoresDentista.some((valor) => valor === "")) {
      messageError();
      return;
    }

    if (!validarEmail(dentista.user.email)) {
      messageEmailError();
      return;
    }

    fetch(`http://localhost:3000/api/dentista?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dentista.name,
        email: dentista.user.email,
        senha: dentista.user.senha,
      }),
    }).then(() => {
      navigate("/perfil");
    });
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={styles.divArrow}>
            <a href="/perfil">
              <AiOutlineArrowLeft className={styles.arrowBack} />
            </a>
          </div>
          <div className={styles.logo}>
            <img src={Logo} alt="Logo" />
          </div>
          <form className="form input-container" onSubmit={editDentista}>
            <div className={styles.uni}>
              <div className={styles.divLabel}>
                <label htmlFor="inputName" className="label">
                  Nome
                </label>
              </div>
              <Input
                type="text"
                value={dentista.name}
                id="inputName"
                className={styles.inputEdit}
                label="Nome"
                initialValue={dentista.name}
                onChange={(name) => {
                  dentista.name = name;
                  setDentista(dentista);
                }}
              />
            </div>
            <div className={styles.uni}>
              <Input
                type="text"
                value={dentista.user.email}
                initialValue={dentista.user.email}
                id="inputEmail"
                className={styles.inputEdit}
                label="Email"
                onChange={(email) => {
                  dentista.user.email = email;
                  setDentista(dentista);
                }}
              />
            </div>
            <div className={styles.uni}>
              <Input
                type="password"
                value={dentista.user.senha}
                initialValue={dentista.user.senha}
                id="inputSenha"
                className={styles.inputEdit}
                label="Senha"
                onChange={(senha) => {
                  dentista.user.senha = senha;
                  setDentista(dentista);
                }}
              />
            </div>
            <div className={styles.divButton}>
              <Button
                type="submit"
                className={styles.editar}
                onClick={editDentista}
              >
                Editar
              </Button>
            </div>
          </form>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Preencha todos os campos!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openEmailError}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Email inválido!
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default EditDentista;
