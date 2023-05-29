import styles from "./inputText.module.css";

const InputText = (props) => {
  let disabled = false;
  if (props.disabled == true) {
    disabled = true;
  }

  return (
    <div className={styles.inputContainer}>
      <input
        placeholder={props.placeholder}
        className={styles.inputText}
        autoComplete="new-password"
        type="text"
        disabled={disabled}
        id={props.id}
        name={props.name}
      ></input>
    </div>
  );
};

export default InputText;
