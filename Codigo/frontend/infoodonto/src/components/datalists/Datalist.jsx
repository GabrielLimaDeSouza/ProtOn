//* CSS
import styles from "./Datalist.module.css";

//* Components
import Input from "../inputs/Input";

const Datalist = ({ list, onChange, clear }) => {
  return (
    <div className={styles.datalist}>
      <Input
        type="text"
        name="condicao"
        id="condicao"
        placeholder="Adicionar Condição"
        list="condicoes"
        onChange={onChange}
        initialValue={clear}
      />

      <datalist id="condicoes">
        {list.map((item, key) => (
          <option key={key} value={item.nome} id={item._id} />
        ))}
      </datalist>
    </div>
  );
};

export default Datalist;
