import Logo from "../img/logo.png"
import Input from "../components/input/Input"
import "../css/SearchPaciente.css"

const SearchPaciente = ()=>{
    function isFind(){
        return false
    }
    return(

        <>
        <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
        <div className="search-box">
            <Input type="search"></Input>
        </div>

        <div className="loader-box">
            {
            isFind ? 
            <div class="loader">
  <div class="loader">
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
</div>


</div>
          :""
            
        }
      
        </div>
  </>
        
        
    )
}

export default SearchPaciente