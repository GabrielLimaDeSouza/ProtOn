import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//Pages
import FormPaciente from "./assets/pages/FormPaciente";

export default function App() {


  return (
    
     <BrowserRouter>
      <Routes>
        
          <Route exact path="/formPaciente" element={<FormPaciente/>} />
          
      
      </Routes>
    </BrowserRouter>
    
  )
}