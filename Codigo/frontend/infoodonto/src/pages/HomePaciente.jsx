import styles from "../css/HomePaciente.module.css"
import Logo from "../img/logo.png"
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