//* CSS
import styles from "../../../../../css/Login.module.css";

//* React
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//* Components
import Input from "../../../../../components/inputs/Input";
import Button from "../../../../../components/buttons/Button";
import MultipleMenu from "../../../../../components/headers/components/cadastrar/MultipleMenu";
import Form from "../../../../../components/forms/Form";
import AlertComp from "../../../../../components/alerts/AlertComp";

//* API
import { enviarEmail } from "../../../../../services/api";

//* Icons
import { AiOutlineArrowLeft } from "react-icons/ai";

const VerificarCodigo = ({ code, email }) => {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_code, setCode] = useState(code || null);

  useEffect(() => {
    if (!code || !email) {
      navigate("/login/recuperar-senha/1", { replace: true });
    }
  }, []);

  useEffect(() => {
    console.log(_code);
  }, [_code]);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    const { code } = Object.fromEntries(formData);

    if (code !== _code) {
      setAlert("Código incorreto");

      setIsLoading(false);
      return;
    }

    navigate("/login/recuperar-senha/3", { state: { email }, replace: true });
  };

  const handleSendAgain = async () => {
    setIsLoading(true);

    const resp = await enviarEmail(email);

    if (resp.status !== 201) {
      setAlert(resp.data.msg);
    } else {
      setCode(resp.data.code);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.body}>
      <div className="divArrow">
        <Link to="/login/recuperar-senha/1">
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
            <h1 className={styles.title}>Código de recuperação</h1>
            <p className={styles.descripton}>
              Insira o código que enviamos para o seu email
            </p>
          </div>
          <div className={styles.divForm}>
            {alert && (
              <AlertComp severity="error" onClose={setAlert} timeToClose={3000}>
                {alert}
              </AlertComp>
            )}

            <Form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.enviarNovamente}>
                <span>Não recebeu o email?</span>
                <Button
                  type="button"
                  className="empty blue"
                  onClick={handleSendAgain}
                >
                  Enviar novamente
                </Button>
              </div>
              <Input
                type="text"
                name="code"
                id="codigo"
                placeholder="Código"
                maxLength="10"
                minLength="10"
                required
              />

              <Link
                to="/login/recuperar-senha/1"
                className={styles.anotherEmail}
              >
                Tentar com outro email
              </Link>

              <div>
                <Button
                  type="submit"
                  id="login"
                  className="action blue-primary"
                  loading={isLoading}
                >
                  {isLoading ? "Enviando" : "Enviar"}
                </Button>
              </div>
            </Form>
            <div className={styles.signUp}>
              Não possui conta?
              <MultipleMenu label="Cadastrar" className="empty" colorized />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerificarCodigo;
