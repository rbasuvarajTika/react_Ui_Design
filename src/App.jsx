import Login from "./components/Login"
import Table from "./components/table/Table"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Forgot_Page from "./pages/forgot _page/Forgot_Page"
import Duplicate_Fax from "./components/fax/Duplicate_Fax"
import { DuplicateContext } from "./context/DuplicateContext"
import { useEffect, useState } from "react"

function App() {
  const [openDuplicate, setOpenDuplicate] = useState(false)
  const [showForms, setShoeForms] = useState(false)
  const [openNetSuit, setNetSuit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let isAdminpresent = localStorage.getItem("tokenTika");
    if (isAdminpresent === "" || isAdminpresent === null) {
      navigate("/")
    }
  }, [])

  return (
    <DuplicateContext.Provider value={{ setOpenDuplicate, openDuplicate, setShoeForms, showForms, openNetSuit, setNetSuit}} >

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Table />} />
        <Route path="/forgot" element={<Forgot_Page />} />
      </Routes>

    </DuplicateContext.Provider>

  )
}

export default App