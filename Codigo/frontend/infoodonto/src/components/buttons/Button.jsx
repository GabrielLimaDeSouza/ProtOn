//* CSS
import "./Button.css";

//* React
import { forwardRef } from "react";

const Button = forwardRef(({ type, className, id, onClick, children }, ref) => (
  <button
    key={Math.random() + id}
    ref={ref}
    type={type}
    className={className || null}
    id={id}
    onClick={onClick || null}
  >
    {children}
  </button>
));

export default Button;
