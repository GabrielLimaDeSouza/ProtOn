import { useState } from "react";
import "./input.css"


function Input(props) {
const [tags, setTags] = useState([])
    const [placeholderText, setPlaceholderText] = useState(props.placeholder)
    var options
    
    const [sabor, setSabor] = useState("")

    const [nome, setNome] = useState("")


    function isText() {
        if (props.type == "text") {
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
                        ""

            }
        </>
        ]

    )
}


export default Input;