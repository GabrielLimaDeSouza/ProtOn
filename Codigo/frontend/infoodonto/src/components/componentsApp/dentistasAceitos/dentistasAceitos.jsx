import styles from "./dentistasAceitos.module.css";
import { useState, useEffect, forwardRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

import { getDentista, removerPermissao } from "../../../services/api";
const DentistasAceitos = ({ aceitos, pacienteLogado }) => {
  const [openRecusado, setOpenRecusado] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const promises = aceitos.map(async (id) => {
        const response = await getDentista(id);
        return response.data;
      });

      const fetchedRows = await Promise.all(promises);
      setRows(fetchedRows);
    };

    fetchData();
  }, [aceitos]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRecusado(false);
  };
  const messageRecusado = () => {
    setOpenRecusado(true);
  };
  const recuseDentista = (id) => {
    removerPermissao(pacienteLogado, id);
    let index = rows.indexOf(id);
    rows.splice(index, 1);
    messageRecusado();
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <div className={styles.divTable}>
        <h1 className={styles.titulo}>
          Dentistas <br></br>aceitos
        </h1>
        <div className={styles.divTableBottom}>
          <TableContainer component={Paper} className={styles.table}>
            <Table
              className={styles.table}
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              overflow="hiden"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Dentista</TableCell>
                  <TableCell align="left">Matrícula</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Instituição</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.dentista._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.dentista.name}
                    </TableCell>
                    <TableCell align="left">{row.dentista.matricula}</TableCell>
                    <TableCell align="left">
                      {row.dentista.user.email}
                    </TableCell>
                    <TableCell align="left">
                      {row.dentista.instituicao.name}
                    </TableCell>
                    <TableCell>
                      <button
                        className={styles.buttonCrud}
                        onClick={() => {
                          recuseDentista(row.dentista._id);
                        }}
                      >
                        <MdCancel className={styles.iconNotConfirm} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Snackbar
          open={openRecusado}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Dentista negado com sucesso!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default DentistasAceitos;
