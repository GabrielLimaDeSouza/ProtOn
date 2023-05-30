import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LoginContext } from "../../context/LoginContext";
import Tooth from "../../assets/tooth.svg";
import ToothColorized from "../../img/logo-colorized.svg";

import Button from "../buttons/Button";
import ButtonMenu from "./components/ButtonMenu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./Header.module.css";

const Header = ({ colorized }) => {
  const { user, logout } = useContext(LoginContext);
  const [tipoUser, setTipoUser] = useState(null);

  useEffect(() => {
    if (user) {
      setTipoUser(user.user.type);
    } else return;
  }, [user]);

  const navigate = useNavigate();

  const handleRedirectInstituicao = () => {
    navigate("/instituicao/cadastrar");
  };

  const handleRedirectPaciente = () => {
    navigate("/paciente/cadastrar");
  };

  return (
    <nav className={styles.navHeader}>
      <div className={styles.header}>
        <Link to="/">
          <img
            src={colorized ? ToothColorized : Tooth}
            alt="ProtOn"
            className={styles.tooth}
          />
        </Link>
      </div>

      <div className={styles.section2}>
        {user ? (
          <div className={styles.linksHeader}>
            {tipoUser === "dentista" ? (
              <div className="itens-header">
                <Button
                  className={`${styles.buttonLink} ${
                    colorized && styles.colorized
                  }`}
                  onClick={() => {
                    navigate("/buscar-paciente");
                  }}
                >
                  Buscar Paciente
                </Button>
              </div>
            ) : (
              <Button
                className={`${styles.buttonLink} ${
                  colorized && styles.colorized
                }`}
                onClick={() => {
                  navigate("/perfil");
                }}
              >
                Perfil
              </Button>
            )}
            <Button className={styles.buttonLink} onClick={() => logout()}>
              Logout
            </Button>
          </div>
        ) : (
          <div className={styles.linksHeader}>
            <ButtonMenu
              className={`${styles.buttonLink} ${
                colorized && styles.colorized
              }`}
              text="Cadastrar"
            >
              <MenuItem onClick={handleRedirectPaciente}>Sou paciente</MenuItem>
              <MenuItem onClick={handleRedirectInstituicao}>
                Sou instituição
              </MenuItem>
            </ButtonMenu>

            <Button
              className={`${styles.buttonLink} ${
                colorized && styles.colorized
              }`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
