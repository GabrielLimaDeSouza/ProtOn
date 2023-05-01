import Input from "../../input/Input"
import styles from "./Perfil.module.css"

const Perfil = (props) => {


    function onKeyDown(){
        console.log("sd")
    }
    return (
        <>
        
            <div className={styles.divInputs}>
            <Input type="search" placeholder="Exemplo" id="idTeste" limiteChar={11} onKeyDown={onKeyDown}></Input>
            </div>

        </>
    )
}

export default Perfil