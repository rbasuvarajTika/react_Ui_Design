import Login from "./components/Login"
import Table from "./components/table/Table"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Forgot_Page from "./pages/forgot _page/Forgot_Page"
import Duplicate_Fax from "./components/fax/Duplicate_Fax"
import { DuplicateContext } from "./context/DuplicateContext"
import { useState } from "react"

function App() {
  const [openDuplicate, setOpenDuplicate] = useState(false)
  const [showForms, setShoeForms] = useState(false)

  return (
    <DuplicateContext.Provider value={{ setOpenDuplicate, openDuplicate, setShoeForms, showForms }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/table" element={<Table />} />
          <Route path="/forgot" element={<Forgot_Page />} />
        </Routes>
      </BrowserRouter>
    </DuplicateContext.Provider>

  )
}

export default App