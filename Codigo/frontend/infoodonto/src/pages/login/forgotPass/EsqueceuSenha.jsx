//* React
import { useParams, useLocation } from "react-router-dom";

//* Pages
import EnviarEmail from "./components/sendEmail/EnviarEmail";
import VerificarCodigo from "./components/verifyCode/VerificarCodigo";
import ResetarSenha from "./components/resetPass/ResetarSenha";

const EsqueceuSenha = () => {
  const { page } = useParams();
  const location = useLocation();

  return page === "1" ? (
    <EnviarEmail />
  ) : page === "2" ? (
    <VerificarCodigo
      code={location.state?.code}
      email={location.state?.email}
    />
  ) : (
    page === "3" && <ResetarSenha email={location.state?.email} />
  );
};

export default EsqueceuSenha;
