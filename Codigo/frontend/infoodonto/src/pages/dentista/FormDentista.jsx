//* CSS
import styles from "../../css/FormPaciente.module.css";

//* React
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//* Components
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import Form from "../../components/forms/Form";
import Header from "../../components/headers/Header";
import { Alert } from "@mui/material";

//* Icons
import { BiShow, BiHide } from "react-icons/bi";

//* API
import { createDentista } from "../../services/api";

//* Context
import { LoginContext } from "../../context/LoginContext";

const FormInstituicao = () => {
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [alert, setAlert] = useState(null);
  const { user, updateUser } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleCreateDentista = async (formData) => {
    const dentista = Object.fromEntries(formData);
    dentista.instituicao = user._id;

    try {
      const response = await createDentista(dentista);

      if (response.status === 201) {
        const { dentista, msg } = response.data;
        setAlert({ severity: "success", msg });
        user.dentistas.push(dentista);
        updateUser(user);

        setTimeout(() => {
          navigate("/perfil");
        }, 2000);
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
    } finally {
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <Header colorized />
        </div>
        <div className={styles.body}>
          <section className="create-account">
            <div className={styles.content}>
              <div className={styles.divTitle}>
                <h1 className={styles.title}>Criar nova conta</h1>
                <p className={styles.descripton}>
                  Adicione dentistas para que eles possam buscar por protocolos
                  odontologicos
                </p>
              </div>
            </div>
          </section>
          <Form className={styles.form} onSubmit={handleCreateDentista}>
            {alert && (
              <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                {alert.msg}
              </Alert>
            )}
            <div className={styles.formData}>
              <section className={styles.section1}>
                <section className={styles.sectionEdit}>
                  <h4 className={styles.titleSection}>Dados do Dentista</h4>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome"
                    required
                  />
                  <Input
                    type="text"
                    name="matricula"
                    id="matricula"
                    placeholder="Matricula"
                    required
                  />
                </section>
                <section className={styles.sectionEdit}>
                  <h4 className={styles.titleSection}>Login</h4>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                  <Input
                    type={isHiddenPass ? "password" : "text"}
                    placeholder="Senha"
                    id="password"
                    name="senha"
                  >
                    <button
                      type="button"
                      className={styles.empty}
                      onClick={() => setIsHiddenPass(!isHiddenPass)}
                    >
                      {isHiddenPass ? <BiShow /> : <BiHide />}
                    </button>
                  </Input>
                </section>
                <div>
                  <Button type="submit" className="submit blue-primary">
                    Criar Conta
                  </Button>
                </div>
              </section>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormInstituicao;
