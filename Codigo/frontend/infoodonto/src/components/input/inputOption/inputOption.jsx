import styles from "./inputOption.module.css"
import { useState } from "react"

const InputOption =(props)=>{

    
    const [tags, setTags] = useState(props.currentCondicao)



    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))


    }

    function handleKeyDown() {
        let novaCondicao = document.getElementById(props.id).value
        setTags(tags => [...tags, { condicao: novaCondicao }])
        document.getElementById(props.id).value = ""


    }

    return(
       <>
        <div className={styles.inputContainer}>
            <div className={styles.tagContainer}>
            {
                tags.map((tag, index) => {
                    return (
                        
                            
                            <div className={styles.tagGroup}>
                            <span className={styles.tag}>{tag.condicao}</span>
                            <span className={styles.close} onClick={()=>{removeTag(index)}}>&times;</span>
                            </div>
                                
                        
                    )

                })
            }
            </div>
         
            
           
            
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
        
        </>
    )
}

export default InputOption