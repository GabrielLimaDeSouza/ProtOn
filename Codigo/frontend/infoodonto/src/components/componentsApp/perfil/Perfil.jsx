import { useContext, useState } from "react";
import Input from "../../inputs/Input";
import styles from "./Perfil.module.css";
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import InputOption from "../../input/inputOption/inputOption";

const Perfil = ({
  currentName,
  currentEmail,
  currentCpf,
  currentCondicao,
  option,
  currentId,
  currentSenha,
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

  return (
    <>
      <div className={styles.divInputs}>
        <h1 className={styles.titulo}>Perfil:</h1>

        <div className={styles.divInput}>
          <Input
            type="text"
            initialValue={currentName}
            id="updateName"
            label="Nome"
            onChange={(name) => setUserState({ ...userState, name })}
          />
        </div>

        <div className={styles.divInput}>
          <Input
            type="text"
            initialValue={currentCpf}
            id="updateCpf"
            label="CPF"
            disabled
          />
        </div>
        <div className={styles.divInput}>
          <Input
            type="text"
            initialValue={currentEmail}
            id="updateEmail"
            label="Email"
            onChange={(email) =>
              setUserState({ ...userState, user: { ...userState.user, email } })
            }
          />
        </div>
        <div className={styles.divInput}>
          <Input
            type="password"
            initialValue={currentSenha}
            placeholder="Senha"
            id="updatePassword"
            label="Senha"
            onChange={(senha) =>
              setUserState({ ...userState, user: { ...userState.user, senha } })
            }
          />
        </div>
        <div className={styles.divInput}>
          <Input
            type="password"
            placeholder="Confirmar senha"
            id="confirmUpdatePassword"
            label="Confirmar senha"
            onChange={(confimSenha) => setConfirmSenha(confimSenha)}
          />
        </div>
        <div className={styles.divInput}>
          <p className={styles.tituloInput}>Condições:</p>
          <InputOption
            placeholder="Condição"
            id="updateCondicao"
            currentCondicao={currentCondicao}
            option={option}
            onAddTag={(condicoes) =>
              setUserState({
                ...userState,
                condicoes,
              })
            }
          />
        </div>
        <button
          onClick={() => {
            atualizar();
          }}
          className={styles.adicionar}
          type="button"
        >
          Atualizar
        </button>
      </div>
    </>
  );
};

export default Perfil;
