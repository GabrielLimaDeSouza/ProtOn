import Input from "../../input/Input"
import styles from "./Perfil.module.css"

const Perfil = (props) => {



    return (
        <>

            <div className={styles.divInputs}>
                <div className={styles.divInput}><Input type="text" placeholder={props.currentName} id="updateName"></Input></div>
                <div className={styles.divInput}>
                    <Input type="text" placeholder={props.currentCpf} disabled={true} id="updateCpf"></Input>
                </div>
                <div className={styles.divInput}>
                    <Input type="password" placeholder={props.currentPassword} id="updatePassword"></Input>
                </div>
                <div className={styles.divInput}><Input type="text" placeholder={props.currentEmail} id="updateEmail"></Input></div>
                <div className={styles.divInput}><Input type="option" placeholder="Condição" id="updateCondicao" currentCondicao={props.currentCondicao}> </Input></div>
            </div>

        </>
    )
}

export default Perfil