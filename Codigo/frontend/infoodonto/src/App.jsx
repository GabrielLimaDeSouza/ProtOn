import { Outlet } from "react-router-dom"

//* CSS
import './App.css'

function App() {
  return (
    <div className="App">
        <Outlet />
    </div>
  )
}

export default App