import React, { useState } from 'react'
import styles from "./input.module.css"

const InputOptions= (props) => {

  const [valor,setValor] = useState("")

  function handleChange(e){
    setValor(e.target.value)
    props.onChange(e.target.value)
  }

  return (
    <>
    <div className={styles.input-container}>
        <input placeholder={props.name} value={valor} onChange={handleChange} className={styles.input-field} type="text" list="lista" id="option"></input>
        <span className={styles.input-highlight}></span>
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