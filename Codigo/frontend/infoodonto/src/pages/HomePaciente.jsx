import styles from "../css/HomePaciente.module.css"
import Logo from "../img/logo.png"
import Perfil from "../components/componentsApp/perfil/perfil"
import MedicosVinculados from "../components/componentsApp/medicosVinculados/medicosVinculados"
import { FaUserAlt, FaUserMd, FaHistory} from "react-icons/fa"
import {BsFillGearFill} from "react-icons/bs"
import { useState, useEffect } from "react";
const HomePaciente = () => {

    const [paginaSelecionada, setPaginaSelecionada] = useState(<Perfil currentName="carlos" currentCpf="12345678999" currentEmail="teste@teste" currentCondicao={[{"condicao": "nada"}, {"condicao": "nada2"}]}/>)

    function iconSelecionado(icon){
        console.log(icon)
        switch (icon) {
            case 0:
                setPaginaSelecionada(<Perfil currentName="carlos" currentCpf="12345678999" currentEmail="teste@teste" currentCondicao={[{"condicao": "nada"}, {"condicao": "nada2"}]}/>) ;
                break;
            case 1:
                setPaginaSelecionada(<MedicosVinculados/>), console.log("Set 1") ;
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
                    
                    <FaUserAlt id="icon" onClick={()=>{iconSelecionado(0)}} className={styles.navIcon}/>
                    <FaUserMd id="icon" onClick={()=>{iconSelecionado(1)}} className={styles.navIcon}/>
                    <FaHistory id="icon" className={styles.navIcon}/>
                    <BsFillGearFill id="icon" className={styles.navIcon}/> 
                </div>
            </div>


        </>
    )
}

export default HomePaciente