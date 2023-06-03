//* CSS
import styles from "./Header.module.css";

//* React
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//* Logo
import Tooth from "../../assets/tooth.svg";
import ToothColorized from "../../img/logo-colorized.svg";

//* Components
import HeaderMobile from "./components/mobile/HeaderMobile";
import HeaderDesktop from "./components/desktop/HeaderDesktop";
import { LoginContext } from "../../context/LoginContext";

const Header = ({ colorized }) => {
  const { user, logout } = useContext(LoginContext);
  const [tipoUser, setTipoUser] = useState(null);

  useEffect(() => {
    console.log(user);
    if (user) setTipoUser(user.user.type);
  }, [user]);

  const mobileView = useMediaQuery({ maxWidth: 800 });

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
        {mobileView ? (
          <HeaderMobile user={tipoUser} logout={logout} colorized={colorized} />
        ) : (
          <HeaderDesktop
            user={tipoUser}
            logout={logout}
            colorized={colorized}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
