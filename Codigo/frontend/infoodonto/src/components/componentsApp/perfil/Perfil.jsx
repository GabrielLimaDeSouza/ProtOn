import { useContext, useState } from "react";
import Input from "../../inputs/Input";
import Button from "../../buttons/Button";
import styles from "./Perfil.module.css";
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Condicoes from "./components/Condicoes";

const Perfil = ({
  currentName,
  currentEmail,
  currentCpf,
  currentCondicao,
  option,
  currentId,
}) => {
  const { user, updateUser } = useContext(LoginContext);
  const [userState, setUserState] = useState(user);
  const [confirmSenha, setConfirmSenha] = useState();

  const navigate = useNavigate();

  function atualizar() {
    const condicoes = userState.condicoes.map((condicao) => condicao._id);

    if (confirmSenha && userState.user.senha !== confirmSenha) {
      alert("As senhas não coincidem");
      return;
    }

    console.log(userState);

    fetch(`http://localhost:3000/api/paciente?id=${currentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userState.name,
        email: userState.user.email,
        senha: userState.user.senha,
        condicoes,
      }),
    })
      .then(() => {
        updateUser(userState);

        setTimeout(() => {
          navigate("/perfil");
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChangePass = (senha) => {
    if (senha !== confirmSenha) {
      return;
    }

    setUserState({ ...userState, user: { ...userState.user, senha } });
  };

  const handleChangeVisibilityPass = () => {};

  return (
    <>
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
        <div className={styles.formData}>
          <section className={styles.section1}>
            <section className={styles.sectionEdit}>
              <h4 className={styles.titleSection}>Dados pessoais</h4>
              <Input
                type="text"
                initialValue={currentName}
                id="updateName"
                placeholder="Nome"
                onChange={(name) => setUserState({ ...userState, name })}
              />
              <Input
                type="text"
                initialValue={currentCpf}
                id="updateCpf"
                placeholder="CPF"
                disabled
              />
            </section>
            <section className={styles.sectionEdit}>
              <h4 className={styles.titleSection}>Login</h4>
              <Input
                type="text"
                initialValue={currentEmail}
                id="updateEmail"
                placeholder="Email"
                onChange={(email) =>
                  setUserState({
                    ...userState,
                    user: { ...userState.user, email },
                  })
                }
              />
              <Input
                type="password"
                placeholder="Senha"
                id="updatePassword"
                onChange={handleChangePass}
              />
              <Input
                type="password"
                placeholder="Confirmar senha"
                id="confirmUpdatePassword"
                onChange={(confimSenha) => setConfirmSenha(confimSenha)}
              />
            </section>
          </section>
          <section className={styles.sectionEdit}>
            <h4 className={styles.titleSection}>Condições</h4>
            <Condicoes
              condicoes={currentCondicao}
              options={option}
              onChange={(condicoes) =>
                setUserState({
                  ...userState,
                  condicoes,
                })
              }
            />
          </section>
        </div>
        <div>
          <Button
            onClick={() => atualizar()}
            type="submit"
            className="submit blue-primary"
          >
            Atualizar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Perfil;
