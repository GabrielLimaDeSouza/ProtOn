import React, { useState } from 'react'
import styles from '../../components/input/input.module.css'

const InputOptions= (props) => {

  const [valor,setValor] = useState("")

  function handleChange(e){
    setValor(e.target.value)
    props.onChange(e.target.value)
  }

  return (
    <>
    <div>
        <input className={styles.inputText} placeholder={props.name} value={valor} onChange={handleChange}  type="text" list="lista" id="option"></input>
        <span></span>
        <datalist id="lista">
            {props.content.map((value)=> 
                <option key={value} value={value}>{value}</option>
            )}
        </datalist>
    </div>
    </>
  )
}

export default InputOptions