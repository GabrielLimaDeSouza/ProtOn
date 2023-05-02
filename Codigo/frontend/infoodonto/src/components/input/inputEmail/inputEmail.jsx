import styles from "./inputEmail.module.css";

const InputText = (props) => {
  let disabled = false;

  if (props.disabled == true) {
    disabled = true;
  }

  return (
    <div className={ styles.inputContainer }>
      <input
        placeholder={ props.placeholder }
        className={ styles.inputEmail }
        autocomplete="new-password"
        type="email"
        disabled={ disabled }
        id={ props.id }
        name={ props.name }
      ></input>
    </div>
  );
};

export default InputText;
