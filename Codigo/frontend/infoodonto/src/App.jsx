import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDentista from "./pages/FormDentista";


//Pages
import FormPaciente from "./pages/FormPaciente";

export default function App() {


  return (
    
     <BrowserRouter>
      <Routes>
        
          <Route exact path="/formPaciente" element={<FormPaciente/>} />
          <Route exact path="/formDentista" element={<FormDentista/>} />
      
      </Routes>
    </BrowserRouter>
    
  )
}