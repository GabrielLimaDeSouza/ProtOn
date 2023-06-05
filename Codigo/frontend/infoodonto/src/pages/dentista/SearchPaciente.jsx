//* CSS
import styles from "../../css/SearchPaciente.module.css";

//* React
import { useContext, useState } from "react";

//* Components
import Header from "../../components/headers/Header";
import Input from "../../components/inputs/Input";
import Form from "../../components/forms/Form";
import Button from "../../components/buttons/Button";
import Result from "./components/results/Result";
import SendSolicitacao from "./components/solicitations/SendSolicitacao";
import { LoginContext } from "../../context/LoginContext";

//* Material UI
import { Alert } from "@mui/material";

//* API
import { buscarPaciente } from "../../services/api";

const SearchPaciente = () => {
  const [paciente, setPaciente] = useState(null);
  const [sendSolicitation, setSendSolicitation] = useState(null);
  const [alert, setAlert] = useState(null);
  const { user } = useContext(LoginContext);

  const handleSearchPaciente = async (formData) => {
    const { cpf } = Object.fromEntries(formData);

    try {
      const { status, data } = await buscarPaciente(cpf, user._id);

      if (status === 201) {
        setPaciente(data);
      }
    } catch (err) {
      const { status, data } = err.response;
      setAlert({ severity: "error", msg: data.error });

      if (status === 401) {
        setSendSolicitation({ cpf, dentista: user._id });
      }
    } finally {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header colorized />
      </div>
      <div className={styles.body}>
        <section className="title">
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <h1 className={styles.title}>Buscar por pacientes</h1>
              <p className={styles.descripton}>
                Busque por pacientes pelo CPF para acessar suas condições e
                protocolos
              </p>
            </div>
          </div>
        </section>

        <section className={styles.buscarPaciente}>
          <div className={styles.search}>
            <Form className={styles.formSearch} onSubmit={handleSearchPaciente}>
              <div>
                <Input
                  type="search"
                  id="search-cpf"
                  name="cpf"
                  placeholder="Buscar por CPF"
                  maxLength="11"
                  minLength="11"
                  pattern="[0-9]+([,\.][0-9]+)?"
                  title="Insira somente números"
                  required
                />
              </div>
              <div>
                <Button type="submit" className="action blue-primary submit">
                  Buscar
                </Button>
              </div>
            </Form>
          </div>
          {alert && (
            <div className={styles.alert}>
              <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                {alert.msg}
              </Alert>
            </div>
          )}
          <div className={styles.results}>
            {paciente ? (
              <Result paciente={paciente} />
            ) : (
              sendSolicitation && (
                <SendSolicitacao
                  cpf={sendSolicitation.cpf}
                  dentista={sendSolicitation.dentista}
                  alert={setAlert}
                />
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchPaciente;
