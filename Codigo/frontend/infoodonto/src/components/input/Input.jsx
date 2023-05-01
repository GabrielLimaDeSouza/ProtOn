import { useState } from "react";
import styles from "./input.module.css"


function Input(props) {
const [tags, setTags] = useState([])
    const [placeholderText, setPlaceholderText] = useState(props.placeholder)    

        
    


    function isText() {
        if (props.type == "text") {
            return true;
        }
    }
    function isPassword(){
        if(props.type == "password"){
            return true;
        }
    }
    function notEmpyt(){
        if(props.option != null){
            return true
        }
    }
    function isOptions() {
        if (props.type == "options") {
            return true;
        }
    }
    function isSearch(){
    if(props.type == "search"){
        return true
    }
    }

    function removeLabel() {
        setPlaceholderText(" ")
    }
    function setPlaceholder() {
        setPlaceholderText(props.placeholder)
    }
    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))


    }
    function handleKeyDown() {
        let novaCondicao = document.getElementById("condicao").value
        setTags(tags => [...tags, { condicao: novaCondicao }])
        document.getElementById("condicao").value = ""


    }
    return (
        [
            <>
            {
                isPassword() ?
                <div className={styles.inputContainer}>
                    <input placeholder={placeholderText} className={styles.inputText} autocomplete="new-password" type="password" id={props.id}></input>
                </div>
                :
                isText() ?
                    <div className={styles.inputContainer}>
                        <input placeholder={placeholderText} className={styles.inputText} autocomplete="new-password" type="text" id={props.id}></input>
                    </div>
                    :
                    isOptions() ?
                        <div>
                            <div className={styles.inputContainer}>
                                {
                                    tags.map((tag, index) => {
                                        return (
                                            <div className={styles.tagItem} >
                                                <span className={[styles.text, styles.tag]}>{tag.condicao}</span>
                                                <span className={styles.close} onClick={()=>{removeTag(index)}}>&times;</span>
                                            </div>
                                        )

                                    })
                                }
                                <input placeholder={placeholderText} className={styles.inputText} type="text" list="lista" id="condicao"></input>
                            <span className={""} ></span>
                                <datalist id="lista">
                                    
                                   {notEmpyt() &&
                                   props.option.map((text, key)=>
                                    <option key={key} value={text} />
                                )
                                }
                                    
                                    
                                   
                                </datalist>

                            </div>
                            <button className={styles.adicionar} type='button' onClick={handleKeyDown}>Adicionar</button>
                        </div>

                        :
                        isSearch()?
                        
                        <div class={styles.searchbar}>
    <div class={styles.searchbarWrapper}>
        <div class={styles.searchbarLeft}>
            <div class={styles.searchIconWrapper}>
                <span class={[styles.searchIcon, styles.searchbarIcon]}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                        </path>
                    </svg>
                </span>
            </div>
        </div>

        <div class={styles.searchbarCenter}>
            <div class={styles.searchbarInputSpacer}></div>

            <input typeSearch={props.typeSearch} id={props.id} class={styles.searchbarInput} maxlength="2048" name="q" autocapitalize="off" autocomplete="false" title="Search" role="combobox" placeholder={props.placeholder} onKeyUp={props.event}></input>
        </div>

        <div class={styles.searchbarRight}>
           
        </div>
    </div>
</div>
                      
                        :""

            }
        </>
        ]

    )
}


export default Input;