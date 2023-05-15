import styles from "../css/HomePaciente.module.css"
import Logo from "../img/logo.png"
import Perfil from "../components/componentsApp/perfil/perfil"
import MedicosVinculados from "../components/componentsApp/medicosVinculados/medicosVinculados"
import { useState, useEffect, useContext } from "react";
import * as React from 'react';
import { getCondicao, getUser } from '../services/api';
import { LoginContext } from "../context/LoginContext"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { BsFillPersonFill } from "react-icons/bs";
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const HomePaciente = () => {

    const { user } = useContext(LoginContext)
    const [condicoesPaciente, setCondicoesPaciente] = useState();
    const [paginaSelecionada, setPaginaSelecionada] = useState()
    const [logado, setLogado] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getCondicao();
            const condicoes = data.map((item) => item.nome);
            setCondicoesPaciente(condicoes);
            setPaginaSelecionada(<Perfil currentName={user.name} currentCpf={user.cpf} currentEmail={user.user.email} currentCondicao={user.condicoes} option={condicoesPaciente} />)
            console.log(user)
        };
        fetchData();
    }, [user]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };











    


    const [IconeMenu, setIconeMenu] = useState(

        <BsFillPersonFill className={styles.icon}
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >
            <BsFillPersonFill sx={{ width: 32, height: 32 }}></BsFillPersonFill>
        </BsFillPersonFill>
    )
    return (
        <>

            <div className={styles.topo}>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="More">
                        {IconeMenu}
                    </Tooltip>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}

                    PaperProps={{
                        elevation: 0,
                        sx: {
                            backgroundColor: "#62A8DB",
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: '#62A8DB',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => {
                        setPaginaSelecionada(<Perfil currentName={user.name} currentCpf={user.cpf} currentEmail={user.user.email} currentCondicao={user.condicoes} option={condicoesPaciente} />)
                        setIconeMenu(<Avatar className={styles.icon}
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                        </Avatar>)
                        console.log(condicoesPaciente)
                        setAnchorEl(null);
                    }}>
                        <Avatar /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { setPaginaSelecionada(<MedicosVinculados />)
                    setIconeMenu(<PersonAdd className={styles.icon}
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <PersonAdd sx={{ width: 32, height: 32 }}></PersonAdd>
                    </PersonAdd>)
                    setAnchorEl(null);
                
                }}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose() }}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose() }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>




            <div className={styles.container}>
                <div className={styles.top}>
                    <img src={Logo} alt="" srcset="" className={styles.logo} />
                </div>
                <div className={styles.center}>

                    {
                        paginaSelecionada
                    }


                </div>
            </div>


        </>
    )
}

export default HomePaciente