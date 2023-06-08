//* CSS
import "./Button.css";

//* React
import { forwardRef } from "react";

//* Material UI
import { CircularProgress } from "@mui/material";

const Button = forwardRef(
  ({ type, className, id, onClick, loading, children }, ref) => (
    <button
      key={Math.random() + id}
      ref={ref}
      type={loading ? "button" : type}
      className={`${loading && "loading"} ${className || null}`}
      id={id}
      onClick={onClick || null}
    >
      {loading && (
        <span className="isLoading">
          <CircularProgress size="1rem" />
        </span>
      )}
      <span className="label">{children}</span>
    </button>
  )
);

export default Button;
