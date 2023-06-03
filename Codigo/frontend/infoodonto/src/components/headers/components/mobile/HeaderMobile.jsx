//* CSS
import styles from "./HeaderMobile.module.css";

//* React
import { useState, useRef, useEffect } from "react";

//* Components
import Headers from "../typeHeaders/Headers";
import Button from "../../../buttons/Button";

//* Icons
import { IoMenuOutline } from "react-icons/io5";

const HeaderMobile = ({ colorized, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuMobile = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, []);

  const handleClickOutSide = ({ target }) => {
    console.log(menuMobile.current);
    console.log(target);

    if (!menuMobile.current.contains(target)) {
      setIsOpen(false);
    }
  };

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={menuMobile} className={styles.body}>
      <Button
        type="button"
        className="empty"
        id="btn-menu-mobile"
        onClick={handleOpenMenu}
      >
        <IoMenuOutline color={colorized ? "#20A0FD" : "#fff"} size="1.5rem" />
      </Button>

      {isOpen && (
        <div className={styles.contentMenu}>
          <Headers user={user} colorized />
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;
