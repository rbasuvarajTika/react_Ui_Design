import Login from "./components/Login"
import Table from "./components/Table"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Forgot_Page from "./pages/forgot _page/Forgot_Page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Table />} />
        <Route  path="/forgot" element={<Forgot_Page />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App