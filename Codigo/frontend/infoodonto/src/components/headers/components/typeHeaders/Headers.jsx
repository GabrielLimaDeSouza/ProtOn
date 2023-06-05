//* CSS
import styles from "./Headers.module.css";

//* React
import { Link } from "react-router-dom";

//* Components
import Button from "../../../buttons/Button";
import MultipleMenu from "../cadastrar/MultipleMenu";

const Headers = ({ user, logout, colorized, mobile }) => {
  const HeaderInstituicao = () => {
    return (
      <>
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/perfil/dentistas"
        >
          Gerenciar Dentistas
        </Link>
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/perfil"
        >
          Perfil
        </Link>
      </>
    );
  };

  const HeaderPaciente = () => {
    return (
      <>
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/perfil/permissoes"
        >
          Gerenciar Permissões
        </Link>
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/perfil"
        >
          Perfil
        </Link>
      </>
    );
  };

  const HeaderDentista = () => {
    return (
      <>
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/dentista/buscar-paciente"
        >
          Buscar Paciente
        </Link>
      </>
    );
  };

  const HeaderNotLogged = () => {
    const cadastrar = (
      <>
        <Link
          className={`${styles.itemLink} ${styles.colorized}`}
          to="/paciente/cadastrar"
        >
          Sou Paciente
        </Link>
        <Link
          className={`${styles.itemLink} ${styles.colorized}`}
          to="/instituicao/cadastrar"
        >
          Sou Instituicao
        </Link>
      </>
    );

    return (
      <>
        {mobile ? (
          { cadastrar }
        ) : (
          <MultipleMenu
            label="Cadastrar"
            className="empty menu"
            colorized={colorized && styles.colorized}
          >
            {cadastrar}
          </MultipleMenu>
        )}
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/login"
        >
          Login
        </Link>
      </>
    );
  };

  return user ? (
    <>
      {user === "paciente" ? (
        <HeaderPaciente />
      ) : user === "instituicao" ? (
        <HeaderInstituicao />
      ) : (
        <HeaderDentista />
      )}

      <Button
        type="button"
        className="empty"
        id="btn-logout"
        onClick={() => logout()}
      >
        <Link
          className={`${styles.itemLink} ${colorized && styles.colorized}`}
          to="/"
        >
          Logout
        </Link>
      </Button>
    </>
  ) : (
    <HeaderNotLogged />
  );
};

export default Headers;
