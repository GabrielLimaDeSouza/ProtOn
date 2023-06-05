//* CSS
import styles from "./Tab.module.css";

//* React
import { useEffect, useRef, useState } from "react";

//* Components
import Button from "../buttons/Button";

const Tab = ({ tabs, children }) => {
  const [currentTab, setCurrentTab] = useState(children[0]);

  const tabsRef = useRef(null);

  useEffect(() => {
    tabsRef.current.children[0].classList.add("active");
  }, [tabsRef]);

  const teste = ({ target }) => {
    const id = parseInt(target.id);

    const currTab = children.find((_children) => _children.props?.index === id);
    setCurrentTab(currTab);

    const btns = [...tabsRef.current.children];
    btns.map((btn) => {
      btn.classList.remove("active");
    });

    target.classList.add("active");
  };

  return (
    <div className={styles.body}>
      <section className={styles.tabs} ref={tabsRef}>
        {tabs.map((_tab, index) => (
          <Button type="button" id={index} className="tabs" onClick={teste}>
            {_tab.nome}
          </Button>
        ))}
      </section>
      <section className={styles.content}>{currentTab}</section>
    </div>
  );
};

export default Tab;
