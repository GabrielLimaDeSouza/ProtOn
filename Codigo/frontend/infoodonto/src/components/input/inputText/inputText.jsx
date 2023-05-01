import styles from "./inputText.module.css"


const InputText = (props)=>{

    let disabled = false
        if(props.disabled == true){
            disabled = true
        }

    return(
        <div className={styles.inputContainer}>
                        <input placeholder={props.placeholder} className={styles.inputText} autocomplete="new-password" type="text" disabled={disabled} id={props.id} ></input>
                    </div>
    )
}

export default InputText