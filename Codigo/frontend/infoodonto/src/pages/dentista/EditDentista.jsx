//* CSS
import styles from "../../css/FormPaciente.module.css";

//* React
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//* Components
import Input from "../../components/inputs/Input";
import Button from "../../components/buttons/Button";
import Form from "../../components/forms/Form";
import Header from "../../components/headers/Header";
import { Alert } from "@mui/material";

//* Icons
import { BiShow, BiHide } from "react-icons/bi";

//* API
import { updateDentista } from "../../services/api";

//* Context
import { LoginContext } from "../../context/LoginContext";

const FormInstituicao = () => {
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [isHiddenConfirmPass, setIsHiddenConfirmPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState(null);
  const [alert, setAlert] = useState(null);
  const [currentDentista, setCurrentDentista] = useState(null);
  const { user, updateUser } = useContext(LoginContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setCurrentDentista(user.dentistas.find((dentista) => dentista._id === id));
  }, []);

  const handleCreateDentista = async (formData) => {
    const newDentista = Object.fromEntries(formData);

    if (confirmPass && newDentista.senha !== confirmPass) {
      setAlert({ severity: "error", msg: "As senhas não coincidem" });
      return;
    }

    newDentista._id = currentDentista._id;

    const dentistas = user.dentistas;
    const index = dentistas.findIndex(
      (dentista) => dentista._id === currentDentista._id
    );

    currentDentista.name = newDentista.name;
    currentDentista.user.email = newDentista.email;

    if (newDentista.senha) {
      currentDentista.user.senha = newDentista.senha;
    } else {
      newDentista.senha = currentDentista.user.senha;
    }

    setCurrentDentista(currentDentista);
    dentistas[index] = currentDentista;

    try {
      const response = await updateDentista(newDentista);

      if (response.status === 201) {
        const { msg } = response.data;

        setAlert({ severity: "success", msg });
        user.dentistas = dentistas;
        updateUser(user);

        setTimeout(() => {
          navigate("/perfil/dentistas");
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
                <h1 className={styles.title}>Editar dentista</h1>
                <p className={styles.descripton}>
                  Mantenha os dados de {currentDentista?.name} |{" "}
                  {currentDentista?.matricula} sempre atualizados
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
                    initialValue={currentDentista?.name}
                    required
                  />
                  <Input
                    type="text"
                    name="matricula"
                    id="matricula"
                    initialValue={currentDentista?.matricula}
                    disabled
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
                    initialValue={currentDentista?.user.email}
                    required
                  />
                  <Input
                    type={isHiddenPass ? "password" : "text"}
                    placeholder="Senha"
                    id="password"
                    name="senha"
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
                    placeholder="Confirmar senha"
                    id="confirmUpdatePassword"
                    onChange={(confimPass) => setConfirmPass(confimPass)}
                  >
                    <Button
                      type="button"
                      className="empty"
                      onClick={() =>
                        setIsHiddenConfirmPass(!isHiddenConfirmPass)
                      }
                    >
                      {isHiddenConfirmPass ? <BiShow /> : <BiHide />}
                    </Button>
                  </Input>
                </section>
                <div>
                  <Button type="submit" className="action submit blue-primary">
                    Atualizar
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
