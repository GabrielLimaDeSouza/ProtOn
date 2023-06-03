//* CSS
import styles from "./HeaderDesktop.module.css";

//* Components
import Headers from "../typeHeaders/Headers";

const HeaderDesktop = ({ user, logout, colorized }) => {
  return (
    <div className={styles.body}>
      <Headers user={user} logout={logout} colorized={colorized} />
    </div>
  );
};

export default HeaderDesktop;
