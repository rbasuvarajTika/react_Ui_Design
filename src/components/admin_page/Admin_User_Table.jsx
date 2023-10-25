import { useContext, useEffect, useState } from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import { DuplicateContext } from "../../context/DuplicateContext";

import { ToastContainer, toast } from 'react-toast'
import axios from "axios";
import { MdEditDocument } from "react-icons/md";
import Admin_Create_New_User from "../../pages/admin_Pages/Admin_Create_New_User";
import { AdminContext } from "../../context/AdminContext";

const Admin_User_Table = () => {
    // const [currentpage, setCurrentPage] = useState(1);
    // const [postsPerPage, setPostPerPage] = useState(14)
    // const [showForm, setShoeForm] = useState(false)
    // const [search, setSearch] = useState("")
    // const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } = useContext(DuplicateContext)
    const [faxData, setFaxData] = useState([])
    // const [openNewUser, setOpenNewUser] = useState(false)

    const { setOpenNewUser, openNewUser } = useContext(AdminContext)

    useEffect(() => {
        try {
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
        setOpenNewUser(true)
    }


    return (
        <>
  

         {
            !openNewUser ? <>
             <div className="w-ful pt- relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
                <div className="w-full h-ful flex justify-end items-center p-2 ">
                    <div className="flex gap-5">
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer' onClick={CreateNewUser}>Create New User</div>
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#e60000] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer'>Report Fields</div>
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
                            {faxData.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "" : "bg-[#f6f6f6] "
                                        } bg-white text-black/70 text-xs`}
                                >
                                    <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                                        <div className="cursor-pointer"
                                            onClick={() => handleFaxStatus(item.faxStatus)}
                                        >
                                            {item.userId}
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
            </> : <> 
            
             <Admin_Create_New_User />
            </>
         }

           
        </>
    )
}

export default Admin_User_Table