//* CSS
import styles from "./TableDesktop.module.css";

//* React
import { Link } from "react-router-dom";

//* Components
import Button from "../../buttons/Button";

//* Icons
import { FiEdit, FiTrash } from "react-icons/fi";

const TableDesktop = ({ header, rows, edit, to, onClick }) => {
  const toRoute = (route, key, data) => {
    return route.replace(/:\w+/g, data[key]);
  };

  return (
    <table className={`${styles.table}`}>
      <thead className={styles.header}>
        <tr>
          {header.map((item) => (
            <td key={item}>{item}</td>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {rows.map((row, index) => (
          <tr className={styles.tr} key={index}>
            <td className={styles.name} key={row.name}>
              {row.name}
            </td>
            <td className={styles.email} key={row.user.email}>
              {row.user.email}
            </td>
            <td className={styles.matricula} key={row.matricula}>
              {row.matricula}
            </td>

            {edit && (
              <td key={row._id} className={styles.edit}>
                <div>
                  <Link
                    to={toRoute(to.route, to.key, row)}
                    className={styles.buttonCrud}
                  >
                    <FiEdit size="2rem" color="#676767" />
                  </Link>

                  <Button
                    className="empty red"
                    onClick={() => onClick(row._id)}
                  >
                    <FiTrash size="2rem" />
                  </Button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableDesktop;
