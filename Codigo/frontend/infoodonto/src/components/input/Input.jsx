import { useState } from "react";
import "./input.css"


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
    function handleKeyDown(variavel) {
        let novaCondicao = document.getElementById("condicao").value
        setTags(tags => [...tags, { condicao: novaCondicao }])
        document.getElementById("condicao").value = ""


    }
    return (
        [
            <>
            {
                isPassword() ?
                <div className="input-container">
                    <input placeholder={placeholderText} className="input-field" type="password" onFocus={removeLabel} onBlur={setPlaceholder} id={props.id}></input>
                    <label htmlFor="input-field" className="input-label" >{props.placeholder}</label>
                <span className="input-highlight"></span>
                </div>
                :
                isText() ?
                    <div className="input-container">
                        <input placeholder={placeholderText} className="input-field" type="text" onFocus={removeLabel} onBlur={setPlaceholder} id={props.id}></input>
                        <label htmlFor="input-field" className="input-label" >{props.placeholder}</label>
                        <span className="input-highlight"></span>
                    </div>
                    :
                    isOptions() ?
                        <div>
                            <div className="input-container">
                                {
                                    tags.map((tag, index) => {
                                        return (
                                            <div className="tag-item" >
                                                <span className="text tag" >{tag.condicao}</span>
                                                <span className="close" onClick={()=>{removeTag(index)}}>&times;</span>
                                            </div>
                                        )

                                    })
                                }
                                <input placeholder={placeholderText} className="input-field" type="text" onFocus={() => { removeLabel("condicao") }} onBlur={setPlaceholder} list="lista" id="condicao"></input>
                                <span className="input-highlight" ></span>
                                <datalist id="lista">
                                    
                                   {notEmpyt() &&
                                   props.option.map((text, key)=>
                                    <option key={key} value={text} />
                                )
                                }
                                    
                                    
                                   
                                </datalist>

                            </div>
                            <button className="adicionar" type='button' onClick={handleKeyDown}>Adicionar</button>
                        </div>

                        :
                        isSearch()?
                        
                        <div class="searchbar">
    <div class="searchbar-wrapper">
        <div class="searchbar-left">
            <div class="search-icon-wrapper">
                <span class="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                        </path>
                    </svg>
                </span>
            </div>
        </div>

        <div class="searchbar-center">
            <div class="searchbar-input-spacer"></div>

            <input typeSearch={props.typeSearch} id={props.id} class="searchbar-input" maxlength="2048" name="q" autocapitalize="off" autocomplete="false" title="Search" role="combobox" placeholder={props.placeholder} onKeyUp={props.event}></input>
        </div>

        <div class="searchbar-right">
           
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