import { useContext, useState } from "react";
import { data } from "../../Data/Data";
import Pagination from "../Pagination";
import FaxId_Form from "./FaxId_Form";
import { IoMdArrowDropdown } from "react-icons/io";
import { DuplicateContext } from "../../context/DuplicateContext";
import Duplicate_Fax from "../fax/Duplicate_Fax";

const TableList = ({   }) => {
    const [currentpage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(14)
    const [showForm, setShoeForm] = useState(false)
    const [search, setSearch] = useState("")
    const {setOpenDuplicate, openDuplicate, showForms, setShoeForms} = useContext(DuplicateContext) 


    const lastPostIndex = currentpage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    const npage = Math.ceil(data.length / postsPerPage)

    const open_form = ({showForm}) => {
        setShoeForms(true)
        console.log(!showForm);
    }

    const close_Form = () => {
        setShoeForms(false)
    }


    return (
        <>
            <div className="w-ful pt-5 relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar"> 
                {
                    !openDuplicate ?
                <>
                <div className="w-full h-ful flex justify-between items-center p-2 ">
                    <div className="flex gap-5">
                        <span className="hidden md:flex items-center gap-1 z-50 text-black  relative">
                            OCR Status:
                            <input
                                type="search"
                                // onChange={(e) => setSearch(e.target.value)}
                                className="w rounded-full outline-none px-2 py-1.5 text-black border border-black "
                            />
                            <div className="absolute right-2">
                                <IoMdArrowDropdown size={20} />
                            </div>
                        </span>
                        <div>
                            <span>
                                 <input type="search" 
                                   onChange={(e) => setSearch(e.target.value)}
                                 className="border  px-4 shadow-lg rounded-md py-2 placeholder:text-black text-gray-500"
                                  placeholder="search here.."  />
                            </span>
                           
                        </div>
                    </div>

                    <Pagination
                        totalPosts={data.length}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentpage}
                        lastPostIndex={lastPostIndex}
                        npage={npage}
                    />

                </div>
                <div>

                </div>
                <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[600px]  h-[500px]   no-scrollbar ">
                    <table className="w-full text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-sm text-[#2b5b7a] font-bold bg-[#a3d3ffa4] rounded-2xl ">
                                <th className="px-6 py-3 ">Fax ID</th>
                                <th className="px-6 py-3">Case ID</th>
                                <th className="px-6 py-3">Fax Status</th>
                                <th className="px-6 py-3">Verified</th>
                                <th className="px-6 py-3">Main Fax ID</th>
                                <th className="px-6 py-3">fax Date</th>
                                <th className="px-6 py-3">Fax Time</th>
                                <th className="px-6 py-3 ">Sender Fax #</th>
                                <th className="px-6 py-3 ">OCR Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.filter((item) => {
                                return search === "" ? item :
                                    item.Case_ID.includes(search)
                            }).map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "" : "bg-[#f8f8f8]  "
                                        } bg-white text-black/70 text-xs`}
                                >
                                    <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                                        <div className="cursor-pointer" onClick={open_form}>
                                            {item.Fax_ID}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.Case_ID}</td>
                                    <td className="px-6 py-4">{item.Fax_Status}</td>
                                    <td className="px-6 py-4">{item.Verified}</td>
                                    <td className="px-6 py-4">{item.Main_Fax_ID}</td>
                                    <td className="px-6 py-4">{item.fax_Date}</td>
                                    <td className="px-6 py-4">{item.Fax_Time}</td>
                                    <td className="px-6 py-4">{item.Sender_Fax}</td>
                                    <td className="px-6 py-4">{item.OCR_Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </> : 
                 <Duplicate_Fax />
                }


                {
                     showForms && <FaxId_Form close_Form={close_Form} setShoeForm={setShoeForm} />
                }

                {/* {
                    openDuplicate && <Duplicate_Fax />
                } */}

 

            </div>
 
        </>
    );
};

export default TableList;