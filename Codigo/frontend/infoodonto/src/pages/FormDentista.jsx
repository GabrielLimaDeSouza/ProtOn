//import "../../../css/FormDentista.css"
import Logo from "../img/logo.png"

import Input from "../components/input/Input"
import InputInstituicao from "../components/input/InputInstituicao"

const FormDentista = () => {

    const instituicoes = ['Hospital Belo Horizonte', 'Hospital Madre Tereza', 'Hospital da Baleia']

    return (

        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <div className="form">
                <div className="uni"><Input type="text" placeholder="Nome"/></div>
                <div className="uni"><Input type="text" placeholder="Email"/></div>
                <div className="uni"><Input type="text" placeholder="Senha"/></div>
                <div className="uni"><InputInstituicao content={instituicoes} placeholder="Instituição"/></div>
                <div className="uni"><Input type="text" placeholder="Matrícula" /></div>
            </div>

            <div className="divButton">
                <button className="confirmar">Confirmar</button>
            </div>



        </>

    )
}
  
export default FormDentista; 