import { useContext, useEffect, useState } from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import { DuplicateContext } from "../../context/DuplicateContext";
import Pagination from "../Pagination";
import { ToastContainer, toast } from 'react-toast'
import axios from "axios";
import { MdEditDocument } from "react-icons/md";
import Admin_Create_New_User from "../../pages/admin_Pages/Admin_Create_New_User";
import Admin_Edit_User from "../../pages/admin_Pages/Admin_Edit_User";
import { AdminContext } from "../../context/AdminContext";
import { EditUserContext } from "../../context/EditUserContext";
import { useNavigate } from 'react-router-dom';

const Admin_User_Table = () => {
     const [currentpage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(14);
    const [faxData, setFaxData] = useState([]);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const { setOpenNewUser, openNewUser} = useContext(AdminContext)
    const { setOpenEditUser, openEditUser} = useContext(EditUserContext)
    const [sendUserId, setUserId] =useState(null)

    useEffect(() => {
        try {
            const token = localStorage.getItem('tokenTika');
    
            // Include the token in the request headers
            axios.get("https://dev.tika.mobi:8443/next-service/api/v1/users/usersList", {
                headers: { "Content-Type": "application/json" }
            })
                .then((res) => {
                    console.log(res?.data);
                    setFaxData(res?.data.data.data)
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const CreateNewUser = () => {
        navigate(`/nsrxmgt/admin-create-user`);
    }

    const handleEditUser = (userId) => {
        navigate(`/nsrxmgt/admin-edit-user/${userId}`);
    } 

    const lastPostIndex = currentpage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = faxData.slice(firstPostIndex, lastPostIndex);
    const npage = Math.ceil(faxData.length / postsPerPage);
    return (
        <>
  

         {
             <div className="w-ful pt- relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
                <div className=''>
                    <div className="w-full  h-ful flex justify-between items-center p-2 ">
                        <div className="flex gap-5">
                            <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                    <input type="search"
                                onChange={(e) => setSearch(e.target.value)}
                                className="border  px-4 shadow-lg rounded-md py-2 placeholder:text-black text-gray-500"
                                placeholder="Search User.." />
                            </span>

                            <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                            </span>
                        </div>
                        <div className='lg:block hidden'>
                            <div className="flex items-center xl:gap-10 gap-4 ">
                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer' onClick={CreateNewUser}>Create New User</div>
                                </span>

                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#e60000] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer'>Report Fields</div>
                                </span>
                                <Pagination
                                        totalPosts={faxData.length}
                                        postsPerPage={postsPerPage}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentpage}
                                        lastPostIndex={lastPostIndex}
                                        npage={npage}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[600px]  h-[500px]   no-scrollbar ">
                    <table className="w-full text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-sm text-[#2b5b7a] font-bold bg-[#a3d3ffa4] rounded-2xl ">
                                <th className="px-6 py-3 ">User ID</th>
                                <th className="px-6 py-3">First Name</th>
                                <th className="px-6 py-3">Last Name</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 ">Edit</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.filter((item) => {
                                          const matchesSearch = search === "" || item.username.includes(search);
                                          return matchesSearch;
                                        }).map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "" : "bg-[#f6f6f6] "
                                        } bg-white text-black/70 text-xs`}
                                >
                                    <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                                        <div className="cursor-pointer"
                                           onClick={() => handleEditUser(item.userId)}
                                        >
                                            {item.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.firstName}</td>
                                    <td className="px-6 py-4 cursor-pointer" >{item.lastName}</td>
                                    <td className="px-6 py-4">{item.phone}</td>
                                    <td className="px-6 py-4">{item.role}</td>
                                    <td className="px-6 py-4">{item.userType}</td>
                                    <td className="px-6 py-4">{item.userStatusFlag}</td>
                                    <td className="px-6 py-4">
                                        <MdEditDocument className="text-[#1b5d7d]" size={25} />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
         }

           
        </>
    )
}

export default Admin_User_Table