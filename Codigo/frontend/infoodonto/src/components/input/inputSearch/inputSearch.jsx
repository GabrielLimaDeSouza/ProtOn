import styles from "./inputSearch.module.css"
import {AiOutlineSearch} from "react-icons/ai"

const InputSearch = (props) => {




    return (
        <>
        <div className={styles.container}>
            <input className={styles.btnTextTop} type="number" name="txtsearch" placeholder="Buscar" onChange={props.onKeyDown} onKeyUp={props.onKeyUp} id={props.id} maxLength="11"></input>
            <button className={styles.btnBuscarTop} type="submit"></button>
        </div>

        </>
    )
}

export default InputSearch