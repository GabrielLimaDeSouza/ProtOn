import "../../../css/FormPaciente.css"
import Logo from "../img/logo.png"

import Input from "../components/input/Input"
const FormPaciente = () => {
    return (

        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <div className="form">
                <div className="uni"><Input type="text" placeholder="Nome"/></div>
                <div className="uni"><Input type="text" placeholder="CPF"/></div>
                <div className="uni"><Input type="text" placeholder="Email"/></div>
                <div className="uni"><Input type="text" placeholder="Senha"/></div>
                <div className="uni"><Input type="options" placeholder="Condições"/></div>
            </div>

            <div className="divButton">
                <button className="confirmar">Confirmar</button>
            </div>



        </>

    )
}
  
export default FormPaciente; 