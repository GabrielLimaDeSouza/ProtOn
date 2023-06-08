//* CSS
import styles from "../../../css/FormPaciente.module.css";

//* React
import { useContext, useState } from "react";

//* Components
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import Form from "../../../components/forms/Form";
import Header from "../../../components/headers/Header";
import { LoginContext } from "../../../context/LoginContext";

//* Material UI
import { Alert } from "@mui/material";

//* Icons
import { BiShow, BiHide } from "react-icons/bi";

//* API
import { updateInstituicao, deleteInstituicao } from "../../../services/api";

const PerfilInstituicao = () => {
  const [isHiddenConfirmPass, setIsHiddenConfirmPass] = useState(true);
  const [isHiddenPass, setIsHiddenPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { user, updateUser, logout } = useContext(LoginContext);

  const handleUpdateInstituicao = async (formData) => {
    setIsLoadingUpdate(true);

    const instituicao = Object.fromEntries(formData);

    if (
      (confirmPass || instituicao.senha) &&
      instituicao.senha !== confirmPass
    ) {
      setAlert({ severity: "error", msg: "As senhas não coincidem" });

      setTimeout(() => {
        setAlert(null);
      }, 3000);

      return;
    }

    if (instituicao.senha === "") {
      instituicao.senha = user.user.senha;
    }

    try {
      const response = await updateInstituicao(user._id, instituicao);

      if (response.status === 201) {
        user.name = instituicao.name;
        user.user.email = instituicao.email;
        user.user.senha = instituicao.senha;
        updateUser(user);

        setAlert({ severity: "success", msg: response.data.msg });
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
    } finally {
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }

    setIsLoadingUpdate(false);
  };

  const handleDeleteAccount = async () => {
    setIsLoadingDelete(true);

    try {
      const response = await deleteInstituicao(user._id);

      if (response.status === 201) {
        setAlert({ severity: "success", msg: response.data.msg });

        setTimeout(() => {
          setAlert(null);
          logout();
        }, 3000);
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }

    setIsLoadingDelete(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header colorized />
      </div>
      <div className={styles.body}>
        <section className="update-account">
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <h1 className={styles.title}>Editar dados</h1>
              <p className={styles.descripton}>
                Mantenha seus dados sempre atualizados
              </p>
            </div>
          </div>
        </section>
        <Form className={styles.form} onSubmit={handleUpdateInstituicao}>
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
                  initialValue={user?.name}
                  required
                />
                <Input
                  type="text"
                  id="selectTipo"
                  name="tipo"
                  initialValue={user?.tipo}
                  disabled
                />
              </section>
              <section className={styles.sectionEdit}>
                <h4 className={styles.titleSection}>Login</h4>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  initialValue={user?.user.email}
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
                    id="btn-hidden-pass"
                    onClick={() => setIsHiddenPass(!isHiddenPass)}
                  >
                    {isHiddenPass ? <BiShow /> : <BiHide />}
                  </Button>
                </Input>
                <Input
                  type={isHiddenConfirmPass ? "password" : "text"}
                  placeholder="Confirmar senha"
                  id="confirmUpdatePassword"
                  onChange={setConfirmPass}
                >
                  <Button
                    type="button"
                    className="empty"
                    id="btn-hidden-cfmPass"
                    onClick={() => setIsHiddenConfirmPass(!isHiddenConfirmPass)}
                  >
                    {isHiddenConfirmPass ? <BiShow /> : <BiHide />}
                  </Button>
                </Input>
              </section>
            </section>
          </div>
          <div className={styles.hudBtn}>
            <Button
              type="button"
              className="action delete"
              onClick={handleDeleteAccount}
              loading={isLoadingDelete}
            >
              Apagar conta
            </Button>
            <Button
              type="submit"
              id="login"
              className="action blue-primary"
              loading={isLoadingUpdate}
            >
              Atualizar dados
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PerfilInstituicao;
