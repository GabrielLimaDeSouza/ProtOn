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
    console.log(params)
    props.option.forEach(element => {
      if(element.nome == params){
        console.log("Primeiro true")
        boolean = true
      }
    },
    );
    console.log(boolean)
    console.log(tags)
    tags.forEach(element =>{
      console.log("Elemente: " + element + " Param: " + params)
      if(element.nome == params){
        console.log("Segundo true")
        boolean = false
      }
    })
    console.log(boolean)
    return boolean
    
  }


  function handleKeyDown() {
    
    var novaCondicao = document.getElementById(props.id).value
    if(novaCondicao != "" && verificaLista(novaCondicao)){
      props.option.forEach(element =>{
        if(element.nome == novaCondicao){
          novaCondicao = element
        }
      })
      console.log(novaCondicao.nome)
      setTags([...tags, novaCondicao])
      
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