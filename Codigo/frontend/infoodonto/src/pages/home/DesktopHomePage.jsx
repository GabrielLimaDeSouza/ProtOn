import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Header from "../../components/headers/Header";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LoginContext } from "../../context/LoginContext";

// CSS
import styles from "../../css/HomePageDesktop.module.css";

// SVG's
import Logo from "../../img/logo.svg";
import DentalCare from "../../img/dental-care.png";

// Icons
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BiMenuAltLeft } from "react-icons/bi";

const DesktopHomePage = () => {
  const { user } = useContext(LoginContext);

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
    <>
      <div className={styles.body}>
        <Header />
        <div className={styles.divContent}>
          <div className={styles.icons}>
            <AiOutlineInstagram className={styles.icon} />
            <AiOutlineTwitter className={styles.icon} />
            <GrFacebookOption className={styles.icon} />
          </div>
          <div className={styles.content}>
            <div className={styles.logo}>
              <img src={Logo} alt="ProtOn" />
            </div>
            <div className={styles.divTitle}>
              <h1 className={styles.whiteTitle}>
                O software para <br />
                <span className={styles.markedTitle}>
                  gestão de protocolos <br />
                  odontológicos
                </span>
              </h1>
            </div>
            <div className={styles.divText}>
              <p className={styles.text}>
                O ProtOn auxilia na dinâmica e praticidade das consultas dos
                dentistas ao oferecer protocolos odontológicos de atendimento de
                acordo com as condições médicas do paciente
              </p>
            </div>
            <div className={styles.divButton}>
              {!user && (
                <>
                  <Button
                    className={styles.button}
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
                    <MenuItem onClick={handleRedirectPaciente}>
                      Sou paciente
                    </MenuItem>
                    <MenuItem onClick={handleRedirectInstituicao}>
                      Sou instituição
                    </MenuItem>
                  </Menu>
                  <p className={styles.pButton}>ou</p>
                  <Button
                    className={styles.button}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={styles.divBlank}></div>
        </div>
      </div>
      <div className={styles.divScroll}>
        <div className={styles.scrollTitle}>
          <h2>
            Seus protocolos na{" "}
            <span className={styles.scrollTitleSpan}>
              palma <br />
              da sua mão
            </span>
          </h2>
        </div>
        <div className={styles.divInformations}>
          <div className={styles.divInformationColumn}>
            <h3>+200</h3>
            <p>
              Clínicas utilizam o <br />
              ProtOn
            </p>
          </div>
          <div className={styles.divInformationColumn}>
            <h3>+10</h3>
            <p>
              Universidades cadastradas <br />
              em todo o Brasil
            </p>
          </div>
          <div className={styles.divInformationColumn}>
            <h3>+350</h3>
            <p>
              Dentistas se beneficiam da <br />
              plataforma
            </p>
          </div>
        </div>
        <div className={styles.divSobreNos}>
          <div className={styles.sobreNosLeftScreen}>
            <img src={DentalCare} alt="" />
          </div>
          <div className={styles.sobreNosRightScreen}>
            <div className={styles.divSobreNosTitle}>
              <BiMenuAltLeft className={styles.sobreNosIcon} />
              <h3>Sobre nós</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopHomePage;
