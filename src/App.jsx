import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import * as jwt_decode from "jwt-decode";
import Table from "./components/table/Table";
import Forgot_Page from "./pages/forgot _page/Forgot_Page";
import Forgot_Password from "./pages/forgot _page/Forgot_Password";
import Forgot_UserId from "./pages/forgot _page/Forgot_UserId";
import { DuplicateContext } from "./context/DuplicateContext";
import { AdminContext } from "./context/AdminContext";
import { EditUserContext } from "./context/EditUserContext";
import CaseDetails from "./pages/case_details/CaseDetails";
import Duplicate_Fax from "./components/fax/Duplicate_Fax";
import Admin_User_List from "./pages/admin_pages/Admin_User_List";
import Fax_List from "./pages/fax_details/Fax_List";
import Duplicate_Fax_Page from "./pages/fax_details/Duplicate_Fax_Page";
import Rx_Tracker_List from "./pages/rx_tracker_list/Rx_Tracker_List";
import Admin_Edit_User from "./pages/admin_pages/Admin_Edit_User";
import Admin_Edit_Profile from "./pages/admin_pages/Admin_Edit_Profile";
import Admin_Create_New_User from "./pages/admin_pages/Admin_Create_New_User";
import CaseDetailsNewPage from "./pages/case_details/CaseDetailsNewPage";
import FaxId_Form_New from "./components/table/FaxId_Form_New";
import Fax_show_project from "./components/table/Fax_show_project";
import NewRxCaseDetails from "./components/case_details/NewRxCaseDetails";
import NewRx from "./pages/case_details/NewRx";
import Validate_Note from "./components/table/Validate_Note";
import FaxId_Form from "./components/table/FaxId_Form";
import ResetPassword from "./components/admin_page/ResetPassword";
import Admin_Create_Password from "./pages/admin_pages/Admin_Create_Password";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const isAdmin = () => {
  const userRole = localStorage.getItem("role");
  return userRole === "Admin";
};

function App() {
  const [openDuplicate, setOpenDuplicate] = useState(false);
  const [showForms, setShoeForms] = useState(false);
  const [openNetSuit, setNetSuit] = useState(false);

  // admin section
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenTika");
    const isAdminPresent = isAdmin(); // Check if the user is an admin

    // Check if the current route is an admin route
    const isAdminRoute =
      location.pathname.startsWith("/nsrxmgt/admin-user-list") ||
      location.pathname.startsWith("/nsrxmgt/admin-create-user") ||
      location.pathname.startsWith("/nsrxmgt/admin-edit-user/");
    //  location.pathname.startsWith("/nsrxmgt/admin-edit-profile/");

    if (!token || (!isAdminPresent && isAdminRoute)) {
      navigate("/nsrxmgt");
    }
  }, [location, navigate]);

  const generateRoutes = () => {
    const commonRoutes = (
      <Routes>
        <Route path="/nsrxmgt" element={<Login />} />

        <Route
          path="/nsrxmgt/table"
          element={<PrivateRoute element={<Table />} />}
        />
        <Route
          path="/nsrxmgt/case-details/:trnRxId"
          element={<PrivateRoute element={<CaseDetails />} />}
        />
        <Route path="/nsrxmgt/forgot" element={<Forgot_Page />} />
        <Route path="/nsrxmgt/forgotpassword" element={<Forgot_Password />} />

        <Route path="/nsrxmgt/forgotuserid" element={<Forgot_UserId />} />
        <Route
          path="/nsrxmgt/fax-list"
          element={<PrivateRoute element={<Fax_List />} />}
        />
        <Route
          path="/nsrxmgt/fax-list-page/:faxId/:sendNoOfRxs/:trnFaxId"
          element={<PrivateRoute element={<FaxId_Form_New />} />}
        />
        <Route
          path="/nsrxmgt/duplicate-fax/:faxId"
          element={<PrivateRoute element={<Duplicate_Fax_Page />} />}
        />
        <Route
          path="/nsrxmgt/rx-tracker-list"
          element={<PrivateRoute element={<Rx_Tracker_List />} />}
        />
        <Route
          path="/nsrxmgt/case-details-new/:trnRxId/:paramFaxId/:netSuitId/:paramPatientId"
          element={<PrivateRoute element={<CaseDetailsNewPage />} />}
        />
        <Route
          path="/nsrxmgt/fax_project"
          element={<PrivateRoute element={<Fax_show_project />} />}
        />
        <Route
          path="/nsrxmgt/newrx/:faxId/:trnFaxId"
          element={<PrivateRoute element={<NewRx />} />}
        />
        <Route
          path="/nsrxmgt/validatenote/:faxId/:sendNoOfRxs/:trnFaxId/:patientFirstName/:patientLastName/:hcpFirstName/:hcpLastName"
          element={<PrivateRoute element={<Validate_Note />} />}
        />
        <Route
          path="/nsrxmgt/faxform/:faxId"
          element={<PrivateRoute element={<FaxId_Form />} />}
        />
        <Route
          path="/nsrxmgt/admin-edit-profile/:userId"
          element={<PrivateRoute element={<Admin_Edit_Profile />} />}
        />
        <Route
          path="/nsrxmgt/reset-password"
          element={<PrivateRoute element={<ResetPassword />} />}
        />
      </Routes>
    );
    const adminRoutes = (
      <Routes>
        <Route
          path="/nsrxmgt/admin-user-list"
          element={<PrivateRoute element={<Admin_User_List />} />}
        />
        <Route
          path="/nsrxmgt/admin-create-user"
          element={<PrivateRoute element={<Admin_Create_New_User />} />}
        />
        <Route
          path="/nsrxmgt/admin-edit-user/:userId"
          element={<PrivateRoute element={<Admin_Edit_User />} />}
        />
      </Routes>
    );

    return isAdmin() ? (
      <>
        {commonRoutes}
        {adminRoutes}
      </>
    ) : (
      commonRoutes
    );
  };

  return (
    <DuplicateContext.Provider
      value={{
        setOpenDuplicate,
        openDuplicate,
        setShoeForms,
        showForms,
        openNetSuit,
        setNetSuit,
      }}
    >
      <AdminContext.Provider value={{ setOpenNewUser, setSelectedUserData }}>
        <EditUserContext.Provider value={{ setOpenEditUser, openEditUser }}>
          {generateRoutes()}
        </EditUserContext.Provider>
      </AdminContext.Provider>
    </DuplicateContext.Provider>
  );
}

export default App;
