//* CSS
import styles from "../../css/FormPaciente.module.css";

//* React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//* Components
import Input from "../../components/inputs/Input";
import Select from "../../components/selects/Select";
import Button from "../../components/buttons/Button";
import Form from "../../components/forms/Form";
import Header from "../../components/headers/Header";

//* Material UI
import { Alert } from "@mui/material";

//* Icons
import { BiShow, BiHide } from "react-icons/bi";

//* API
import { createInstituicao } from "../../services/api";

const FormInstituicao = () => {
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateInstituicao = async (formData) => {
    setIsLoading(true);
    const instituicao = Object.fromEntries(formData);

    if (instituicao.tipo === "0") {
      setAlert({ severity: "error", msg: "Selecione um tipo" });
      return;
    }

    try {
      const response = await createInstituicao(instituicao);

      if (response.status === 201) {
        setAlert({ severity: "success", msg: response.data.msg });
        setTimeout(() => {
          navigate("/login");
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

    setIsLoading(false);
  };

  return (
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
                Crie uma nova conta no ProtOn para tornar as consultas de seus
                dentistas mais dinâmicas
              </p>
            </div>
          </div>
        </section>
        <Form className={styles.form} onSubmit={handleCreateInstituicao}>
          {alert && (
            <Alert severity={alert.severity} onClose={() => setAlert(null)}>
              {alert.msg}
            </Alert>
          )}
          <div className={styles.formData}>
            <section className={styles.section1}>
              <section className={styles.sectionEdit}>
                <h4 className={styles.titleSection}>Dados institucionais</h4>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nome"
                  required
                />
                <Select
                  id="selectTipo"
                  name="tipo"
                  options={["Clinica", "Hospital", "Universidade"]}
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
              </section>
            </section>
          </div>
          <div>
            <Button
              type="submit"
              id="login"
              className="action blue-primary"
              loading={isLoading}
            >
              Criar conta
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormInstituicao;
