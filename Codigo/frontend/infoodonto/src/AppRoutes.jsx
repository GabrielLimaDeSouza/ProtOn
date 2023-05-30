import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { LoginContext, LoginProvider } from "./context/LoginContext";

//* Pages User
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import FormPaciente from "./pages/paciente/FormPaciente";
import FormDentista from "./pages/dentista/FormDentista";
import FormInstituicao from "./pages/instituicao/FormInstituicao";
import SearchPaciente from "./pages/dentista/SearchPaciente";
import HomeInstituicao from "./pages/instituicao/HomeInstituicao";
import EditDentista from "./pages/dentista/EditDentista";
import HomePaciente from "./pages/paciente/HomePaciente";

const AppRoutes = () => {
  const Perfil = () => {
    const { user, loading } = useContext(LoginContext);

    if (loading) {
      return <CircularProgress />;
    }

    switch (user.user.type) {
      case "paciente":
        return <HomePaciente />;

      case "instituicao":
        return <HomeInstituicao />;

      default:
        return <Navigate to="/" />;
    }
  };
  // eslint-disable-next-line react/prop-types
  const Private = ({ permission, children }) => {
    const { user, authenticated, loading } = useContext(LoginContext);
    if (loading) {
      return <CircularProgress />;
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
      return <CircularProgress />;
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
            path="/searchPaciente"
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
            path="/formDentista"
            element={
              <Private permission="instituicao">
                <FormDentista />
              </Private>
            }
          />

          <Route
            exact
            path="/editDentista/:id"
            element={
              <Private permission="instituicao">
                <EditDentista />
              </Private>
            }
          />

          <Route
            exact
            path="/formPaciente"
            element={
              <NotLoggedUser>
                <FormPaciente />
              </NotLoggedUser>
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
            path="/formInstituicao"
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
