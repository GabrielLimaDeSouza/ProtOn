import styles from "../../css/HomePaciente.module.css";
import Tooth from "../../img/logo-colorized.svg";
import Perfil from "../../components/componentsApp/perfil/perfil";
import MedicosVinculados from "../../components/componentsApp/dentistasVinculados/dentistasVinculados";
import DentistasAceitos from "../../components/componentsApp/dentistasAceitos/dentistasAceitos";
import { useState, useEffect, useContext } from "react";
import { getCondicoes } from "../../services/api";
import { LoginContext } from "../../context/LoginContext";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import {
  BsFillPersonFill,
  BsFillGearFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const HomePaciente = () => {
  const { user, logout } = useContext(LoginContext);
  const [condicoesPaciente, setCondicoesPaciente] = useState(null);
  const [paginaSelecionada, setPaginaSelecionada] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getCondicoes();
      const condicoes = data.map((item) => item);

      setCondicoesPaciente(condicoes);
      setPaginaSelecionada(
        <Perfil
          currentId={user._id}
          currentName={user.name}
          currentCpf={user.cpf}
          currentEmail={user.user.email}
          currentCondicao={user.condicoes}
          currentSenha={user.user.senha}
          option={condicoes}
        />
      );

      setIsLoading(false);
    })();
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [IconeMenu, setIconeMenu] = useState(
    <BsFillPersonFill color="#4ea2cc" size="1.5rem" onClick={handleClick} />
  );

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={styles.header}>
            <Link to="/">
              <img src={Tooth} alt="" className={styles.tooth} />
            </Link>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="More">{IconeMenu}</Tooltip>
            </Box>
          </div>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                backgroundColor: "#62A8DB",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "#62A8DB",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                setIconeMenu(
                  <BsFillPersonFill
                    color="#4ea2cc"
                    size="1.5rem"
                    onClick={handleClick}
                  />
                );
                setPaginaSelecionada(
                  <Perfil
                    currentName={user.name}
                    currentCpf={user.cpf}
                    currentEmail={user.user.email}
                    currentCondicao={user.condicoes}
                    currentSenha={user.user.senha}
                    option={condicoesPaciente}
                  />
                );
              }}
            >
              <ListItemIcon>
                <BsFillPersonFill size="1.5rem" />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIconeMenu(
                  <BsFillPersonPlusFill
                    color="#4ea2cc"
                    size="1.5rem"
                    onClick={handleClick}
                  />
                ),
                  setPaginaSelecionada(
                    <MedicosVinculados
                      pacienteLogado={user.cpf}
                      solicitacoes={user.solicitacoes}
                    />
                  );
              }}
            >
              <ListItemIcon>
                <BsFillPersonPlusFill size="1.5rem" />
              </ListItemIcon>
              Solicitações de acesso
            </MenuItem>

            <MenuItem
              onClick={() => {
                setIconeMenu(
                  <BsFillGearFill
                    color="#4ea2cc"
                    size="1.5rem"
                    onClick={handleClick}
                  />
                ),
                  setPaginaSelecionada(
                    <DentistasAceitos
                      pacienteLogado={user.cpf}
                      aceitos={user.dentistas}
                    />
                  );
              }}
            >
              <ListItemIcon>
                <BsFillGearFill size="1.5rem" />
              </ListItemIcon>
              Gerenciar dentistas
            </MenuItem>

            <Divider />
            <MenuItem
              onClick={() => {
                logout;
              }}
            >
              <ListItemIcon>
                <IoIosLogOut color="#000" size="1.5rem" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>

          <div className={styles.main}>
            <div className={styles.content}>{paginaSelecionada}</div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePaciente;
