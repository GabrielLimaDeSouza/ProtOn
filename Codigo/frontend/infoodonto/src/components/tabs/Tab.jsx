//* CSS
import styles from "./Tab.module.css";

//* React
import { useEffect, useState } from "react";

//* Components
import Button from "../buttons/Button";

const Tab = ({ tabs, children }) => {
  const [currentTab, setCurrentTab] = useState(children[0]);
  const [indexButton, setIndexButton] = useState(0);

  const handleChangeTab = (index) => {
    const currTab = children.find(
      (_children) => _children.props?.index === index
    );
    setCurrentTab(currTab);
    setIndexButton(index);
  };

  return (
    <div className={styles.body}>
      <section className={styles.tabs}>
        {tabs.map((_tab, index) => (
          <Button
            key={_tab.nome + index}
            type="button"
            id={index}
            className={`tabs ${indexButton === index && "active"}`}
            onClick={() => handleChangeTab(index)}
          >
            {_tab.nome}
          </Button>
        ))}
      </section>
      <section className={styles.content}>{currentTab}</section>
    </div>
  );
};

export default Tab;
