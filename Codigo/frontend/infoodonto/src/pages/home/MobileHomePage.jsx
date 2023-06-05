//* CSS
import styles from "../../css/HomePageMobile.module.css";

//* React
import { useContext } from "react";
import { Link } from "react-router-dom";

//* Components
import Header from "../../components/headers/Header";
import MultipleMenu from "../../components/headers/components/cadastrar/MultipleMenu";
import Button from "../../components/buttons/Button";
import { LoginContext } from "../../context/LoginContext";

//* SVG's
import Logo from "../../img/logo.svg";

//* Icons
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BiMenuAltLeft } from "react-icons/bi";

const MobileHomePage = () => {
  const { user } = useContext(LoginContext);

  const cadastrar = (
    <>
      <Link className={styles.button} to="/paciente/cadastrar">
        Sou Paciente
      </Link>
      <Link className={styles.button} to="/instituicao/cadastrar">
        Sou Instituicao
      </Link>
    </>
  );

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
              {!user && (
                <>
                  <MultipleMenu
                    label="Cadastrar"
                    className="action blue-primary-reverse home"
                    colorized
                  >
                    {cadastrar}
                  </MultipleMenu>

                  <p className={styles.pButton}>ou</p>

                  <Button type="button" className="action blue-primary-reverse">
                    <Link className={styles.button} to="/login">
                      Login
                    </Link>
                  </Button>
                </>
              )}
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
    </>
  );
};

export default MobileHomePage;
