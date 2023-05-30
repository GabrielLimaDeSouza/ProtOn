//* CSS
import styles from "./Select.module.css";

//* React
import { useEffect, useState, useRef } from "react";

//* Icons
import { BsChevronUp } from "react-icons/bs";

const Select = ({
  id,
  name,
  className,
  onChange,
  options,
  initialValue,
  label,
  required,
}) => {
  const [value, setValue] = useState("");
  const [optionsValues, setOptionsValues] = useState();

  const arrow = useRef(null);

  const handleChange = ({ target }) => {
    handleOnBlur();
    setValue(target.value);
    onChange && onChange(target.value);
  };

  const optionIsAnObject = () => {
    return options.some((optionElement) => {
      return typeof optionElement == "object";
    });
  };

  useEffect(() => {
    setOptionsValues(
      optionIsAnObject()
        ? options.map((optionElement) => (
            <option key={optionElement._id} value={optionElement._id}>
              {optionElement.nome}
            </option>
          ))
        : options.map((optionElement) => (
            <option key={optionElement} value={optionElement}>
              {optionElement}
            </option>
          ))
    );

    setValue(initialValue);
  }, [options, initialValue]);

  const handleOnBlur = () => {
    arrow.current.classList.remove(styles.open);
  };
  const handleOnClick = () => {
    arrow.current.classList.toggle(styles.open);
  };

  return (
    <div className={styles.selectComponent}>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        className={className && styles[className]}
        onChange={handleChange}
        value={value}
        name={name}
        key={value}
        required={required && required}
        onClick={handleOnClick}
        onBlur={handleOnBlur}
      >
        <option value="0">Selecione uma opção</option>
        {optionsValues}
      </select>
      <span ref={arrow} className={styles.arrow}>
        <BsChevronUp />
      </span>
    </div>
  );
};

export default Select;
