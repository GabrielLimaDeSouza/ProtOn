import styles from './dentistasVinculados.module.css'
import { useState, useEffect, forwardRef } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { getDentista, aceitarSolicitacao, recusarSolicitacao } from '../../../services/api'

const MedicosVinculados = ({ solicitacoes, pacienteLogado }) => {
  const [openAceito, setOpenAceito] = useState(false)
  const [openRecusado, setOpenRecusado] = useState(false)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const promises = solicitacoes.map(async (id) => {
        const response = await getDentista(id);
        return response.data;
      });

      const fetchedRows = await Promise.all(promises);
      setRows(fetchedRows);
    };

    fetchData();
  }, [solicitacoes]);
  console.log(rows)
  const messageRecusado = () => {
    setOpenRecusado(true)
  }
  const messageAdd = () => {
    setOpenAceito(true)
  }

  const recuseDentista = id => {
    recusarSolicitacao(pacienteLogado, id)
    let index = rows.indexOf(id)
    rows.splice(index, 1)
    messageRecusado()
  }

  const addDentista = id => {
    console.log(pacienteLogado)
    aceitarSolicitacao(pacienteLogado, id)
    let index = rows.indexOf(id)
    rows.splice(index, 1)
    messageAdd()
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenRecusado(false)
  }

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={ 6 } ref={ ref } variant='filled' { ...props } />
  })

  return (
    <>
      <div className={ styles.divTable }>
        <h1 className={ styles.titulo }>Solicitações <br /> de acesso</h1>
        <div className={styles.divTableBottom}>
        <TableContainer component={ Paper } className={styles.table}>
          <Table
            className={ styles.table }
            sx={{ minWidth:650}}
            size='small'
            aria-label='a dense table'
            overflow = 'hiden'
          >
            <TableHead>
              <TableRow>
                <TableCell>Dentista</TableCell>
                <TableCell align='right'>Matrícula</TableCell>
                <TableCell align='right'>Email</TableCell>
                <TableCell align='right'>Instituição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows.map(row => (
                console.log(row),
                <TableRow
                  key={ row.dentista._id }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    { row.dentista.name}
                  </TableCell>
                  <TableCell align='right'>{ row.dentista.matricula }</TableCell>
                  <TableCell align='right'>{ row.dentista.user.email }</TableCell>
                  <TableCell align='right'>
                    { row.dentista.instituicao.name }
                  </TableCell>
                  <TableCell>
                    <button
                      className={ styles.buttonCrud }
                      onClick={ () => {
                        recuseDentista(row.dentista._id)
                      }}
                    >
                      <MdCancel className={ styles.iconNotConfirm } />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      className={ styles.buttonCrud }
                      onClick={ () => {
                        addDentista(row.dentista._id)
                      }}
                    >
                      <BsCheckCircleFill className={ styles.iconConfirm } />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        

        <Snackbar
          open={ openAceito }
          autoHideDuration={ 2000 }
          onClose={ handleClose }
        >
          <Alert
            onClose={ handleClose }
            severity='success'
            sx={{ width: '100%' }}
          >
            Dentista aceito com sucesso!
          </Alert>
        </Snackbar>
        <Snackbar
          open={ openRecusado }
          autoHideDuration={2000 }
          onClose={ handleClose }
        >
          <Alert
            onClose={ handleClose }
            severity='success'
            sx={{ width: '100%' }}
          >
            Dentista negado com sucesso!
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default MedicosVinculados
