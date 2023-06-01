//* CSS
import styles from "./Input.module.css";

//* React
import { useEffect, useState } from "react";

//* Icons
import { BsSearch } from "react-icons/bs";

const Input = ({
  type,
  name,
  id,
  initialValue,
  onChange,
  placeholder,
  required,
  disabled,
  label,
  list,
  children,
  maxLength,
  minLength,
  pattern,
  title,
  min,
  max,
}) => {
  const [value, setValue] = useState("");

  const handleChange = ({ target }) => {
    setValue(target.value);
    onChange && onChange(target.value);
  };

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  return (
    <div className={styles.inputComponent}>
      {label && <label htmlFor={id}>{label}</label>}

      {type === "search" && (
        <span className={styles.search}>
          <BsSearch color="#20A0FD" />
        </span>
      )}

      <input
        type={type}
        id={id}
        className={type === "search" ? styles.search : ""}
        onChange={handleChange}
        value={value}
        name={name}
        placeholder={placeholder && placeholder}
        required={required && required}
        disabled={disabled && disabled}
        list={list && list}
        maxLength={maxLength && maxLength}
        minLength={minLength && minLength}
        pattern={pattern && pattern}
        title={title && title}
        max={max && max}
        min={min && min}
      />
      {children && <span className={styles.children}>{children}</span>}
    </div>
  );
};

export default Input;
