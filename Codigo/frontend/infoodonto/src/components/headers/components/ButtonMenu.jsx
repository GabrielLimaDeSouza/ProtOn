//* React
import { useState } from "react";

//* Material UI
import { Button, Menu } from "@mui/material";

const ButtonMenu = ({ className, text, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handOnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        className={className}
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handOnClick}
      >
        {text}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default ButtonMenu;
