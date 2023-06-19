//* CSS
import styles from "./DentistasPermitidos.module.css";

//* React
import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";

//* API
import {
  removerPermissao,
  recusarSolicitacao,
  aceitarSolicitacao,
} from "../../../services/api";

//* Components
import Header from "../../../components/headers/Header";
import TableDesktop from "../../../components/tables/desktop/TableDesktop";
import MobileTable from "../../../components/tables/mobile/MobileTable";
import { Notification } from "../../../components/notifs/Notification";
import AlertComp from "../../../components/alerts/AlertComp";

//* Context
import { LoginContext } from "../../../context/LoginContext";

const DentistasPermitidos = () => {
  const mobileView = useMediaQuery({ maxWidth: 1100 });

  const [dentistas, setDentistas] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [header, setHeader] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(null);

  const { user, updateUser } = useContext(LoginContext);

  useEffect(() => {
    setDentistas(user.dentistas);
    setSolicitacoes(user.solicitacoes);
  }, []);

  useEffect(() => {
    setHeader(["Nome", "Email", "Instituicao", "Tipo", ""]);
  }, [dentistas]);

  const handleDelete = async (id) => {
    setIsLoadingDelete(true);

    try {
      const response = await removerPermissao(user.cpf, id);

      if (response.status === 201) {
        const { msg } = response.data;

        user.dentistas = dentistas.filter((_dentista) => _dentista._id !== id);
        updateUser(user);
        setDentistas(user.dentistas);

        setAlert({ severity: "success", msg });
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
    }

    setIsLoadingDelete(false);
  };

  const handleAccept = async (solicitacao) => {
    setIsLoadingDelete(true);

    try {
      const response = await aceitarSolicitacao(user.cpf, solicitacao._id);

      if (response.status === 201) {
        user.dentistas.push(solicitacao);
        user.solicitacoes = solicitacoes.filter(
          (_solicitacao) => _solicitacao._id !== solicitacao._id
        );
        updateUser(user);

        setDentistas(user.dentistas);
        setSolicitacoes(user.solicitacoes);
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
    }

    setIsLoadingDelete(false);
  };

  const handleReject = async (solicitacao) => {
    try {
      const response = await recusarSolicitacao(user.cpf, solicitacao._id);

      if (response.status === 201) {
        user.solicitacoes = solicitacoes.filter(
          (_solicitacao) => _solicitacao._id !== solicitacao._id
        );
        updateUser(user);

        setSolicitacoes(user.solicitacoes);
      }
    } catch (err) {
      const { error } = err.response.data;
      setAlert({ severity: "error", msg: error });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header colorized />
      </div>

      <div className={styles.body}>
        <section className="add-dentista">
          <div className={styles.content}>
            <div className={styles.divTitle}>
              <div className={styles.notifs}>
                <h1 className={styles.title}>Dentistas</h1>
                <Notification
                  notifs={solicitacoes}
                  onClickAccept={handleAccept}
                  onClickReject={handleReject}
                />
              </div>
              <p className={styles.descripton}>
                Gerencie aqui os dentistas que irão ter permissão para acessar
                seus dados
              </p>
            </div>
          </div>
        </section>

        <section className={styles.dentistaMenagement}>
          {alert && (
            <AlertComp
              severity={alert.severity}
              onClose={setAlert}
              timeToClose={4000}
            >
              {alert.msg}
            </AlertComp>
          )}

          <div className={styles.tableContainer}>
            {mobileView ? (
              <MobileTable
                rows={dentistas}
                onClick={handleDelete}
                loading={isLoadingDelete}
              />
            ) : (
              <TableDesktop
                header={header}
                rows={dentistas}
                onClick={handleDelete}
                loading={isLoadingDelete}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DentistasPermitidos;
