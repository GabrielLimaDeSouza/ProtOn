import styles from "../css/HomePaciente.module.css"
import Logo from "../img/logo.png"
import Perfil from "../components/componentsApp/perfil/perfil"
import { FaUserAlt, FaUserMd, FaHistory} from "react-icons/fa"
import {BsFillGearFill} from "react-icons/bs"

const HomePaciente = () => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <img src={Logo} alt="" srcset="" className={styles.logo}/>
                </div>
                <div className={styles.center}>
                    <div className={styles.divCenter}>
                         <Perfil currentName="carlos" currentCpf="12345678999" currentPassword="123" currentEmail="teste@teste" currentCondicao={[{"condicao": "nada"}, {"condicao": "nada2"}]}/>
                    </div>
                
                </div>
                <div className={styles.bottom} >
                    
                    <FaUserAlt className={styles.navIconSelect}/>
                    <FaUserMd className={styles.navIcon}/>
                    <FaHistory className={styles.navIcon}/>
                    <BsFillGearFill className={styles.navIcon}/> 
                </div>
            </div>


        </>
    )
}

export default HomePaciente