import {
    AccountCircle,
    ArrowBack,
    InsertDriveFile,
    Lock,
    Logout,
} from "@mui/icons-material";

import { RiAdminFill } from 'react-icons/ri';
import FaxIcon from '@mui/icons-material/Fax';
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axiosBaseURL from "../axios";


function Header_Navigation() {
    const [fax_name, set_fax_name] = useState(null)
    const [TrackerLIst, setTrackerLIst] = useState(null)
    const [AdminLIst, setAdminList] = useState(null)
    const [EditProfile, setEditProfile] = useState(null)
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    useEffect(() => {
        // Retrieve userId from localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    
    const fetchUserData = () => {
        try {
         const userId = localStorage.getItem('userId');
          const config = {
          };
          axiosBaseURL({
              method: 'GET',
              url: `/api/v1/users/usersList/userId/${userId}`,
              headers: {
               // Authorization: `Bearer ${token}`,
              },
            })
              .then((mainResponse) => {
                console.log(mainResponse.data.data[0]);
                setUserData(mainResponse.data.data[0]);
                console.log("userData",userData);
              })
              .catch((error) => {
                //setError('Error fetching main PDF. Please try again later.');
                console.error('Error fetching main Data:', error);
              });
         
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle network or other errors
        }
      };
      useEffect(() => {
        // Fetch PDF data for both main and duplicate fax when the component mounts
        fetchUserData();
      }, []);


    const fax_handleClick = () => {
        console.log("Inside fax")
        setTrackerLIst(null)
        setAdminList(null)
        setEditProfile(null)
        set_fax_name("FAX LIST")
        navigate("/nsrxmgt/fax-list")
    }

    const openRxTrackerList = () => {
        setTrackerLIst("RX Tracker List")
        navigate("/nsrxmgt/rx-tracker-list")
    }

    const openAdminUserList = () => {
        setAdminList("User List")
        setTrackerLIst("")
        setEditProfile("")
        set_fax_name("")
        navigate("/nsrxmgt/admin-user-list")
       
    }

    const openEditUserProfile = () => {
        setEditProfile("Edit Profile")
        navigate(`/nsrxmgt/admin-edit-profile/${userId}`);
      
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
                    {userData && (
                    <span className="flex items-center gap-1 z-50" onClick={openEditUserProfile}>
                        <AccountCircle />
                        <span className="underline hidden md:block z-50" onClick={openEditUserProfile}>{userData.firstName} {userData.middleName} {userData.lastName}</span>
                    </span>
                    )}
                </div>
                <div>
                    <span className="uppercase cursor-pointer text-[#FE7D00] text-sm font-bold z-50" >
                        {
                            fax_name ? fax_name  : TrackerLIst ? TrackerLIst : AdminLIst ? AdminLIst : EditProfile ? EditProfile :""
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