import styles from "./inputSearch.module.css"
import {AiOutlineSearch} from "react-icons/ai"

const InputSearch = (props) => {
    return (
        <>

        
        <div className={styles.container}>
  
  <input className={styles.btnTextTop} type="text" name="txtsearch" placeholder="Buscar" onKeyDown={props.onKeyDown} onKeyUp={props.onKeyUp} id={props.id}></input>
  <button className={styles.btnBuscarTop} type="submit"></button>
</div>
        
           
        </>
    )
}

export default InputSearch