import styles from "./inputOption.module.css"
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack'
import { useState } from "react"

const InputOption = (props) => {
  const [tags, setTags] = useState(props.currentCondicao || [])
  const [jaPossui, setJaPossui] = useState(tags != null)
  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  
  function verificaLista(params) {
    let boolean = false
    props.option.forEach(element => {
      if(element.nome == params){
        boolean = element
      }
    },
    );
    tags.forEach(element =>{
      if(element == params){
       
        boolean = false
      }
    })
    return boolean
  }


  function handleKeyDown() {
    
    let novaCondicao = document.getElementById(props.id).value
    
    let verificado = verificaLista(novaCondicao)
    if(novaCondicao != "" && verificado !=""){
      setTags([...tags, verificado])
      
    }
    document.getElementById(props.id).value = ""
  }
  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.tagContainer}>
          {jaPossui && tags.length > 0 ? (
            tags.map((tag, index) => {
              return (
                <div className={styles.tagGroup}  key={index}>
                  <Chip
                  className={styles.tag}
  label={tag.nome}
  id={tag._id}
  onDelete={()=>{ removeTag(index)}}
/>

                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>

        <input
          placeholder={props.placeholder}
          className={styles.inputOption}
          type="text"
          list="lista"
          id={props.id}
        ></input>
        <span className=""></span>
        <datalist id="lista">
          {props.option.map((text, key) => (
            <option key={key} value={text.nome} id={text._id}/>
          ))}
        </datalist>
      </div>
      <div className={styles.divButton}>
        <button
          className={styles.adicionar}
          type="button"
          onClick={handleKeyDown}
        >
          Adicionar
        </button>
      </div>
    </>
  )
}

export default InputOption