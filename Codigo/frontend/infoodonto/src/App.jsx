import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//Pages
import FormPaciente from "./assets/pages/formPaciente";

export default function App() {


  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        
          <Route exact path="/formPaciente" element={<FormPaciente/>} />
          
      
      </Routes>
    </BrowserRouter>
    </div>
  )
}