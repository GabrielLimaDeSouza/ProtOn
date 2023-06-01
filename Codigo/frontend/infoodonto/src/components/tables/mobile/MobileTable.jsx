//* CSS
import styles from "./MobileTable.module.css";

//* React
import { Link } from "react-router-dom";

//* Components
import Button from "../../buttons/Button";

//* Icons
import { FiEdit, FiTrash } from "react-icons/fi";

const MobileTable = ({ rows, edit, to, onClick }) => {
  const toRoute = (route, key, data) => {
    return route.replace(/:\w+/g, data[key]);
  };

  return (
    <section className={styles.content}>
      {rows.map((row) => (
        <div className={styles.body}>
          <div className={styles.infos}>
            <div>
              <h3 className={styles.name}>{row.name}</h3>
              <span className={styles.matricula}>{row.matricula}</span>
            </div>
            <p className={styles.email}>{row.user.email}</p>
          </div>

          {edit && (
            <div className={styles.edit}>
              <Link
                to={toRoute(to.route, to.key, row)}
                className={styles.buttonCrud}
              >
                <FiEdit size="1.2rem" color="#676767" />
              </Link>

              <Button className="empty red" onClick={() => onClick(row._id)}>
                <FiTrash size="1.3rem" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default MobileTable;
