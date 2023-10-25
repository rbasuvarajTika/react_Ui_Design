import Login from "./components/Login"
import Table from "./components/table/Table"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Forgot_Page from "./pages/forgot _page/Forgot_Page"
import Duplicate_Fax from "./components/fax/Duplicate_Fax"
import { DuplicateContext } from "./context/DuplicateContext"
import { useEffect, useState } from "react"
import Admin_User_List from "./pages/admin_Pages/Admin_User_List"
import { AdminContext } from "./context/AdminContext"

function App() {
  const [openDuplicate, setOpenDuplicate] = useState(false)
  const [showForms, setShoeForms] = useState(false)
  const [openNetSuit, setNetSuit] = useState(false)

  //admin section 
  const [openNewUser, setOpenNewUser] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let isAdminpresent = localStorage.getItem("tokenTika");
    if (isAdminpresent === "" || isAdminpresent === null) {
      navigate("/")
    }
  }, [])

  return (
    <DuplicateContext.Provider value={{ setOpenDuplicate, openDuplicate, setShoeForms, showForms, openNetSuit, setNetSuit}} >
      <AdminContext.Provider value={{setOpenNewUser, openNewUser}}>
        <Routes>
          <Route path="/nsrxmgt" element={<Login />} />
          <Route path="/nsrxmgt/table" element={<Table />} />
          <Route path="/nsrxmgt/forgot" element={<Forgot_Page />} />
        </Routes>
      </AdminContext.Provider>

    </DuplicateContext.Provider>

  )
}

export default App