import React from 'react'
import './input.css'

const InputInstituicao = (props) => {

  return (
    <>
    <div className='input-container'>
        <input placeholder="Instituição" className="input-field" type="text" list="lista" id="instituicao"></input>
        <span className="input-highlight"></span>
        <datalist id="lista">
            {props.content.map((instituicao)=> 
                <option key={instituicao} value={instituicao}>{instituicao}</option>
            )}
        </datalist>
    </div>
    </>
  )
}

export default InputInstituicao