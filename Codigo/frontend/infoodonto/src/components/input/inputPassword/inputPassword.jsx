import styles from "./inputPassword.module.css"

const InputPassword=(props)=>{


    let disabled = false
        if(props.disabled == true){
            console.log("true")
            disabled = true
        }


    return(
        <div className={styles.inputContainer}>
                    <input placeholder={props.placeholder} className={styles.inputPassword} autoComplete="new-password" type="password" disabled={disabled} id={props.id}></input>
                </div>
    )
}

export default InputPassword