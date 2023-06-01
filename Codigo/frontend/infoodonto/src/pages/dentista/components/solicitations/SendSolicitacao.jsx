//* CSS
import styles from "./SendSolicitacao.module.css";

//* Components
import Button from "../../../../components/buttons/Button";

//* API
import { enviarSolicitacao } from "../../../../services/api";

//* Icons
import { BsPersonPlusFill } from "react-icons/bs";

const SendSolicitacao = ({ cpf, dentista, alert }) => {
  const handleSendSolicitation = async (cpf, id) => {
    try {
      const response = await enviarSolicitacao(cpf, id);

      if (response.status === 201) {
        alert({ severity: "success", msg: response.data.msg });
      }
    } catch (err) {
      const { data } = err.response;
      alert({ severity: "error", msg: data.error });
    } finally {
      setTimeout(() => {
        alert(null);
      }, 3000);
    }
  };

  return (
    <div className={styles.solicitacao}>
      <Button
        type="button"
        id="btn-enviar-solicitacao"
        onClick={() => handleSendSolicitation(cpf, dentista)}
        className={`${styles.solicitacao} empty`}
      >
        <BsPersonPlusFill color="#20A0FD" size="1.5rem" />
        <span>Enviar solicitação</span>
      </Button>
    </div>
  );
};

export default SendSolicitacao;
