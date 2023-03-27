import { useState } from "react";
import "./input.css"


function Input(props) {

    const [placeholderText, setPlaceholderText] = useState(props.placeholder)
    const [tags, setTags] = useState([])
    const [sabor, setSabor] = useState("")

    function isText() {
        if (props.type == "text") {
            return true;
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
    function handleKeyDown(e) {
        let novaCondicao = document.getElementById("condicao").value
        setTags(tags => [...tags, { condicao: novaCondicao }])
        document.getElementById("condicao").value = ""

    }
    return (
        <>
            {

                isText() ?
                    <div className="input-container">
                        <input placeholder={placeholderText} className="input-field" type="text" onFocus={removeLabel} onBlur={setPlaceholder} ></input>
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
                                                <span className="text">{tag.condicao}</span>
                                                <span className="close" onClick={()=>{removeTag(index)}}>&times;</span>
                                            </div>
                                        )

                                    })
                                }
                                <input placeholder={placeholderText} className="input-field" type="text" onFocus={() => { removeLabel("condicao") }} onBlur={setPlaceholder} list="lista" id="condicao"></input>
                                <span className="input-highlight" ></span>
                                <datalist id="lista">
                                    <option value="" >faixa etária:</option>
                                    <option value="diabetes" onClick={() => { optionSelected(1) }}>diabetes</option>
                                    <option value="hipertensão" onSelect={() => { optionSelected(1) }}>hipertensão</option>
                                    <option value="alergia">alergia</option>
                                </datalist>

                            </div>
                            <button className="adicionar" type='button' onClick={handleKeyDown}>Adicionar</button>
                        </div>

                        :
                        ""

            }
        </>
    )
}


export default Input;