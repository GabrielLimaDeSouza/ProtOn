//* CSS
import "./Button.css";

const Button = ({ type, className, id, onClick, children }) => (
  <button
    type={type}
    className={className && className}
    id={id}
    onClick={onClick && onClick}
  >
    {children}
  </button>
);

export default Button;
