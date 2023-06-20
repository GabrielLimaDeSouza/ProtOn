import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//* Componentes
import Header from "../../components/headers/Header";
import Button from "../../components/buttons/Button";
import MultipleMenu from "../../components/headers/components/cadastrar/MultipleMenu";
import { LoginContext } from "../../context/LoginContext";

//* CSS
import styles from "../../css/HomePageDesktop.module.css";

//* SVG's
import Logo from "../../img/logo.svg";
import DentalCare from "../../img/dental-care.png";

//* Icons
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BiMenuAltLeft } from "react-icons/bi";

const DesktopHomePage = ({ quantPacientes, quantInsituicoes, quantDentistas }) => {
  const { user } = useContext(LoginContext);

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
                acordo com as condições de saúde dos pacientes
              </p>
            </div>
            <div className={styles.divButton}>
              {!user && (
                <>
                  <MultipleMenu
                    label="Cadastrar"
                    className="action blue-primary-reverse home"
                    colorized
                  />

                  <p className={styles.pButton}>ou</p>


                    <Link className={styles.button} to="/login">
                      <Button type="button" className="action blue-primary-reverse">
                        Login
                      </Button>
                    </Link>
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
            <h3>{quantInsituicoes}</h3>
            <p>
              Intituições utilizam o <br />
              ProtOn
            </p>
          </div>
          <div className={styles.divInformationColumn}>
            <h3>{quantPacientes}</h3>
            <p>
              Pacientes cadastrados <br />
              em todo o Brasil
            </p>
          </div>
          <div className={styles.divInformationColumn}>
            <h3>{quantDentistas}</h3>
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
            No ProtOn sabemos que cada paciente é único, por isso nossas recomendações de protocolos se baseiam nas melhores práticas odontológicas, 
oferecendo protocolos eficazes que se adequam às necessidades de cada paciente.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DesktopHomePage;
