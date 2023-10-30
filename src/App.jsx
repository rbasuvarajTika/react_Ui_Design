import Login from "./components/Login"
import Table from "./components/table/Table"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Forgot_Page from "./pages/forgot _page/Forgot_Page"
import Forgot_Password from "./pages/forgot _page/Forgot_Password"
import Forgot_UserId from "./pages/forgot _page/Forgot_UserId"
import { DuplicateContext } from "./context/DuplicateContext"
import { useEffect, useState } from "react"
import { AdminContext } from "./context/AdminContext"
import { EditUserContext } from "./context/EditUserContext"
import CaseDetails from "./pages/case_details/CaseDetails"
import Duplicate_Fax from "./components/fax/Duplicate_Fax"
import Admin_User_List from "./pages/admin_Pages/Admin_User_List"
import Fax_List from "./pages/fax_details/Fax_List"
import Duplicate_Fax_Page from "./pages/fax_details/Duplicate_Fax_Page"
import Rx_Tracker_List from "./pages/rx_tracker_list/Rx_Tracker_List"
import Admin_Edit_User from "./pages/admin_Pages/Admin_Edit_User"
import Admin_Edit_Profile from "./pages/admin_Pages/Admin_Edit_Profile"
import Admin_Create_New_User from "./pages/admin_Pages/Admin_Create_New_User"
import CaseDetailsNewPage from "./pages/case_details/CaseDetailsNewPage"

function App() {
  const [openDuplicate, setOpenDuplicate] = useState(false)
  const [showForms, setShoeForms] = useState(false)
  const [openNetSuit, setNetSuit] = useState(false)


  //admin section 
  const [openNewUser, setOpenNewUser] = useState(false)
  const [openEditUser, setOpenEditUser] = useState(false)

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
      <EditUserContext.Provider value={{setOpenEditUser, openEditUser}}>
        
        <Routes>
          <Route path="/nsrxmgt" element={<Login />} />
          <Route path="/nsrxmgt/table" element={<Table />} />
          <Route path="/nsrxmgt/case-details/:trnRxId" element={<CaseDetails />} />

          <Route path="/nsrxmgt/forgot" element={<Forgot_Page />} />
          <Route path="/nsrxmgt/forgotpassword" element={<Forgot_Password />} />
          <Route path="/nsrxmgt/forgotuserid" element={<Forgot_UserId />} />
          <Route path="/nsrxmgt/admin-user-list" element={<Admin_User_List />} />
          <Route path="/nsrxmgt/admin-create-user" element={<Admin_Create_New_User />} />
          <Route path="/nsrxmgt/admin-edit-user/:userId" element={<Admin_Edit_User />} />
          <Route path="/nsrxmgt/admin-edit-profile/:userId" element={<Admin_Edit_Profile />} />
          <Route path="/nsrxmgt/fax-list" element={<Fax_List />} />
          <Route path="/nsrxmgt/duplicate-fax/:faxId" element={<Duplicate_Fax_Page />} />
          <Route path="/nsrxmgt/rx-tracker-list" element={<Rx_Tracker_List />} />
          <Route path="/nsrxmgt/case-details-new/:trnRxId/:paramFaxId/:netSuitId/:paramPatientId" element={<CaseDetailsNewPage />} />
        </Routes>
      </EditUserContext.Provider>  
      </AdminContext.Provider>
      
    </DuplicateContext.Provider>

  )
}

export default App