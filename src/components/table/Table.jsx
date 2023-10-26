import {
    AccountCircle,
    ArrowBack,
    InsertDriveFile,
    Lock,
    Logout,
} from "@mui/icons-material";
import TableList from "./TableList";
import { RiAdminFill } from 'react-icons/ri';
import FaxIcon from '@mui/icons-material/Fax';
import Background from "../Background";
import { IoMdSettings } from  "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { Children, useContext, useEffect, useState } from "react";
import Duplicate_Fax from "../fax/Duplicate_Fax";
import { DuplicateContext } from "../../context/DuplicateContext";
import { AdminContext } from "../../context/AdminContext";
import CaseDetails from "../../pages/case_details/CaseDetails";
import Rx_Tracker_List from "../../pages/rx_tracker_list/Rx_Tracker_List";
import Admin_User_List from "../admin_page/Admin_User_Table";
import Edit_Profile from "../admin_page/Edit_Profile";

function Table() {
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
    

    useEffect(() => {
        set_fax_name("FAX LIST")
    }, [])

    const fax_handleClick = () => {
        setOpenTrackerList(false)
        setOpenDuplicate(false)
        setOpenAdminList(false)
        setAdminList("")
        navigate("/nsrxmgt/table")
        setShoeForms(false)
        setOpenCase(false)
        set_fax_name("FAX LIST")
        set_case_details("")
        setOpenEditProfile(false)
        setEditProfile("")
    }

    const openCaseDetails = () => {
        setOpenTrackerList(false)
        setOpenCase(true)
        set_case_details("CASE DETAILS")
        set_fax_name("")
        setOpenAdminList(false)
        setAdminList("")
        setOpenEditProfile(false)
        setEditProfile("")

    }
    const openRxTrackerList = () => {
        setOpenTrackerList(true)
        setShoeForms(false)
        setOpenCase(false)
        set_fax_name("")
        set_case_details("")
        setOpenAdminList(false)
        setAdminList("")
        setTrackerLIst("Rx Tracker List")
        setOpenEditProfile(false)
        setEditProfile("")
    }

    const openAdminUserList = () => {
        setOpenAdminList(true)
        setAdminList("User List")
        setOpenTrackerList(false)
        setShoeForms(false)
        setOpenCase(false)
        setOpenNewUser(false)
        set_fax_name("")
        set_case_details("")
        setTrackerLIst("")
        setOpenDuplicate(false)
        setOpenEditProfile(false)
        setEditProfile("")
    }

    const openEditUserProfile = () => {
        setOpenEditProfile(true)
        setEditProfile("Edit User Profile")
        setOpenAdminList(false)
        setAdminList("")
        setOpenTrackerList(false)
        setShoeForms(false)
        setOpenCase(false)
        setOpenNewUser(false)
        set_fax_name("")
        set_case_details("")
        setTrackerLIst("")
        setOpenDuplicate(false)
    }

    const logout = () => {
        localStorage.removeItem("tokenTika")
        navigate("/nsrxmgt")
    }

    return (
        <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">

            <div className="w-full text-xs flex items-center justify-between py-1 font-bold z-50">
                <div className="flex items-center gap-6">
                    <span className="uppercase flex items-center gap-1">
                        <span className="bg-white rounded-full z-50">
                            <ArrowBack className="text-teal-400" onClick={() => navigate(-1)} />
                        </span>
                        <span className="hidden md:block z-50">Next science</span>
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

            {/* mobile input */}
            <div className="md:hidden text-center p-2 z-50">
                <input
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    className=" rounded-full bg-white outline-none px-2 py-1.5 text-black z-50"
                />
            </div>
            <Background />


            {
                openCase ? <CaseDetails />
                    : openTrackerList ? <Rx_Tracker_List /> :openAdminList ? <Admin_User_List /> : openEditProfile ? <Edit_Profile /> :
                        <TableList />
            }




        </div>
    )
}

export default Table