import Login from "./components/Login"
import Table from "./components/table/Table"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Forgot_Page from "./pages/forgot _page/Forgot_Page"
import Forgot_Password from "./pages/forgot _page/Forgot_Password"
import Forgot_UserId from "./pages/forgot _page/Forgot_UserId"
import { DuplicateContext } from "./context/DuplicateContext"
import { useEffect, useState } from "react"
import { AdminContext } from "./context/AdminContext"
import CaseDetails from "./pages/case_details/CaseDetails"
import Duplicate_Fax from "./components/fax/Duplicate_Fax"
import Admin_User_List from "./pages/admin_Pages/Admin_User_List"

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
      navigate("/nsrxmgt")
    }
  }, [])

  return (
    <DuplicateContext.Provider value={{ setOpenDuplicate, openDuplicate, setShoeForms, showForms, openNetSuit, setNetSuit}} >
      <AdminContext.Provider value={{setOpenNewUser, openNewUser}}>
        
        <Routes>
          <Route path="/nsrxmgt" element={<Login />} />
          <Route path="/nsrxmgt/table" element={<Table />} />
          <Route path="/nsrxmgt/case-details/:trnRxId" element={<CaseDetails />} />

          <Route path="/nsrxmgt/forgot" element={<Forgot_Page />} />
          <Route path="/nsrxmgt/forgotpassword" element={<Forgot_Password />} />
          <Route path="/nsrxmgt/forgotuserid" element={<Forgot_UserId />} />
          <Route path="/admin-user-list" element={<Admin_User_List />} />
        </Routes>
        
      </AdminContext.Provider>
      
    </DuplicateContext.Provider>

  )
}

export default App