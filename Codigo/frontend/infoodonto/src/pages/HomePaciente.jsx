import styles from '../css/HomePaciente.module.css';
import Logo from '../img/logo.png';
import Perfil from '../components/componentsApp/perfil/perfil';
import MedicosVinculados from '../components/componentsApp/medicosVinculados/medicosVinculados';
import { useState, useEffect, useContext } from 'react';
import { getCondicao } from '../services/api';
import { LoginContext } from '../context/LoginContext';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { BsFillPersonFill } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { CircularProgress } from '@mui/material';

const HomePaciente = () => {
  const { user } = useContext(LoginContext);
  const [condicoesPaciente, setCondicoesPaciente] = useState(null);
  const [paginaSelecionada, setPaginaSelecionada] = useState(null);
  const [logado, setLogado] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCondicao();
      const condicoes = data.map(item => item);

      setCondicoesPaciente(condicoes);
      console.log(user)
      setPaginaSelecionada(
        <Perfil
          currentName={user.name}
          currentCpf={user.cpf}
          currentEmail={user.user.email}
          currentCondicao={user.condicoes}
          option={condicoesPaciente}
        />
      );

      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [IconeMenu, setIconeMenu] = useState(
    <BsFillPersonFill
      className={styles.icon}
      onClick={handleClick}
     
    />
  );

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={styles.topo}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Tooltip title='More'>{IconeMenu}</Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  backgroundColor: '#62A8DB',
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
              <MenuItem onClick={()=>{
                setIconeMenu(
                <BsFillPersonFill
                  className={styles.icon}
                  onClick={handleClick}
                 
                />)
                setPaginaSelecionada(
                  <Perfil
                    currentName={user.name}
                    currentCpf={user.cpf}
                    currentEmail={user.user.email}
                    currentCondicao={user.condicoes}
                    option={condicoesPaciente}
                  />
                )
              }}>
                <Avatar />
                Perfil
              </MenuItem>
              <MenuItem onClick={()=>{
                setIconeMenu(
                  <PersonAddIcon
                    className={styles.icon}
                    onClick={handleClick}
                   
                  />),
                setPaginaSelecionada(<MedicosVinculados pacienteLogado={user.cpf} solicitacoes={user.solicitacoes}/>)
              }}>
                <ListItemIcon>
                  <PersonAddIcon fontSize='small' />
                </ListItemIcon>
                Adicionar Conta
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <SettingsIcon fontSize='small' />
                </ListItemIcon>
                Configurações
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <LogoutIcon fontSize='small' />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>

            
          </div>
<div className={styles.divLogo}><img src={Logo} alt='Logo' className={styles.logo} /></div>
          <div className={styles.main}>
            <div className={styles.titulo}>
              <h2>Olá, {user.name}!</h2>
              <p>
                Bem-vindo à plataforma de acompanhamento de condições de saúde.
              </p>
            </div>

            <div className={styles.content}>{paginaSelecionada}</div>
          </div>


        </>
      )}
    </>
  );
};

export default HomePaciente;
