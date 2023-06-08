//* CSS
import styles from "./Result.module.css";

//* Components
import Tab from "../../../../components/tabs/Tab";
import TabContent from "../../../../components/tabs/content/TabContent";

const generateKey = (entrada, concat) => {
  return entrada.split(" ")[0] + "-" + concat;
};

const Result = ({ paciente }) => {
  const ProtocolsDesktop = ({ condicao }) => {
    return (
      <>
        <h3 className={styles.titleContent}>Protocolos para {condicao.nome}</h3>
        <section className={styles.protocols}>
          <div>
            <h4>Pre-atendimento</h4>
            <ul>
              {condicao.preAtendimento.map((text, index) => (
                <li key={generateKey(text, index)}>{text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Anestesico Local</h4>
            <ul>
              {condicao.anestesicoLocal.map((text, index) => (
                <li key={generateKey(text, index)}>{text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Medicamentos</h4>
            <ul>
              {condicao.medicamentos.map((text, index) => (
                <li key={generateKey(text, index)}>{text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Implante</h4>
            <ul>
              {condicao.implante.map((text, index) => (
                <li key={generateKey(text, index)}>{text}</li>
              ))}
            </ul>
          </div>
        </section>
      </>
    );
  };

  const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <section className={styles.result}>
      <div className={styles.user}>
        <h3 className={styles.name}>{paciente.name}</h3>
        <span className={styles.cpf}>{formatarCPF(paciente.cpf)}</span>
        <p className={styles.email}>{paciente.user.email}</p>
      </div>

      <div className={styles.protocols}>
        <h3 className={styles.condicoesTitle}>Condições</h3>
        {paciente.condicoes.length > 0 ? (
          <Tab tabs={paciente.condicoes}>
            {paciente.condicoes.map((condicao, index) => (
              <TabContent key={generateKey(condicao.nome, index)} index={index}>
                <ProtocolsDesktop condicao={condicao} />
              </TabContent>
            ))}
          </Tab>
        ) : (
          <div className={styles.noCondicoes}>
            <em>Este paciente não possui condições cadastradas</em>
          </div>
        )}
      </div>
    </section>
  );
};

export default Result;
