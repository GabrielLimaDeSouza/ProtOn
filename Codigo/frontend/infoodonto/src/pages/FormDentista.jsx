//import "../../../css/FormDentista.css"
import Logo from "../img/logo.png"

import "../components/input/input.css"

import Input from "../components/input/Input"
import InputInstituicao from "../components/input/InputInstituicao"

const FormDentista = () => {

    function createDentista(input){
        input.preventDefault();

        fetch(`http://localhost:3000/api/dentista/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": document.getElementById("nome").value,
                "email": document.getElementById("email").value,
                "senha": document.getElementById("senha").value,
                "instituicao": {
                    "nome": "Hospital A",
                    "cnpj": "251512521521521"
                }
            })
          })
          .then(resp => resp.json())
          .then(alert("Dentista cadastrado!"))
          .catch(err => console.error(err))

    }

    const instituicoes = ['Hospital Belo Horizonte', 'Hospital Madre Tereza', 'Hospital da Baleia']

    return (

        <>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>


            <form className="form input-container" onSubmit={createDentista}>
                <div className="uni"><input placeholder="Nome" className="input-field" id="nome"/></div> 
                <div className="uni"><input placeholder="Email" className="input-field" id="email"/></div>
                <div className="uni"><input placeholder="Senha" className="input-field" id="senha"/></div>
                <div className="uni"><InputInstituicao content={instituicoes} placeholder="Instituição"/></div>
                <div className="uni"><input placeholder="Matrícula" className="input-field" id="matricula"/></div>
                <div className="divButton">
                    <button type="submit" className="confirmar">Confirmar</button>
                </div>
            </form>
        </>

    )
}
  
export default FormDentista; 