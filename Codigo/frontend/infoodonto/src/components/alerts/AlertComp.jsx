//* React
import { useState, useEffect } from "react";

//* Material UI
import { Alert } from "@mui/material";

const AlertComp = ({ severity, timeToClose, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const close = setTimeout(() => {
      handleOnClose();
    }, timeToClose);

    return () => clearTimeout(close);
  }, []);

  const handleOnClose = () => {
    onClose(null);
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Alert severity={severity} onClose={handleOnClose}>
        {children}
      </Alert>
    )
  );
};

export default AlertComp;
