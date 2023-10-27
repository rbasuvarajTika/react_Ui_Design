import React from 'react'
import Edit_User from '../../components/admin_page/Edit_User'
import Background from '../../components/Background';
import Header_Navigation from '../../components/header/Header_Navigation'

const Admin_Edit_User = () => {
  return (
    <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
    <Header_Navigation/>
    <Background/>
    <Edit_User/>
    </div>
  )
}

export default Admin_Edit_User 