import React from 'react'

// CSS
import styles from '../css/HomePage.module.css'

// SVG's
import Tooth from '../assets/tooth.svg'
import Logo from '../img/logo_sem_background.svg'

// Icons
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiOutlineInstagram} from 'react-icons/ai'
import {GrFacebookOption} from 'react-icons/gr'
import {BiMenuAltLeft} from 'react-icons/bi'

const HomePage = () => {

    return (
    <>
        <div className={styles.body}>
            <div className={styles.header}>
                <img src={Tooth} alt="" />
                <HiMenuAlt4 className={styles.iconMenu} />
            </div>
            <div className={styles.logo}>
                <img src={Logo} alt="ProtOn" />
            </div>
            <div className={styles.divContent}>
                <div className={styles.icons}> 
                    <AiOutlineInstagram className={styles.icon} />
                    <AiOutlineTwitter className={styles.icon} />
                    <GrFacebookOption className={styles.icon} />
                </div>
                <div className={styles.title}>
                    <h1 className={styles.whiteTitle}>O software para <span className={styles.markedTitle}>gestão de protocolos odontológicos</span></h1>
                </div>
                <div className={styles.divText}>
                    <p className={styles.text}>O ProtOn auxilia na dinâmica e praticidade das consultas dos dentistas ao oferecer protocolos odontológicos de atendimento de acordo com as condições do paciente</p>
                </div>
                <div className={styles.divButton}>
                    <button className={styles.button}>Cadastrar</button>
                    <p className={styles.pButton}>ou</p>
                    <button className={styles.button}>Login</button>
                </div>
            </div>
        </div>
        <div className={styles.divScroll }>
            <div className={styles.scrollTitle}>
                <h2>Seus protocolos na <span className={styles.scrollTitleSpan}>palma da sua mão</span></h2>
            </div>
            <div className={styles.divInformations}>
                <h3>+200</h3>
                <p>Clínicas utilizam o ProtOn</p>
                <h3>+10</h3>
                <p>Universidades cadastradas em todo o Brasil</p>
                <h3>+350</h3>
                <p>Dentistas se beneficiam da plataforma</p>
            </div>
            <div className={styles.divAboutUs}>
                <div className={styles.divAboutUsTitle}>
                    <BiMenuAltLeft className={styles.aboutUsIcon}/>
                    <h3>Sobre nós</h3>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    </>
  )
}

export default HomePage