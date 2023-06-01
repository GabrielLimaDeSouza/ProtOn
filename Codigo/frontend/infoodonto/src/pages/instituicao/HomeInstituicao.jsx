//* CSS
import styles from "../../css/HomeInstituicao.module.css";

//* React
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

//* Material UI
import { CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";

//* API
import { deleteDentista } from "../../services/api";

//* Components
import { LoginContext } from "../../context/LoginContext";
import Header from "../../components/headers/Header";
import Button from "../../components/buttons/Button";
import TableDesktop from "../../components/tables/desktop/TableDesktop";
import MobileTable from "../../components/tables/mobile/MobileTable";

const HomeInstituicao = () => {
  const mobileView = useMediaQuery({ maxWidth: 1100 });

  const [dentistas, setDentistas] = useState([]);
  const [header, setHeader] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const { user, updateUser } = useContext(LoginContext);

  useEffect(() => {
    setDentistas(user.dentistas);

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    setHeader(["Nome", "Email", "Matricula", ""]);
  }, [dentistas]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteDentista(id);

      if (response.status === 201) {
        const { msg } = response.data;

        user.dentistas = dentistas.filter((_dentista) => _dentista._id !== id);
        updateUser(user);

        setAlert({ severity: "success", msg });
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
    } finally {
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header colorized />
      </div>

      <div className={styles.body}>
        <section className="add-dentista">
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <h1 className={styles.title}>Criar nova conta</h1>
              <p className={styles.descripton}>
                Adicione dentistas para que eles possam buscar por protocolos
                odontologicos
              </p>
            </div>
          </div>
        </section>

        <section className={styles.dentistaMenagement}>
          {alert && (
            <Alert severity={alert.severity} onClose={() => setAlert(null)}>
              {alert.msg}
            </Alert>
          )}
          <div className={styles.btnAddDentista}>
            <Link to={"/instituicao/dentistas/cadastrar"}>
              <Button
                type="button"
                id="add-dentista"
                className="add blue-primary"
              >
                Adicionar dentista
              </Button>
            </Link>
          </div>

          <div className={styles.tableContainer}>
            {mobileView ? (
              <MobileTable
                rows={dentistas}
                to={{ route: `/instituicao/dentistas/:id/editar`, key: "_id" }}
                onClick={handleDelete}
                edit
              />
            ) : (
              <TableDesktop
                header={header}
                rows={dentistas}
                to={{ route: `/instituicao/dentistas/:id/editar`, key: "_id" }}
                onClick={handleDelete}
                edit
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeInstituicao;
