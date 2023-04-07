import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import FormPaciente from "./pages/FormPaciente";
import FormDentista from "./pages/FormDentista";
import FormInstituicao from "./pages/FormInstituicao"

export default function App() {


  return (
    
     <BrowserRouter>
      <Routes>
        
          <Route exact path="/formPaciente" element={<FormPaciente/>} />
          <Route exact path="/formDentista" element={<FormDentista/>} />
          <Route exact path="/formInstituicao" element={<FormInstituicao/>} />

      </Routes>
    </BrowserRouter>
    
  )
}