/* eslint-disable react/prop-types */
import styles from "./Select.module.css";

import { useEffect, useState } from "react";

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

  const handleChange = ({ target }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, initialValue]);

  return (
    <div className={styles.selectComponent}>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        className={className ? styles[className] : ""}
        onChange={handleChange}
        value={value}
        name={name}
        key={value}
        required={required && required}
      >
        <option value="0">Selecione uma opção</option>
        {optionsValues}
      </select>
    </div>
  );
};

export default Select;
