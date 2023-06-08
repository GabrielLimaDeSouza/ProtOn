//* CSS
import styles from "./Notification.module.css";

//* React
import { useRef, useEffect, useState } from "react";

//* Components
import Button from "../buttons/Button";

//* Icons
import { BsBell, BsBellFill } from "react-icons/bs";
import { FiCheck, FiTrash } from "react-icons/fi";

export const Notification = ({ notifs, onClickAccept, onClickReject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenNotfs = () => {
    setIsOpen(!isOpen);
  };

  const notifsRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, []);

  const handleClickOutSide = ({ target }) => {
    if (notifsRef.current && !notifsRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={notifsRef} className={styles.notifs}>
      <Button type="button" className="empty" onClick={handleOpenNotfs}>
        {isOpen ? (
          <BsBellFill color="#FFD600" size="1.3rem" />
        ) : (
          <BsBell color="#FFD600" size="1.3rem" />
        )}
        {!isOpen && notifs.length > 0 && (
          <span className={styles.numNotifs}>{notifs.length}</span>
        )}
      </Button>
      {isOpen && (
        <div className={styles.notification}>
          {notifs.length > 0 ? (
            notifs.map((notify, index) => (
              <div key={notify?.name + "-" + index} className={styles.body}>
                <div className={styles.infos}>
                  <div>
                    <h3 className={styles.name}>{notify?.name}</h3>
                    <span className={styles.matricula}>
                      {notify?.instituicao?.name} | {notify?.instituicao?.tipo}
                    </span>
                  </div>
                  <p className={styles.email}>{notify?.user?.email}</p>
                </div>

                <div className={styles.edit}>
                  <Button
                    type="button"
                    className="empty"
                    onClick={() => onClickAccept(notify)}
                  >
                    <FiCheck size="1.2rem" color="#04DB00" />
                  </Button>

                  <Button
                    type="button"
                    className="empty red"
                    onClick={() => onClickReject(notify)}
                  >
                    <FiTrash size="1.3rem" color="#E32929" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noNotifs}>
              <span>
                <em>Você não possui solicitações</em>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
