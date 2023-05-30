//* CSS
import styles from "./Input.module.css";

//* React
import { useEffect, useState } from "react";

const Input = ({
  type,
  name,
  id,
  className,
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

      <input
        type={type}
        id={id}
        className={className ? className : ""}
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
      />
      {children && <span className={styles.children}>{children}</span>}
    </div>
  );
};

export default Input;
