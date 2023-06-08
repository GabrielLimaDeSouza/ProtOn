//* CSS
import "./Button.css";

const Button = ({ type, className, id, onClick, children }) => (
  <button
    key={Math.random() + id}
    type={type}
    className={className || null}
    id={id}
    onClick={onClick || null}
  >
    {children}
  </button>
);

export default Button;
