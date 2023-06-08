//* React
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//* Components
import { LoginContext, LoginProvider } from "./context/LoginContext";
import Loading from "./components/loadings/Loading";

//* Pages User
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import FormPaciente from "./pages/paciente/FormPaciente";
import FormDentista from "./pages/dentista/FormDentista";
import FormInstituicao from "./pages/instituicao/FormInstituicao";
import SearchPaciente from "./pages/dentista/SearchPaciente";
import GerenciarDentistas from "./pages/instituicao/GerenciarDentistas";
import EditDentista from "./pages/dentista/EditDentista";
import PerfilPaciente from "./pages/paciente/perfil/PerfilPaciente";
import PerfilInstituicao from "./pages/instituicao/perfil/PerfilInstituicao";
import DentistasPermitidos from "./pages/paciente/permissoes/DentistasPermitidos";

const AppRoutes = () => {
  const Perfil = () => {
    const { user, loading } = useContext(LoginContext);

    if (loading) {
      return <Loading fullscreen />;
    }

    switch (user.user.type) {
      case "paciente":
        return <PerfilPaciente />;

      case "instituicao":
        return <PerfilInstituicao />;

      default:
        return <Navigate to="/" />;
    }
  };
  // eslint-disable-next-line react/prop-types
  const Private = ({ permission, children }) => {
    const { user, authenticated, loading } = useContext(LoginContext);
    if (loading) {
      return <Loading fullscreen />;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    if (!permission.includes(user.user.type)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  // eslint-disable-next-line react/prop-types
  const NotLoggedUser = ({ children }) => {
    const { user, loading } = useContext(LoginContext);

    if (loading) {
      return <Loading fullscreen />;
    }

    if (user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route
            exact
            path="/dentista/buscar-paciente"
            element={
              <Private permission="dentista">
                <SearchPaciente />
              </Private>
            }
          />

          <Route
            exact
            path="/perfil"
            element={
              <Private permission="paciente instituicao">
                <Perfil />
              </Private>
            }
          />

          <Route
            exact
            path="/perfil/permissoes"
            element={
              <Private permission="paciente">
                <DentistasPermitidos />
              </Private>
            }
          />

          <Route
            exact
            path="/perfil/dentistas/cadastrar"
            element={
              <Private permission="instituicao">
                <FormDentista />
              </Private>
            }
          />

          <Route
            exact
            path="/perfil/dentistas"
            element={
              <Private permission="instituicao">
                <GerenciarDentistas />
              </Private>
            }
          />

          <Route
            exact
            path="/perfil/dentistas/:id/editar"
            element={
              <Private permission="instituicao">
                <EditDentista />
              </Private>
            }
          />

          <Route
            exact
            path="/login"
            element={
              <NotLoggedUser>
                <Login />
              </NotLoggedUser>
            }
          />

          <Route
            exact
            path="/paciente/cadastrar"
            element={
              <NotLoggedUser>
                <FormPaciente />
              </NotLoggedUser>
            }
          />
          <Route
            exact
            path="/instituicao/cadastrar"
            element={
              <NotLoggedUser>
                <FormInstituicao />
              </NotLoggedUser>
            }
          />

          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </LoginProvider>
    </Router>
  );
};

export default AppRoutes;
