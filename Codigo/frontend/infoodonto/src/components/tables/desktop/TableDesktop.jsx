//* CSS
import styles from "./TableDesktop.module.css";

//* React
import { Link } from "react-router-dom";

//* Components
import Button from "../../buttons/Button";
import Loading from "../../loadings/Loading";

//* Icons
import { FiEdit, FiTrash } from "react-icons/fi";

const TableDesktop = ({ header, rows, to, onClick, loading, instituicao }) => {
  const toRoute = (route, key, data) => {
    return route.replace(/:\w+/g, data[key]);
  };

  return rows.length ? (
    loading ? (
      <Loading />
    ) : (
      <table className={`${styles.table}`}>
        <thead className={styles.header}>
          <tr>
            {header.map((item) => (
              <td key={item}>{item}</td>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {rows?.map((row, index) => (
            <tr className={styles.tr} key={index}>
              <td className={styles.name} key={row.name}>
                {row.name}
              </td>
              <td className={styles.email} key={row.user.email}>
                {row.user.email}
              </td>
              {instituicao ? (
                <td className={styles.matricula} key={row.matricula}>
                  {row.matricula}
                </td>
              ) : (
                <>
                  <td
                    className={styles.instituicao?.name}
                    key={row.instituicao?.name}
                  >
                    {row.instituicao?.name}
                  </td>
                  <td
                    className={styles.instituicao?.tipo}
                    key={row.instituicao?.tipo}
                  >
                    {row.instituicao?.tipo}
                  </td>
                </>
              )}
              <td key={row._id} className={styles.edit}>
                <div>
                  {instituicao && (
                    <Link
                      to={toRoute(to.route, to.key, row)}
                      className={styles.buttonCrud}
                    >
                      <FiEdit size="1.3rem" color="#676767" />
                    </Link>
                  )}

                  <Button
                    className="empty red"
                    onClick={() => onClick(row._id)}
                  >
                    <FiTrash size="1.3rem" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
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

export default TableDesktop;
