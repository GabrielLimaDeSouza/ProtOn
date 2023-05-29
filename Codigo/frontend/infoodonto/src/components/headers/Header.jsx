import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LoginContext } from "../../context/LoginContext";
import Tooth from "../../assets/tooth.svg";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useContext(LoginContext);
  const [tipoUser, setTipoUser] = useState(null);

  useEffect(() => {
    if (user) {
      setTipoUser(user.user.type);
    } else return;
  }, [user]);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = !!anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRedirectInstituicao = () => {
    setAnchorEl(null);
    navigate("/formInstituicao");
  };

  const handleRedirectPaciente = () => {
    setAnchorEl(null);
    navigate("/formPaciente");
  };

  return (
    <nav className={styles.navHeader}>
      <div className={styles.header}>
        <Link to="/">
          <img src={Tooth} alt="" className={styles.tooth} />
        </Link>
      </div>

      <div className={styles.section2}>
        {user ? (
          <div className={styles.linksHeader}>
            {tipoUser === "dentista" ? (
              <div className="itens-header">
                <Button
                  className={styles.buttonLink}
                  onClick={() => {
                    navigate("/searchPaciente");
                  }}
                >
                  Buscar Paciente
                </Button>
              </div>
            ) : (
              <Button
                className={styles.buttonLink}
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
            <Button
              className={styles.buttonLink}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Cadastrar
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleRedirectPaciente}>Sou paciente</MenuItem>
              <MenuItem onClick={handleRedirectInstituicao}>
                Sou instituição
              </MenuItem>
            </Menu>
            <Button
              className={styles.buttonLink}
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
