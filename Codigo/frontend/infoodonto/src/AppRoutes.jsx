import { useContext } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { LoginContext, LoginProvider } from './context/LoginContext'

//* Pages User
import Login from "./pages/Login"
import FormPaciente from "./pages/FormPaciente"
import FormDentista from "./pages/FormDentista"
import FormInstituicao from "./pages/FormInstituicao"
import SearchPaciente from "./pages/SearchPaciente"
import HomeInstituicao from "./pages/HomeInstituicao"
import EditDentista from "./pages/EditDentista"
import HomePaciente from "./pages/HomePaciente"

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(LoginContext)
   
    if(loading) {
      return <CircularProgress />
    }

    if(!authenticated) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <Router>
      <LoginProvider>
        <Routes>
            <Route exact path="/login" element={ <Login /> }></Route>
            <Route exact path="/formPaciente" element={ <FormPaciente /> }></Route>
            <Route exact path="/formDentista" element={ <FormDentista /> }></Route>
            <Route exact path="/formInstituicao" element={ <FormInstituicao /> }></Route>
            <Route exact path="/searchPaciente" element={ <SearchPaciente /> }></Route>
            <Route exact path="/homeInstituicao" element={ <Private><HomeInstituicao /></Private> }></Route>
            <Route exact path="/homePaciente" element={ <HomePaciente /> }></Route>
            <Route exact path="/editDentista/:id" element={ <Private><EditDentista /></Private> }></Route>
        </Routes>
      </LoginProvider>
    </Router>
  )
}

export default AppRoutes