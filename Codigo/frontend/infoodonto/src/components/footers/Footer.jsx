//* CSS
import styles from "./Footer.module.css";

//* React
import { useState } from "react";

//* Logo
import Logo from "../../img/logo.svg";

//* Icons
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";

const Footer = () => {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className={styles.footer}>
      <div className={styles.logoNameLocal}>
        <img className={styles.logo} src={Logo} alt="ProtOn" />
        <p className={styles.copyright}>
          <span className={styles.name}>&copy; {year} ProtOn Odontologia</span>
          <span className={styles.local}> Belo Horizonte, Brasil</span>
          <span className={styles.allRights}> Todos diretos reservados</span>
        </p>
      </div>
      <div className={styles.icons}>
        <GrFacebookOption size={"1.3rem"} />
        <AiOutlineTwitter size={"1.3rem"} />
        <AiOutlineInstagram size={"1.3rem"} />
      </div>
    </footer>
  );
};

export default Footer;
