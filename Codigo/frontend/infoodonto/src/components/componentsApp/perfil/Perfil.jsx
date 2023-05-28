import Input from '../../input/Input'
import styles from './Perfil.module.css'
import { useState } from "react"
const Perfil = ({ currentName, currentEmail, currentCpf, currentCondicao, option, currentId, currentSenha }) => {




  function atualizar() {
    let novaCondicao = []
    let name = currentName
    let email = currentEmail
    let senha = currentSenha
    document.querySelectorAll('.MuiChip-filled').forEach((e) => {
      novaCondicao.push({ "_id": e.getAttribute("id") });
    });
    if (document.getElementById('updateName').value != null) {
      name = document.getElementById('updateName').value
    }
    if (document.getElementById('updateEmail').value != null) {
      email = document.getElementById('updateEmail').value
    }
    if (document.getElementById('updatePassword').value != null) {
      senha = document.getElementById('updatePassword').value
    }
    fetch(`http://localhost:3000/api/paciente?id=${currentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        senha: senha,
        condicoes: novaCondicao,
      }),
    })
      .then(() => {
        console.log('cadastrado com sucesso');
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
          <p className={styles.tituloInput}>Nome:</p>
          <Input type='text' placeholder={currentName} id='updateName' />
        </div>

        <div className={styles.divInput}>
        <p className={styles.tituloInput}>CPF:</p>
          <Input type='text' placeholder={currentCpf} disabled={true} id='updateCpf' />
        </div>
        <div className={styles.divInput}>
        <p className={styles.tituloInput}>Senha:</p>
          <Input type='password' placeholder={'Senha'} id='updatePassword' />
        </div>
        <div className={styles.divInput}>
        <p className={styles.tituloInput}>Confirmar senha:</p>
          <Input type='password' placeholder={'Confirmar senha'} id='confirmUpdatePassword' />
        </div>
        <div className={styles.divInput}>
        <p className={styles.tituloInput}>Email:</p>
          <Input
            type='text'
            placeholder={currentEmail}
            id='updateEmail'
          />
        </div>
        <div className={styles.divInput}>
        <p className={styles.tituloInput}>Condições:</p>
          <Input
            type='option'
            placeholder='Condição'
            id='updateCondicao'
            currentCondicao={currentCondicao}
            option={option} r
          />
        </div>
        <button onClick={() => { atualizar() }}
          className={styles.adicionar}
          type="button"
        >
          Atualizar
        </button>
      </div>
    </>
  )
}

export default Perfil
