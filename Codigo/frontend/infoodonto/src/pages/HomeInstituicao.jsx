import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

import styles from '../css/HomeInstituicao.module.css'
import Logo from '../img/logo.png'

export default function DenseTable() {
    const [dentistas, setDentistas] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/api/dentista/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(resp => resp.json())
          .then(data => setDentistas(data))
          .catch(err => console.error(err))
    }, [])

    const rows = [];

    dentistas.forEach(dentista => {
        rows.push(createData(dentista.name, dentista.matricula, dentista.email ))
      });
    
    function createData(name, email, matricula) {
        return { name, email, matricula };
    }

    return (
    <div>
        <div className={styles.logo}>
            <img src={Logo} alt="Logo" />
        </div>
        <div className={styles.divTitle}>
            <h1 className={styles.title}>Gerenciamento de Dentistas</h1>
        </div>
        <div className={styles.buttonCreate}>
            <Button variant="contained" href='/formDentista'>Adicionar dentista</Button>
        </div>
        <TableContainer component={Paper}>
            <Table className={styles.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Matrícula</TableCell>
                <TableCell align="right">Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.matricula}</TableCell>
                    <TableCell align="right"><button className={styles.buttonCrud}><EditIcon className={styles.icon}/></button></TableCell>
                    <TableCell align="right"><button className={styles.buttonCrud}><DeleteIcon className={styles.icon}/></button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </div>

    );
}