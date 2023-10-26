import { useContext, useEffect, useState } from "react";
import { data } from "../../Data/Data";
import Pagination from "../Pagination";
import FaxId_Form from "./FaxId_Form";
import { IoMdArrowDropdown } from "react-icons/io";
import { DuplicateContext } from "../../context/DuplicateContext";
import Duplicate_Fax from "../fax/Duplicate_Fax";
import { ToastContainer, toast } from 'react-toast'
import axios from "axios";
import fax from "../../assets/pdf/fax.pdf"
import { MdOutlineArrowDropDown } from "react-icons/md";




const TableList = ({ }) => {
    const [currentpage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(14)
    const [showForm, setShoeForm] = useState(false)
    const [search, setSearch] = useState("")
    const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } = useContext(DuplicateContext)
    const [faxData, setFaxData] = useState([])
    const [sendFaxId, setSendFaxId] =useState(null)
    const[sendDate, setSendDate] = useState(null)
    const[sendFaxNumber, setSendFaxNumber]=useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedOcrStatus, setSelectedOcrStatus] = useState(''); // State for selected ocrStatus






    const lastPostIndex = currentpage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = faxData.slice(firstPostIndex, lastPostIndex);
    const npage = Math.ceil(faxData.length / postsPerPage);
    
    const open_form = ({ showForm }) => {
        setShoeForms(true)
        console.log(!showForm);
    }

    const close_Form = () => {
        setShoeForms(false)

        useEffect(() => {
            toast.error("Please enter password")
        }, [])
    }

    useEffect(() => {
        try {
            axios.get("https://dev.tika.mobi:8443/next-service/api/v1/fax/faxList", {
                headers: { "Content-Type": "application/json" }
            })
                .then((res) => {
                    // console.log(res?.data.data.data);
                    setFaxData(res?.data.data.data)
                    setSendDate(res?.data.data.data[0].faxDate)
                    setSendFaxNumber(res?.data.data.data[0].faxNumber)
                    console.log(sendDate);
                    console.log(sendFaxNumber);
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleFaxStatus = (status, faxId) => {
        
        setSendFaxId(faxId)
     
        if(status === "Duplicate"){
            setSendFaxId(faxId)
            
            setOpenDuplicate(true)
        console.log(!showForm);
        } else if(status === "Main"||"New"){
            setShoeForms(true)
            // setShoeForms(false)
        }
        
    }
    const handleOcrStatusChange = (event) => {
        setSelectedOcrStatus(event.target.value);
    };
    return (
        <>
            <ToastContainer />
            <div className="w-ful pt-5 relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
                {
                    !openDuplicate ?
                        <>
                            <div className="w-full h-ful flex justify-between items-center p-2 ">
                                <div className="flex gap-5">
                                    <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                    OCR Status:
                                        <div className=' flex  justify-start  flex-col w-full  relative'>
                                                <label className='text-xs text-black w-full text-start' htmlFor=""> </label>
                                                <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300w-56 text-black py-0.5 text-xs t-1' 
                                            type="text" 
                                                
                                               value={selectedOcrStatus}
                                                onChange={handleOcrStatusChange}
                                               
                                                                >
                                         
                                        <option></option>
                                        <option value="All Status">All Status</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Incomplete ">Incomplete</option>
                                        
                                        </select>
                                        
                                        </div>
                                    </span>

                                    
                                </div>
                                <div className="flex items-center gap-10 ">
                                    <div>
                                        <input type="search"
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="border  px-4 shadow-lg rounded-md py-2 placeholder:text-black text-gray-500"
                                            placeholder="Search Fax ID.." />
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
                                            <th className="px-6 py-3">Fax Date</th>
                                            <th className="px-6 py-3">Fax Time</th>
                                            <th className="px-6 py-3 ">Sender Fax #</th>
                                            <th className="px-6 py-3 ">OCR Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPosts.filter((item) => {
                                          const matchesSearch = search === "" || item.faxId.includes(search);
                                         if (selectedOcrStatus === "All Status") {
                                         return matchesSearch;
                                         } else {
                                           const matchesOcrStatus =
                                             selectedOcrStatus === "" || item.ocrStatus === selectedOcrStatus;
                                             return matchesSearch && matchesOcrStatus;
                                          }
                                        }).map((item, index) => (
                                            <tr
                                                key={index}
                                                className={`${index % 2 === 0 ? "" : "bg-[#f6f6f6] "
                                                    } bg-white text-black/70 text-xs`}
                                            >
                                                <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                                                    <div className="cursor-pointer" 
                                                   onClick={() => handleFaxStatus(item.faxStatus, item.faxId)}
                                                    >
                                                        {item.faxId}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{item.caseId}</td>
                                                <td className="px-6 py-4 cursor-pointer" >{item.faxStatus}</td>
                                                <td className="px-6 py-4">{item.Verified}</td>
                                                <td className="px-6 py-4">{item.dupeFaxId}</td>
                                                <td className="px-6 py-4">{item.faxDate}</td>
                                                <td className="px-6 py-4">{item.Fax_Time}</td>
                                                <td className="px-6 py-4">{item.faxNumber}</td>
                                                <td className="px-6 py-4">{item.ocrStatus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </> :
                        <Duplicate_Fax sendFaxId={sendFaxId} sendDate={sendDate} sendFaxNumber={sendFaxNumber}/>
                }


                {
                    showForms && <FaxId_Form close_Form={close_Form} setShoeForm={setShoeForm} sendFaxId={sendFaxId}/>
                }

                {/* {
                    openDuplicate && <Duplicate_Fax />
                } */}



            </div>
        </>
    );
};

export default TableList;