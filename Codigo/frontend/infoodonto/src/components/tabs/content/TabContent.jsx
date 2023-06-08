const TabContent = ({ children, index }) => {
  return (
    <div key={Math.random() * 100 + "-" + index} id={`tab-${index}`}>
      {children}
    </div>
  );
};

export default TabContent;
