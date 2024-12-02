import { useContext, useEffect, useState } from "react";
import Pagination from "../Pagination";
import axios from "axios";
import { MdEditDocument } from "react-icons/md";
import { AdminContext } from "../../context/AdminContext";
import { EditUserContext } from "../../context/EditUserContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import axiosBaseURL from "../axios";

const Admin_User_Table = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [faxData, setFaxData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedUserStatus, setSelectedUserStatus] = useState("");

  const { setOpenNewUser, openNewUser } = useContext(AdminContext);
  const { setOpenEditUser, openEditUser } = useContext(EditUserContext);
  const [sendUserId, setUserId] = useState(null);

  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    try {
      const token = localStorage.getItem("tokenTika");

      // Include the token in the request headers
      axiosBaseURL
        .get("/api/v1/users/usersList", {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res?.data);
          setFaxData(res?.data.data.data);
          // Initialize sortedData with the fetched data
          setSortedData(res?.data.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const CreateNewUser = () => {
    navigate(`/nsrxmgt/admin-create-user`);
  };

  const handleEditUser = (userId) => {
    navigate(`/nsrxmgt/admin-edit-user/${userId}`);
  };
  const handleUserStatusChange = (event) => {
    console.log(event.target.value);
    setSelectedUserStatus(event.target.value);
  };
  const npage = Math.ceil(faxData.length / postsPerPage);
  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = sortedData.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    setSortOrder(faxData);
    console.log(";kjbkhbklh");
  }, [faxData]);

  // const handleSort = () => {
  //     // Toggle the sorting order
  //     const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  //     setSortOrder(newSortOrder);

  //     // Clone the data to avoid mutating the original array
  //     const newData = [...sortedData];

  //     // Sort the data based on the "firstName" field
  //     newData.sort((a, b) => {
  //         // Change the comparison logic based on the sorting order
  //         if (newSortOrder === 'asc') {
  //             return a.firstName.localeCompare(b.firstName);
  //         } else {
  //             return b.firstName.localeCompare(a.firstName);
  //         }
  //     });

  //     // Update the sorted data
  //     setSortedData(newData);
  // };

  const handleSort = (columnName) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const newData = [...sortedData];

    newData.sort((a, b) => {
      const columnA = a[columnName];
      const columnB = b[columnName];

      // Handle cases where the property may be null or undefined
      const valueA = columnA !== null && columnA !== undefined ? columnA : "";
      const valueB = columnB !== null && columnB !== undefined ? columnB : "";

      // Adjust the comparison logic based on the column type
      if (typeof valueA === "string") {
        // For string comparison
        return newSortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        // For numeric comparison
        return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setSortedData(newData);
  };

  console.log("sortOrder", sortOrder);
  return (
    <>
      {
        <>
          <div className="w-ful min-h-fit mt-8 sm:mt-3  max-h-[630px h-[calc(100%-4rem)] m:max-h-[670px] md:max-h[700px] lg:h-full pt-5 relative overflow-x-auto  rounded-xl bg-white p-1  overflow-y-scroll  no-scrollbar">
            <div className="">
              <div className="w-full  h-full flex flex-wrap justify-between items-center p-2 gap-3 ">
                <div className=" flex flex-wrap lg:flex-row flex-col lg:gap-5 gap-1">
                  <div className="flex gap-5">
                    <span className="hidde md:flex items-center gap-1 z-70 text-[#194a69] text-xs  relative">
                      User Status:
                      <select
                        className="bg-[#f2f2f2] rounded-2xl border border-gray-300w-56 text-black py-0.5 px-0.5 text-xs t-1"
                        type="text"
                        value={selectedUserStatus}
                        onChange={handleUserStatusChange}
                      >
                        <option value="All Status">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Deactivated">Deactivated</option>
                      </select>
                    </span>
                  </div>

                  <div className="flex gap-5">
                    <span className="hidde md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                      <label
                        className="text-xs text-black  text-start"
                        htmlFor=""
                      >
                        Search User :
                      </label>
                      <input
                        type="search"
                        onChange={(e) => setSearch(e.target.value)}
                        className="border  px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500 w-36"
                      />
                    </span>

                    <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative"></span>
                  </div>
                </div>
                <div className="lg:block ">
                  <div className="flex items-center xl:gap-10 gap-4 ">
                    <div className="flex lg:flex-row flex-col gap-1">
                      <span className="hidde md:flex items-center gap-1 z-50 text-[#ffffff] text-sm  relative">
                        <div
                          className="sm:w-44 csm:w-32 vsm:w-20 w-28 py-1 bg-[#00ab06] rounded-xl flex justify-center text-center md:text-sm text-xs cursor-pointer"
                          onClick={CreateNewUser}
                        >
                          Create New User
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sm:block ml-auto justify-end">
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
            <div></div>
            <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[600px]  h-[500px]   no-scrollbar ">
              <table className="w-full text-sm text-center table-auto  ">
                <thead className="">
                  <tr className="text-sm text-[#2b5b7a] font-bold bg-[#a3d3ffa4] rounded-2xl ">
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis ">
                      User ID
                      <div
                        onClick={() => handleSort("username")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      First Name
                      <div
                        onClick={() => handleSort("firstName")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Last Name
                      <div
                        onClick={() => handleSort("lastName")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Phone
                      <div
                        onClick={() => handleSort("phone")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Role
                      <div
                        onClick={() => handleSort("role")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Type
                      <div
                        onClick={() => handleSort("userType")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Status
                      <div
                        onClick={() => handleSort("userStatusFlag")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Updated User
                      <div
                        onClick={() => handleSort("userStatusFlag")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis">
                      Updated Date
                      <div
                        onClick={() => handleSort("userStatusFlag")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-1 py-1 max-w-[150px] w-[150px] overflow-hidden overflow-ellipsis ">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="item-center">
                  {sortedData
                    .filter((item) => {
                      const searchTerm = search.toLowerCase();
                      const itemUsername = item.username.toLowerCase();
                      const matchesSearch =
                        searchTerm === "" || itemUsername.includes(searchTerm);
                      if (selectedUserStatus === "All Status") {
                        return matchesSearch;
                      } else {
                        const matchesUserStatus =
                          selectedUserStatus === "" ||
                          item.userStatusFlag === selectedUserStatus;
                        return matchesSearch && matchesUserStatus;
                      }
                    })
                    .slice(firstPostIndex, lastPostIndex)
                    .map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "" : "bg-[#f2f3f5] "
                        } bg-white text-black/70 text-xs`}
                      >
                        <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                          <div className="">{item.username}</div>
                        </td>
                        <td className="px-6 py-4 max-w-[20px] overflow-hidden overflow-ellipsis">
                          {item.firstName}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis ">
                          {item.lastName}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">
                          {item.phone}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">
                          {item.role}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">
                          {item.userType}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">
                          {item.userStatusFlag}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">
                          {item.userStatusFlag}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis">
                          {item.userStatusFlag}
                        </td>
                        <td className="px-6 py-4 max-w-[200px] overflow-hidden overflow-ellipsis item-center flex justify-center">
                          <MdEditDocument
                            className="text-[#1b5d7d] cursor-pointer"
                            size={25}
                            onClick={() => handleEditUser(item.userId)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Admin_User_Table;
