import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoginProvider } from './context/LoginContext'

//* Rotas
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//* Pages User
import FormPaciente from "./pages/FormPaciente"
import FormDentista from "./pages/FormDentista"
import FormInstituicao from "./pages/FormInstituicao"
import SearchPaciente from "./pages/SearchPaciente"
import HomeInstituicao from "./pages/HomeInstituicao"
import EditDentista from "./pages/EditDentista"
import HomePaciente from "./pages/HomePaciente"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/formPaciente", element: <FormPaciente /> },
      { path: "/formDentista", element: <FormDentista /> },
      { path: "/formInstituicao", element: <FormInstituicao /> },
      { path: "/searchPaciente", element: <SearchPaciente /> },
      { path: "/homeInstituicao", element: <HomeInstituicao /> },
      { path: "/homePaciente", element: <HomePaciente /> },
      { path: "/editDentista/:id", element: <EditDentista /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={ router } />
    </LoginProvider>
  </React.StrictMode>,
)
