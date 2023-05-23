import Input from '../../input/Input'
import styles from './Perfil.module.css'

const Perfil = ({ currentName, currentEmail, currentCpf, currentCondicao }) => {
  return (
    <>
      <div className={ styles.divInputs }>
        <h1 className={ styles.titulo }>Perfil</h1>
        <div className={ styles.divInput }>
          <Input type='text' placeholder={ currentName } id='updateName' />
        </div>

        <div className={ styles.divInput }>
          <Input
            type='text'
            placeholder={ currentCpf }
            disabled={ true }
            id='updateCpf'
          />
        </div>
        <div className={ styles.divInput }>
          <Input type='password' placeholder={'Oculto'} id='updatePassword' />
        </div>
        <div className={ styles.divInput }>
          <Input
            type='text'
            placeholder={ currentEmail }
            id='updateEmail'
          />
        </div>
        <div className={ styles.divInput }>
          <Input
            type='option'
            placeholder='Condição'
            id='updateCondicao'
            currentCondicao={ currentCondicao }
            option={ props.option }
          />
        </div>
      </div>
    </>
  )
}

export default Perfil
