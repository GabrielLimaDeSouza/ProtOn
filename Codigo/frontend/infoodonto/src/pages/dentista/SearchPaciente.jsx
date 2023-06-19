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
import Loading from "../../components/loadings/Loading";
import AlertComp from "../../components/alerts/AlertComp";

//* API
import { buscarPaciente } from "../../services/api";

//* Context
import { LoginContext } from "../../context/LoginContext";

const SearchPaciente = () => {
  const [paciente, setPaciente] = useState(null);
  const [sendSolicitation, setSendSolicitation] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useContext(LoginContext);

  const handleSearchPaciente = async (formData) => {
    setIsLoading(true);

    const { cpf } = Object.fromEntries(formData);
    setCpf(cpf);

    try {
      const { status, data } = await buscarPaciente(cpf, user._id);

      if (status === 201) {
        setPaciente(data);
      }
    } catch (err) {
      const { status, data } = err.response;
      setAlert({ severity: "error", msg: data.msg });

      setPaciente(null);

      if (status === 401) {
        setSendSolicitation(true);
      }
    }

    setIsLoading(false);
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
                Busque por pacientes pelo CPF para acessar suas condições de
                saúde e receber recomendações de protocolos odontológicos
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
                <Button
                  type="submit"
                  className="action blue-primary"
                  loading={isLoading}
                >
                  Buscar
                </Button>
              </div>
            </Form>
          </div>
          {alert && (
            <div className={styles.alert}>
              <AlertComp
                severity={alert.severity}
                onClose={setAlert}
                timeToClose={4000}
              >
                {alert.msg}
              </AlertComp>
            </div>
          )}
          <div className={styles.results}>
            {isLoading ? (
              <Loading />
            ) : paciente ? (
              <Result paciente={paciente} />
            ) : (
              sendSolicitation && (
                <SendSolicitacao
                  cpf={cpf}
                  dentista={user._id}
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
