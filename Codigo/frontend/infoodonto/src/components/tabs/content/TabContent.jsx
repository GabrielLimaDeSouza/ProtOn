//* CSS
import styles from "./TabContent.module.css";

const TabContent = ({ children, index }) => {
  return <div id={`tab-${index}`}>{children}</div>;
};

export default TabContent;
