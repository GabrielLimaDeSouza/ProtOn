//* CSS
import styles from "./PerfilPaciente.module.css";

//* React
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//* Components
import Condicoes from "../../../components/condicoes/Condicoes";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import Header from "../../../components/headers/Header";
import Form from "../../../components/forms/Form";
import { LoginContext } from "../../../context/LoginContext";

//* Material UI
import { Alert } from "@mui/material";

//* API
import { getCondicoes, updatePaciente } from "../../../services/api";

//* Icons
import { BiShow, BiHide } from "react-icons/bi";

const PerfilPaciente = () => {
  const { user, updateUser } = useContext(LoginContext);
  const [confirmSenha, setConfirmSenha] = useState();
  const [condicoes, setCondicoes] = useState(user.condicoes);
  const [condicoesOptions, setCondicoesOptions] = useState();
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [isHiddenConfirmPass, setIsHiddenConfirmPass] = useState(true);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const condicoesResp = await getCondicoes();
      setCondicoesOptions(condicoesResp.data);
    })();
  }, []);

  const handleUpdateUser = async (formData) => {
    const paciente = Object.fromEntries(formData);

    if ((confirmSenha || paciente.senha) && paciente.senha !== confirmSenha) {
      setAlert({ severity: "error", msg: "As senhas não coincidem" });

      setTimeout(() => {
        setAlert(null);
      }, 3000);

      return;
    }

    if (paciente.senha === "") {
      paciente.senha = user.user.senha;
    }

    paciente.condicoes = condicoes;

    try {
      const response = await updatePaciente(user._id, paciente);

      if (response.status === 201) {
        user.name = paciente.name;
        user.user.email = paciente.email;
        user.user.senha = paciente.senha;
        user.condicoes = condicoes;

        updateUser(user);

        setAlert({ severity: "success", msg: response.data.msg });
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
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
        <section className="edit-dados">
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <h1 className={styles.title}>Editar dados</h1>
              <p className={styles.descripton}>
                Mantenha seus dados pessoais sempre atualizados
              </p>
            </div>
          </div>
        </section>

        <Form className={styles.form} onSubmit={handleUpdateUser}>
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
                  initialValue={user?.name}
                  name="name"
                  id="updateName"
                  placeholder="Nome"
                />

                <Input
                  type="text"
                  initialValue={user?.cpf}
                  name="cpf"
                  id="updateCpf"
                  placeholder="CPF"
                  disabled
                />
              </section>

              <section className={styles.sectionEdit}>
                <h4 className={styles.titleSection}>Login</h4>
                <Input
                  type="text"
                  initialValue={user?.user.email}
                  name="email"
                  id="updateEmail"
                  placeholder="Email"
                />

                <Input
                  type={isHiddenPass ? "password" : "text"}
                  name="senha"
                  placeholder="Senha"
                  id="updatePassword"
                >
                  <button
                    type="button"
                    className={styles.empty}
                    onClick={() => setIsHiddenPass(!isHiddenPass)}
                  >
                    {isHiddenPass ? <BiShow /> : <BiHide />}
                  </button>
                </Input>

                <Input
                  type={isHiddenConfirmPass ? "password" : "text"}
                  placeholder="Confirmar senha"
                  id="confirmUpdatePassword"
                  onChange={setConfirmSenha}
                >
                  <button
                    type="button"
                    className="empty"
                    onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}
                  >
                    {isHiddenConfirmPass ? <BiShow /> : <BiHide />}
                  </button>
                </Input>
              </section>
            </section>

            <section className={styles.sectionEdit}>
              <h4 className={styles.titleSection}>Condições</h4>
              <Condicoes
                condicoes={user.condicoes}
                options={condicoesOptions}
                onChange={(condicoes) => setCondicoes(condicoes)}
                edit
              />
            </section>
          </div>

          <div>
            <Button type="submit" className="submit blue-primary">
              Atualizar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PerfilPaciente;
