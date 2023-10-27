import {
    AccountCircle,
    ArrowBack,
    InsertDriveFile,
    Lock,
    Logout,
} from "@mui/icons-material";

import { RiAdminFill } from 'react-icons/ri';
import FaxIcon from '@mui/icons-material/Fax';
import { useLocation, useNavigate } from "react-router-dom";
import { Children, useContext, useEffect, useState } from "react";
import { DuplicateContext } from "../../context/DuplicateContext";
import { AdminContext } from "../../context/AdminContext";


function Header_Navigation() {
    const [search, setSearch] = useState("")
    const [fax_name, set_fax_name] = useState("")
    const [case_details, set_case_details] = useState("")
    const [openCase, setOpenCase] = useState(false)
    const [openTrackerList, setOpenTrackerList] = useState(false)
    const [TrackerLIst, setTrackerLIst] = useState("")
    const [openAdminList, setOpenAdminList] = useState(false)
    const [AdminLIst, setAdminList] = useState("")
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [EditProfile, setEditProfile] = useState("")

    const navigate = useNavigate();
    const location = useLocation();
    const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } = useContext(DuplicateContext)
    const { setOpenNewUser, openNewUser } = useContext(AdminContext)


    const fax_handleClick = () => {
        set_fax_name("FAX LIST")
        navigate("/nsrxmgt/fax-list")
        
    }

    const openRxTrackerList = () => {
        setOpenTrackerList(true)
        setTrackerLIst("RX Tracker List")
        navigate("/nsrxmgt/rx-tracker-list")
    }

    const openAdminUserList = () => {
        setAdminList("User List")
        navigate("/nsrxmgt/admin-user-list")
       
    }

    const openEditUserProfile = () => {
        setEditProfile("Edit Profile")
        navigate("/nsrxmgt/admin-edit-profile")
      
    }

    const logout = () => {
        localStorage.removeItem("tokenTika")
        navigate("/nsrxmgt")
    }

    return (
            <div className="w-full text-xs flex items-center justify-between py-1 font-bold z-50">
                <div className="flex items-center gap-6">
                    <span className="uppercase flex items-center gap-1" onClick={() => navigate(-1)}>
                        <span className="bg-white rounded-full z-50">
                            <ArrowBack className="text-teal-400" onClick={() => navigate(-1)} />
                        </span>
                        <span className="hidden md:block z-50" onClick={() => navigate(-1)}>Next science</span>
                    </span>
                    <span className="flex items-center gap-1 z-50" onClick={openEditUserProfile}>
                        <AccountCircle />
                        <span className="underline hidden md:block z-50" onClick={openEditUserProfile}>Erica Fernandes</span>
                    </span>
                </div>
                <div>
                    <span className="uppercase cursor-pointer text-[#FE7D00] text-sm font-bold z-50" >
                        {
                            fax_name ? fax_name : case_details ? case_details : TrackerLIst ? TrackerLIst : AdminLIst ? AdminLIst : EditProfile ? EditProfile :""
                        }

                    </span>
                </div>
                <div className="flex items-center gap-5">
                <span className="flex items-center gap-1 z-50 cursor-pointer" onClick={openAdminUserList}>
                    <RiAdminFill size={21} />
                    <span className="hidden md:block z-50"  onClick={openAdminUserList} >Admin</span>
                </span>
                    <span className="flex items-center z-50 cursor-pointer" onClick={fax_handleClick}>
                        <FaxIcon />
                        <span className="hidden md:block z-50" onClick={fax_handleClick}>Fax List</span>
                    </span>
                    <span className="flex items-center z-50 cursor-pointer" onClick={openRxTrackerList}>
                        <InsertDriveFile />
                        <span className="hidden md:block z-50" onClick={openRxTrackerList}> Rx Tracker List</span>
                    </span>
                    <span className="flex items-center gap-1 z-50 cursor-pointer" onClick={logout}>
                        <Logout />
                        <span className="hidden md:block z-50" onClick={logout}> Logout</span>
                    </span>
                    <span className="hidden text-[#FE7D00] text-lg md:hidden lg:flex flex-col items-center leading-[4px] z-50 ">
                        <h3 className="text-3xl z-50">
                            Tika<span className="text-blue-500 z-50">Rx</span>
                        </h3>
                        <p className="text-[8px] text-white z-50">Rx Management System</p>
                    </span>
                </div>
            </div>
    )
}

export default Header_Navigation