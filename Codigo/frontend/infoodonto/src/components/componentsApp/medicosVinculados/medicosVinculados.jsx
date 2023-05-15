import styles from "./medicosVinculados.module.css"
import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const MedicosVinculados = ()=>{

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState([
        {"name" : "Paulo",
        "email" : "Paulo@test",
         "matricula": "00000",
         "instituicao": "Nenhuma"
        },
    ]);


    

    
    const messageRemove = () => {
        setOpen(true);
    };
function deleteDentista(id){
        let index = rows.indexOf(id);
        rows.splice(index, 1)
        messageRemove()

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      
    return (

        <>
        <div className={styles.divTable}>
        <TableContainer component={Paper}>
            <Table className={styles.table} sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Matrícula</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Instituição</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.matricula}</TableCell>
                    <TableCell align="right">{row.instituicao}</TableCell>
                    <TableCell align="right"><button className={styles.buttonCrud} onClick={() => {
                        deleteDentista(index)
                    }}><DeleteIcon className={styles.icon}/></button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Dentista removido com sucesso!
            </Alert>
        </Snackbar>
        </div>
         
        </>
       
        
    )
}

export default MedicosVinculados