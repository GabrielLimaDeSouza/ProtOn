//* CSS
import styles from "./MultipleMenu.module.css";

//* React
import { useState, useEffect, useRef } from "react";

//* Components
import Button from "../../../buttons/Button";

const MultipleMenu = ({ label, className, colorized, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const multipleMenu = useRef(null);

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
          {children}
        </div>
      )}
    </div>
  );
};

export default MultipleMenu;
