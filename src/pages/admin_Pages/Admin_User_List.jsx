import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom';
import Background from '../../components/Background';
import Header_Navigation from '../../components/header/Header_Navigation'
import Admin_User_Table from '../../components/admin_page/Admin_User_Table';
import { AdminContext } from '../../context/AdminContext';

const Admin_User_List = () => {
    const { setOpenNewUser, openNewUser } = useContext(AdminContext)

    const navigate = useNavigate();

    const habdleFaxList = () => {
        setOpenNewUser(false)
    }



    return (
        <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
            <Header_Navigation/>
            <Background/>
            <Admin_User_Table />
        </div>
    )
}

export default Admin_User_List