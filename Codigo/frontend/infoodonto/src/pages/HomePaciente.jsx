import styles from "../css/HomePaciente.module.css"
import Logo from "../img/logo.png"
import Perfil from "../components/componentsApp/perfil/perfil"
import MedicosVinculados from "../components/componentsApp/medicosVinculados/medicosVinculados"
import { FaUserAlt, FaUserMd, FaHistory} from "react-icons/fa"
import {BsFillGearFill} from "react-icons/bs"
import { useState, useEffect, useContext } from "react";
import { getCondicao, getUser } from '../services/api';
import { LoginContext } from "../context/LoginContext"
const HomePaciente = () => {

    const {user} = useContext(LoginContext)
    const [condicoesPaciente, setCondicoesPaciente] = useState([]);
    const [paginaSelecionada, setPaginaSelecionada] = useState()
    const [logado, setLogado] = useState()



console.log(user)




    useEffect(() => {
      const fetchData = async () => {
        const { data } = await getCondicao();
        const condicoes = data.map((item) => item.nome);
        setCondicoesPaciente(condicoes);
        setPaginaSelecionada(<Perfil currentName={user.name} currentCpf={user.cpf} currentEmail={user.user.email} currentCondicao={user.condicoes} option={condicoes}/>)
      };
      fetchData();
    }, [user]);
   

    

    function iconSelecionado(icon){
        console.log(icon)
        switch (icon) {
            case 0:
                setPaginaSelecionada(<Perfil currentName="carlos" currentCpf="12345678999" currentEmail="teste@teste" currentCondicao={["nada", "nada2"]} option={condicoesPaciente}/>) ;
                break;
            case 1:
                setPaginaSelecionada(<MedicosVinculados/>), console.log("Set 1") ;
                break;
            }
                let icones = document.querySelectorAll("[id='icon']")
           
           for(let i=0; i<=icones.length; i++){
            console.log(icones[i])
            if(i == icon){
                icones[i].classList.remove(styles.navIcon)
                icones[i].classList.add(styles.navIconSelect)
            }else{
                icones[i].classList.remove(styles.navIconSelect)
            icones[i].classList.add(styles.navIcon)
            }
           }
           
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <img src={Logo} alt="" srcset="" className={styles.logo}/>
                </div>
                <div className={styles.center}>
                    <div className={styles.divCenter}>
                         {
                            paginaSelecionada
                         }
                    </div>
                
                </div>
                <div className={styles.bottom} >
                    
                    <FaUserAlt id="icon" onClick={()=>{iconSelecionado(0)}} className={styles.navIconSelect}/>
                    <FaUserMd id="icon" onClick={()=>{iconSelecionado(1)}} className={styles.navIcon}/>
                    <FaHistory id="icon" className={styles.navIcon}/>
                    <BsFillGearFill id="icon" className={styles.navIcon}/> 
                </div>
            </div>


        </>
    )
}

export default HomePaciente