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
import { recuperarSenha } from "../../../../../services/api";

//* Icons
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";

const RasetarSenha = ({ email }) => {
  const [alert, setAlert] = useState(null);
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [isHiddenConfirmPass, setIsHiddenConfirmPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/login/recuperar-senha/1");
    }
  });

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    const { senha, confirmarSenha } = Object.fromEntries(formData);

    if (senha !== confirmarSenha) {
      setAlert({ severity: "error", msg: "As senhas não coincidem" });
      setIsLoading(false);
      return;
    }

    try {
      const resp = await recuperarSenha(email, senha);

      if (resp.status !== 201) {
        setAlert({ severity: "error", msg: resp.data.error });
      } else {
        setAlert({ severity: "success", msg: resp.data.msg });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

      setIsLoading(false);
    } catch (err) {
      const { error } = err.response.data;

      setAlert({ severity: "error", msg: error });
    }
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
            <h1 className={styles.title}>Redefinir senha</h1>
            <p className={styles.descripton}>Digite um nova senha</p>
          </div>
          <div className={styles.divForm}>
            {alert && (
              <AlertComp
                severity={alert.severity}
                onClose={setAlert}
                timeToClose={3000}
              >
                {alert.msg}
              </AlertComp>
            )}

            <Form className={styles.form} onSubmit={handleSubmit}>
              <Input
                type={isHiddenPass ? "password" : "text"}
                name="senha"
                placeholder="Nova senha"
                id="updatePassword"
                required
              >
                <Button
                  type="button"
                  className="empty"
                  onClick={() => setIsHiddenPass(!isHiddenPass)}
                >
                  {isHiddenPass ? <BiShow /> : <BiHide />}
                </Button>
              </Input>

              <Input
                type={isHiddenConfirmPass ? "password" : "text"}
                name="confirmarSenha"
                placeholder="Confirmar nova senha"
                id="confirmUpdatePassword"
                required
              >
                <Button
                  type="button"
                  className="empty"
                  onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}
                >
                  {isHiddenConfirmPass ? <BiShow /> : <BiHide />}
                </Button>
              </Input>

              <div>
                <Button
                  type="submit"
                  id="login"
                  className="action blue-primary"
                  loading={isLoading}
                >
                  {isLoading ? "Processando" : "Alterar Senha"}
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

export default RasetarSenha;
