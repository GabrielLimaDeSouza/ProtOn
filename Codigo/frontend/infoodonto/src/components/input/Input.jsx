import { useState } from "react";
import styles from "./input.module.css"

import InputText from "./inputText/inputText";
import InputPassword from "./inputPassword/inputPassword";
import InputSearch from "./inputSearch/inputSearch";
import InputOption from "./inputOption/inputOption";
import InputEmail from "./inputEmail/inputEmail";

function Input(props) {

    /* Exemplo de usos:
    Text: <Input type="text" placeholder="Exemplo" disabled={true} id="idTeste" name="teste"></Input>
    Password: <Input type="password" placeholder="Exemplo" id="idTeste" disabled={true}></Input>
    Quase finalizado Search: <Input type="search" placeholder="Exemplo" id="idTeste" limiteChar={11} onKeyDown={onKeyDown}></Input>
    Option: <Input type="option" placeholder="Exemplo" id="idTeste" currentCondicao={[{condicao: "nada"},{condicao: "nada2"}]}></Input>
    Option: <Input type="option" placeholder="Exemplo" id="idTeste" currentCondicao={[{condicao: "nada"},{condicao: "nada2"}]}></Input>
    Email: <Input type="email" placeholder="Exemplo" disabled={true} id="idTeste" name="teste"></Input>
    */
    

    function returnType() {
        switch(props.type){
            case 'text': return (<InputText placeholder={props.placeholder} disabled={props.disabled} id={props.id} name={ props.name } />);
            case 'password': return(<InputPassword disabled={props.disabled} placeholder={props.placeholder} id={props.id}/>);
            case 'search' : return(<InputSearch placeholder={props.placeholder} typeSearch={props.typeSearch} id={props.id} onKeyDown={props.onKeyDown} limiteChar={props.limiteChar}/>)
            case 'option' : return(<InputOption placeholder={props.placeholder} currentCondicao={props.currentCondicao} id={props.id}/>)
            case 'email' : return(<InputEmail placeholder={ props.placeholder } disabled={ props.disabled }  id={ props.id } name={ props.name } />)
        }
    }
    
    return <>{ returnType() }</>
}


export default Input;