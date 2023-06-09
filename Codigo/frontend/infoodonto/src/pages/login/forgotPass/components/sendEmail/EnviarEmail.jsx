//* CSS
import styles from "../../../../../css/Login.module.css";

//* React
import { useState } from "react";
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

const EnviarEmail = () => {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    const { email } = Object.fromEntries(formData);

    try {
      const resp = await enviarEmail(email);

      if (resp.status !== 201) {
        setAlert(resp.data.error);

        setIsLoading(false);
      } else {
        navigate("/login/recuperar-senha/2", {
          state: { code: resp.data.code, email },
        });
      }
    } catch (err) {
      setAlert(err.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className="divArrow">
        <Link to="/login">
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
            <h1 className={styles.title}>Esqueceu Senha</h1>
            <p className={styles.descripton}>
              Digite um endereço de email associado a sua conta para recuperação
              da senha
            </p>
          </div>
          <div className={styles.divForm}>
            {alert && (
              <AlertComp severity="error" onClose={setAlert} timeToClose={3000}>
                {alert}
              </AlertComp>
            )}

            <Form className={styles.form} onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />

              <div>
                <Button
                  type="submit"
                  id="login"
                  className="action blue-primary"
                  loading={isLoading}
                >
                  {isLoading ? "Confirmando" : "Confirmar email"}
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

export default EnviarEmail;
