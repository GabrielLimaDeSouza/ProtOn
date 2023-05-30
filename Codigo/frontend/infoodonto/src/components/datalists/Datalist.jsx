//* CSS
import styles from "./Datalist.module.css";

//* Components
import Input from "../inputs/Input";

const Datalist = ({ list, onChange, clear }) => {
  return (
    <div className={styles.datalist}>
      <Input
        type="text"
        name="condicoes"
        id="condicoes"
        placeholder="Adicionar Condição"
        list="condicoesDatalist"
        onChange={onChange}
        initialValue={clear}
      />

      <datalist id="condicoesDatalist">
        {list &&
          list.map((item, key) => (
            <option key={key} value={item.nome} id={item._id} />
          ))}
      </datalist>
    </div>
  );
};

export default Datalist;
