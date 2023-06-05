//* CSS
import styles from "../../css/Login.module.css";

//* React
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

//* Components
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import MultipleMenu from "../../components/headers/components/cadastrar/MultipleMenu";
import Form from "../../components/forms/Form";

//* Meterial UI
import { Alert } from "@mui/material";

//* Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

const Login = () => {
  const [alert, setAlert] = useState(null);

  const { login } = useContext(LoginContext);

  const handleSubmit = async (formData) => {
    const { email, senha } = Object.fromEntries(formData);
    const resp = await login(email, senha);

    if (resp.status !== 201) {
      setAlert(resp.msg);

      setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
  };

  return (
    <div className={styles.body}>
      <div className="divArrow">
        <Link to="/">
          <AiOutlineArrowLeft className="arrowBackWhite" />
        </Link>
      </div>
      <section className="logo-login">
        <div className={styles.logo}>
          <img src="/logo.svg" alt="ProtOn" />
        </div>
      </section>
      <section className="content-login">
        <div className={styles.content}>
          <div className={styles.divTitle}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.descripton}>
              Faça o login para acessar a plataforma
            </p>
          </div>
          <div className={styles.divForm}>
            {alert && (
              <Alert severity="error" onClose={() => setAlert(null)}>
                {alert}
              </Alert>
            )}

            <Form className={styles.form} onSubmit={handleSubmit}>
              <Input type="email" placeholder="Email" id="email" name="email" />
              <Input
                type="password"
                placeholder="Senha"
                id="senha"
                name="senha"
              />

              <div>
                <Button
                  type="submit"
                  id="login"
                  className="action blue-primary submit"
                >
                  Entrar
                </Button>
              </div>
            </Form>
            <p className={styles.signUp}>
              Não possui conta?
              <MultipleMenu label="Cadastrar" className="empty" colorized />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
