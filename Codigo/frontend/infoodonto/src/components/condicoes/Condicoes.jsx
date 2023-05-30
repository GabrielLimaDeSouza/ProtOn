//* CSS
import styles from "./Condicoes.module.css";

//* Components
import Datalist from "../datalists/Datalist";
import Button from "../buttons/Button";

//* React
import { useEffect, useState } from "react";

//*Icons
import { IoClose } from "react-icons/io5";

const Condicoes = ({ condicoes, onChange, options }) => {
  const [tags, setTags] = useState(condicoes || []);
  const [currentTag, setCurrentTag] = useState(null);

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  const handleAddTag = () => {
    if (!currentTag || currentTag === "") {
      return;
    }

    const tagExists = tags.find((tag) => tag.nome === currentTag);

    if (tagExists) {
      setCurrentTag("");
      return;
    }

    const newTag = options.find((option) => option.nome === currentTag);

    setTags([...tags, newTag]);
    setCurrentTag("");
  };
  const handleDeleteTag = (_id) => {
    setTags(tags.filter((tag) => tag._id !== _id));
  };

  const Tag = ({ tag }) => {
    return (
      <div className={styles.tag}>
        <span>{tag.nome}</span>
        <Button
          type="button"
          className="close"
          onClick={() => handleDeleteTag(tag._id)}
        >
          <IoClose size="15px" />
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.condicoes}>
      <div className={styles.datalist}>
        <Datalist list={options} onChange={setCurrentTag} clear={currentTag} />
        <Button
          type="button"
          className="add blue-primary"
          onClick={handleAddTag}
        >
          Adicionar
        </Button>
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default Condicoes;
