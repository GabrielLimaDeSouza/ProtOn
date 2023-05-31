import React from "react";
import { useNavigate } from "react-router-dom";

// Lib
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// CSS
import styles from "../../css/HomePageMobile.module.css";

// SVG's
import Logo from "../../img/logo.svg";

// Icons
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BiMenuAltLeft } from "react-icons/bi";
import Header from "../../components/headers/Header";

const MobileHomePage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRedirectInstituicao = () => {
    setAnchorEl(null);
    navigate("/instituicao/cadastrar");
  };

  const handleRedirectPaciente = () => {
    setAnchorEl(null);
    navigate("/paciente/cadastrar");
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.body}>
          <div className={styles.logo}>
            <img src={Logo} alt="ProtOn" />
          </div>
          <div className={styles.divContent}>
            <div className={styles.icons}>
              <AiOutlineInstagram className={styles.icon} />
              <AiOutlineTwitter className={styles.icon} />
              <GrFacebookOption className={styles.icon} />
            </div>
            <div className={styles.title}>
              <h1 className={styles.whiteTitle}>
                O software para{" "}
                <span className={styles.markedTitle}>
                  gestão de protocolos odontológicos
                </span>
              </h1>
            </div>
            <div className={styles.divText}>
              <p className={styles.text}>
                O ProtOn auxilia na dinâmica e praticidade das consultas dos
                dentistas ao oferecer protocolos odontológicos de atendimento de
                acordo com as condições do paciente
              </p>
            </div>
            <div className={styles.divButton}>
              <Button
                className={styles.button}
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Cadastrar
              </Button>
              <p className={styles.pButton}>ou</p>
              <Button
                className={styles.button}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.divScroll}>
          <div className={styles.scrollTitle}>
            <h2>
              Seus protocolos na{" "}
              <span className={styles.scrollTitleSpan}>palma da sua mão</span>
            </h2>
          </div>
          <div className={styles.divInformations}>
            <div>
              <h3>+200</h3>
              <p>Clínicas utilizam o ProtOn</p>
            </div>
            <div>
              <h3>+10</h3>
              <p>Universidades cadastradas em todo o Brasil</p>
            </div>
            <div>
              <h3>+350</h3>
              <p>Dentistas se beneficiam da plataforma</p>
            </div>
          </div>
          <div className={styles.divAboutUs}>
            <div className={styles.divAboutUsTitle}>
              <BiMenuAltLeft className={styles.aboutUsIcon} />
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
        <MenuItem onClick={handleRedirectInstituicao}>Sou instituição</MenuItem>
      </Menu>
    </>
  );
};

export default MobileHomePage;
