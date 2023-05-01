import styles from "./inputSearch.module.css"
import {AiOutlineSearch} from "react-icons/ai"

const InputSearch = (props) => {
    return (
        <>

        <div>
        <div className={styles.container}>
  
  <input className={styles.btnTextTop} type="number" name="txtsearch" placeholder="Buscar" onKeyDown={props.onKeyDown}></input>
  <div><button className={styles.btnBuscarTop} type="submit"></button></div>
</div>
        </div>
           
        </>
    )
}

export default InputSearch