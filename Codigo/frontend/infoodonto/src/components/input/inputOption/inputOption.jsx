import styles from "./inputOption.module.css";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const InputOption = ({
  placeholder,
  id,
  option,
  onAddTag,
  currentCondicao,
}) => {
  const [tags, setTags] = useState(currentCondicao || []);
  const [jaPossui, setJaPossui] = useState(tags != null);

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function verificaLista(params) {
    let boolean = false;

    option.forEach((element) => {
      if (element.nome == params) {
        console.log("Primeiro true");
        boolean = true;
      }
    });

    tags.forEach((element) => {
      if (element.nome == params) {
        console.log("Segundo true");
        boolean = false;
      }
    });
    return boolean;
  }

  React.useEffect(() => {
    onAddTag(tags);
  }, [tags]);

  function handleKeyDown() {
    var novaCondicao = document.getElementById(id).value;
    if (novaCondicao != "" && verificaLista(novaCondicao)) {
      option.forEach((element) => {
        if (element.nome == novaCondicao) {
          novaCondicao = element;
        }
      });

      setTags([...tags, novaCondicao]);
    }
    document.getElementById(id).value = "";
  }
  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.tagContainer}>
          {jaPossui && tags.length > 0 ? (
            tags.map((tag, index) => {
              return (
                <div className={styles.tagGroup} key={index}>
                  <Chip
                    className={styles.tag}
                    label={tag.nome}
                    id={tag._id}
                    onDelete={() => {
                      removeTag(index);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>

        <input
          placeholder={placeholder}
          className={styles.inputOption}
          type="text"
          list="lista"
          id={id}
        />
        <span className=""></span>
        <datalist id="lista">
          {option.map((text, key) => (
            <option key={key} value={text.nome} id={text._id} />
          ))}
        </datalist>
      </div>
      <div className={styles.divButton}>
        <button
          className={styles.adicionar}
          type="button"
          onClick={handleKeyDown}
        >
          Adicionar
        </button>
      </div>
    </>
  );
};

export default InputOption;
