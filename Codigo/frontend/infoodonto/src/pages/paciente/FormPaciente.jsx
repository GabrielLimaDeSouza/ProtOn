//* CSS
import styles from "../../css/FormPaciente.module.css";

//* React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//* Components
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import Condicoes from "../../components/condicoes/Condicoes";
import Form from "../../components/forms/Form";
import Header from "../../components/headers/Header";
import { Alert } from "@mui/material";

//* Icons
import { BiShow, BiHide } from "react-icons/bi";

//* API
import { getCondicoes, createPaciente } from "../../services/api";

const FormPaciente = () => {
  const [condicoes, setCondicoes] = useState(null);
  const [condicoesPaciente, setCondicoesPaciente] = useState(null);
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const condicoesResp = await getCondicoes();
      setCondicoes(condicoesResp.data);
    })();
  }, []);

  const handleCreatePaciente = async (formData) => {
    const paciente = Object.fromEntries(formData);
    paciente.cpf = formatarCPF(paciente.cpf);
    paciente.condicoes = condicoesPaciente;

    try {
      const response = await createPaciente(paciente);

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
      }, 2000);
    }
  };

  const formatarCPF = (cpf) => {
    return cpf.replace(/\D/g, "");
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
                  Crie uma nova conta no ProtOn para obter uma melhor
                  experiência nas suas consultas com o dentista
                </p>
              </div>
            </div>
          </section>
          <Form className={styles.form} onSubmit={handleCreatePaciente}>
            {alert && (
              <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                {alert.msg}
              </Alert>
            )}
            <div className={styles.formData}>
              <section className={styles.section1}>
                <section className={styles.sectionEdit}>
                  <h4 className={styles.titleSection}>Dados pessoais</h4>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome"
                    required
                  />
                  <Input
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="CPF (Somente números)"
                    maxLength="11"
                    minLength="11"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    title="Insira somente números"
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
                    <button
                      type="button"
                      className={styles.empty}
                      onClick={() => setIsHiddenPass(!isHiddenPass)}
                    >
                      {isHiddenPass ? <BiShow /> : <BiHide />}
                    </button>
                  </Input>
                </section>
              </section>
              <section className={styles.sectionEdit}>
                <h4 className={styles.titleSection}>Condições</h4>
                <Condicoes
                  options={condicoes}
                  onChange={setCondicoesPaciente}
                />
              </section>
            </div>
            <div>
              <Button type="submit" className="submit blue-primary">
                Criar Conta
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormPaciente;
