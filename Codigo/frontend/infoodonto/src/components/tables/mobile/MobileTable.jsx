//* CSS
import styles from "./MobileTable.module.css";

//* React
import { Link } from "react-router-dom";

//* Components
import Button from "../../buttons/Button";

//* Icons
import { FiEdit, FiTrash } from "react-icons/fi";

const MobileTable = ({ rows, instituicao, to, onClick }) => {
  const toRoute = (route, key, data) => {
    return route.replace(/:\w+/g, data[key]);
  };

  return rows.length ? (
    <section className={styles.content}>
      {rows?.map((row) => (
        <div className={styles.body}>
          <div className={styles.infos}>
            <div>
              <h3 className={styles.name}>{row.name}</h3>
              {instituicao ? (
                <span className={styles.matricula}>{row.matricula}</span>
              ) : (
                <span className={styles.matricula}>
                  {row.instituicao.name} | {row.instituicao.tipo}
                </span>
              )}
            </div>
            <p className={styles.email}>{row.user.email}</p>
          </div>

          <div className={styles.edit}>
            {instituicao && (
              <Link
                to={toRoute(to.route, to.key, row)}
                className={styles.buttonCrud}
              >
                <FiEdit size="1.2rem" color="#676767" />
              </Link>
            )}

            <Button className="empty red" onClick={() => onClick(row._id)}>
              <FiTrash size="1.3rem" />
            </Button>
          </div>
        </div>
      ))}
    </section>
  ) : (
    <div className={styles.noData}>
      <em>
        {instituicao
          ? "Você não possui dentistas cadastrados"
          : "Os dentistas com permissão para acessar seus dados aparecerão aqui"}
      </em>
    </div>
  );
};

export default MobileTable;
