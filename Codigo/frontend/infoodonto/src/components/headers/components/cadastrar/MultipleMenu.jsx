//* CSS
import styles from "./MultipleMenu.module.css";

//* React
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//* Components
import Button from "../../../buttons/Button";

const MultipleMenu = ({ label, className, colorized }) => {
  const [isOpen, setIsOpen] = useState(false);
  const multipleMenu = useRef(null);

  const cadastrar = (
    <>
      <Link
        className={`${styles.button} ${colorized && styles.colorized}`}
        to="/paciente/cadastrar"
      >
        Sou Paciente
      </Link>
      <Link
        className={`${styles.button} ${colorized && styles.colorized}`}
        to="/instituicao/cadastrar"
      >
        Sou Instituicao
      </Link>
    </>
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, []);

  const handleClickOutSide = ({ target }) => {
    if (multipleMenu.current && !multipleMenu.current.contains(target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.body} ref={multipleMenu}>
      <Button
        type="button"
        className={`${className} ${colorized ? "blue" : "white"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </Button>
      {isOpen && (
        <div
          className={`${styles.menus} ${
            className.includes("home") && styles.home
          }`}
        >
          {cadastrar}
        </div>
      )}
    </div>
  );
};

export default MultipleMenu;
