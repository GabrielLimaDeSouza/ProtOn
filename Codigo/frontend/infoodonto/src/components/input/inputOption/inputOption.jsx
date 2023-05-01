import styles from "./inputOption.module.css"
import { useState } from "react"

const InputOption =(props)=>{

    const [tags, setTags] = useState(props.currentCondicao)



    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))


    }

    function handleKeyDown() {
        let novaCondicao = document.getElementById("condicao").value
        setTags(tags => [...tags, { condicao: novaCondicao }])
        document.getElementById("condicao").value = ""


    }

    return(
        <div>
        <div className={styles.inputContainer}>
            {
                tags.map((tag, index) => {
                    return (
                        <div className={styles.tagItem} >
                            <span className={[ styles.tag]}>{tag.condicao}</span>
                            <span className={styles.close} onClick={()=>{removeTag(index)}}>&times;</span>
                        </div>
                    )

                })
            }
            <input placeholder={props.placeholder} className={styles.inputOption} type="text" list="lista" id={props.id}></input>
        <span className={""} ></span>
            <datalist id="lista">
                
               {props.condicao>0 &&
               props.option.map((text, key)=>
                <option key={key} value={text} />
            )
            }
                
                
               
            </datalist>

        </div>
        <div className={styles.divButton}><button className={styles.adicionar} type='button' onClick={handleKeyDown}>Adicionar</button></div>
        
    </div>
    )
}

export default InputOption