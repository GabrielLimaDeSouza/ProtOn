//* CSS
import styles from "./Tab.module.css";

//* React
import { useState } from "react";

//* Components
import Button from "../buttons/Button";

const handleCreateFalsesArray = (size) => {
  return Array.from({ length: size }, () => false);
};

const Tab = ({ tabs, children }) => {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(handleCreateFalsesArray(tabs.length));

  const showSelectedTab = () => {
    return children.find((_children) => _children.props?.index === selected);
  };

  const handleTabSelected = (index) => {
    let active = handleCreateFalsesArray(tabs.length);
    active[index] = true;

    setActive(active);
    setSelected(index);
  };

  return (
    <div className={styles.body}>
      <section className={styles.tabs}>
        {tabs.map((_tab, index) => (
          <Button
            type="button"
            id={_tab.nome}
            className={`tabs${active[index] ? " active" : ""}`}
            onClick={() => handleTabSelected(index)}
          >
            {_tab.nome}
          </Button>
        ))}
      </section>
      <section className={styles.content}>{showSelectedTab()}</section>
    </div>
  );
};

export default Tab;
