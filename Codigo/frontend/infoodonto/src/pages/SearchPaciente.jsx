import Logo from '../img/logo.png'
import Input from '../components/input/Input'
import styles from '../css/SearchPaciente.module.css'
import * as React from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { BsPersonFillAdd } from 'react-icons/bs'
import { useState, useEffect, useContext } from 'react'
import { enviarSolicitacao } from '../services/api'
import Chip from '@mui/material/Chip';
import { LoginContext } from '../context/LoginContext';
import Stack from '@mui/material/Stack';
const SearchPaciente = () => {
    const { user } = useContext(LoginContext);
    const [paciente, setPaciente] = useState({})
    const [pacienteExiste, setPacienteExiste] = useState()
    const [cpf, setCpf] = useState('')
    const [preAtendimento, setPreAtendimento] = useState([])
    const [anestesicoLocal, setAnestesicoLocal] = useState([])
    const [medicamentos, setMedicamentos] = useState([])
    const [implante, setImplante] = useState([])
    const [open1, setOpen1] = useState()
    const [open2, setOpen2] = useState()
    const [open3, setOpen3] = useState()
    const [open4, setOpen4] = useState()
    const [permitido, setPermitido] = useState(false)

    let testeString = ''
    const url = 'http://localhost:3000'
console.log(user)
    useEffect(() => {
        fetch(`${ url }/api/paciente/cpf/${ cpf }`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dentista: user._id
            })
        })
        .then(resp => {
            if(resp.status === 401) {
                return null
            }

            return resp.json()
        })
        .then(data => {
            setPacienteExiste(true)
            
            if(data) {
                if (data && !data.msg) {
                    setPaciente(data)
                    setPermitido(true)
                    setOpen1(true)
                } else {
                    setPacienteExiste(false)
                    setOpen2(true)
                }
            } else {
                setOpen4(true)
                setPermitido(false)
            }
        })
        .catch(err => {
            console.error(err)
        })
    }, [cpf])

    useEffect(() => {
        if (paciente != null && Object.keys(paciente).length !== 0) {
            setPacienteExiste(true)
            paciente.condicoes.map(condicao => {
                setPreAtendimento(
                    preAtendimento.concat(condicao.preAtendimento)
                )
                setAnestesicoLocal(
                    anestesicoLocal.concat(condicao.anestesicoLocal)
                )
                setMedicamentos(
                    medicamentos.concat(condicao.medicamentos)
                )
                setImplante(implante.concat(condicao.implante))
            })
        } else {
            setPacienteExiste(false)
        }
    }, [paciente])

    const campoCompleto = () => {
        let campo = document.getElementById('busca')
        setCpf(campo.value)
        campo.value = ''
    }

    const handleClose = () => {
        setOpen1(false)
        setOpen2(false)
        setOpen3(false)
        setOpen4(false)
    }

    const onKeyDown = e => {
        let campo = document.getElementById('busca')

        
            
        

        if (campo.value.length == 11) {
            campoCompleto()
        }
    }

    const solicitar = () => {
        enviarSolicitacao(cpf, user._id)
            .then(() => setOpen3(true))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={ styles.logo }>
                <img src={ Logo } alt='ProtOn' />
            </div>
            <div className={ styles.searchBox }>
                <Input
                    type='search'
                    placeholder='CPF: 00000000000'
                    typeSearch='number'
                    id='busca'
                    limiteChar='11'
                    onKeyDown={ onKeyDown }
                ></Input>
            </div>
            
            { open1 ? (
                <Snackbar open={ open1 } autoHideDuration={ 1200 } onClose={ handleClose }>
                    <Alert
                        onClose={ handleClose }
                        severity='success'
                        sx={{ width: '100%' }}
                    >
                        Paciente encontrado com sucesso!
                    </Alert>
                </Snackbar>
            ) : open2 ? (
                <Snackbar open={ open2 } autoHideDuration={ 2000 } onClose={ handleClose }>
                    <Alert onClose={ handleClose } severity='error' sx={{ width: '100%' }}>
                        Paciente não foi encontrado!
                    </Alert>
                </Snackbar>
            ) : open3 ? (
                <Snackbar open={ open3 } autoHideDuration={ 2000 } onClose={ handleClose }>
                    <Alert
                        onClose={ handleClose }
                        severity='success'
                        sx={{ width: '100%' }}
                    >
                        Solicitação enviada com sucesso!
                    </Alert>
                </Snackbar>
            ) : open4 ? (
                <Snackbar open={ open4 } autoHideDuration={ 2000 } onClose={ handleClose }>
                    <Alert
                        onClose={ handleClose }
                        severity='error'
                        sx={{ width: '100%' }}
                    >
                        Você não possui permissão
                    </Alert>
                </Snackbar>
            ) : '' }

            { pacienteExiste ? (
                permitido ? (
                    <>
                        <div className={styles.dadosPessoais}>
                <p className={styles.nomePaciente}>{paciente.name}</p>
                <p>Condições</p>
                <div >
                            
                            <div className={ styles.containerCondicoes }>
                                {paciente.condicoes.map(condicao => (
                                <Chip className={styles.chip} label={condicao.nome} />
                                ))}
                            </div>
                        </div>
            </div>
                        
                        <div className={ styles.drops }>
                            <div className={ styles.drop }>
                                
                                <Accordion>
                                <AccordionSummary
                                    expandIcon={ <ExpandMoreIcon /> }
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                    sx={{ background: 'white' }}
                                    className={ styles.drop }
                                >
                                    <Typography>Pré-atendimento</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    { preAtendimento.map(pre => (
                                        <>
                                            { ' ' }
                                            <p>{ pre }</p>
                                        </>
                                    ))}
                                    </Typography>
                                </AccordionDetails>
                                </Accordion>
                            </div>

                            <div className={ styles.drop }>
                                <Accordion>
                                <AccordionSummary
                                    expandIcon={ <ExpandMoreIcon /> }
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                    sx={{ background: 'white' }}
                                    className={ styles.drop }
                                >
                                    <Typography>Anestésico local</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    { anestesicoLocal.map(ane => (
                                        <>
                                            { ' ' }
                                            <p>{ ane }</p>
                                        </>
                                    ))}
                                    </Typography>
                                </AccordionDetails>
                                </Accordion>
                            </div>

                            <div className={ styles.drop }>
                                <Accordion>
                                <AccordionSummary
                                    expandIcon={ <ExpandMoreIcon /> }
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                    sx={{ background: 'white' }}
                                    className={ styles.drop }
                                >
                                    <Typography>Medicamentos</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    { medicamentos.map(med => (
                                        <>
                                            { ' ' }
                                            <p>{ med }</p>
                                        </>
                                    ))}
                                    </Typography>
                                </AccordionDetails>
                                </Accordion>
                            </div>

                            <div className={ styles.drop }>
                                { ' ' }
                                <Accordion>
                                <AccordionSummary
                                    expandIcon={ <ExpandMoreIcon /> }
                                    aria-controls='panel1a-content'
                                    id='panel1a-header'
                                    sx={{ background: 'white' }}
                                    className={ styles.drop }
                                >
                                    <Typography>Implante</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    { implante.map(imp => (
                                        <>
                                            { ' ' }
                                            <p>{ imp }</p>
                                        </>
                                    ))}
                                    </Typography>
                                </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={ styles.divInvite }>
                        <BsPersonFillAdd
                            className={ styles.iconAdd }
                            onClick={() => { solicitar() }}
                        />
                        
                        {' '}
                        Enviar solicitação para acessar os dados
                    </div>
                )
            ) : (
                <div className={ styles.loaderBox }>
                    <Typography variant='h3' width={'70%'}>
                        <Skeleton animation='wave' />
                    </Typography>

                    <Skeleton animation='wave' height={ '30px' } width={ '90%' } />
                    <Skeleton animation='wave' height={ '30px' } width={ '90%' } />
                    <Skeleton animation='wave' height={ '30px' } width={ '90%' } />
                    <Skeleton animation='wave' height={ '30px' } width={ '90%' } />
                </div>
            )}
        </>
    )
}

export default SearchPaciente
