import React from 'react'
import Create_New_User from '../../components/admin_page/Create_New_User'
import Background from '../../components/Background';
import Header_Navigation from '../../components/header/Header_Navigation'
import Header_Navigation_Admin from '../../components/header/Header_Navigation_Admin';
import Header_Navigation_CreateUser from '../../components/header/Header_Navigation_CreateUser';
import Header_Navigation_ResetPass from '../../components/header/Header_Navigation_ResetPass';
import ResetPassword from '../../components/admin_page/ResetPassword';

const Admin_Create_Password = () => {
  return (
    <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
        <Header_Navigation_ResetPass/>
        <Background/>
        <ResetPassword />
    </div>
  )
}

export default Admin_Create_Password