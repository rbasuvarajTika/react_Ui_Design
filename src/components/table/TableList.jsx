import { useState } from "react";
import { data } from "../../Data/Data";
import Pagination from "../Pagination";
import FaxId_Form from "./FaxId_Form";

const TableList = ({ search }) => {
    const [currentpage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(14)
    const [showForm, setShoeForm] = useState(false)


    const lastPostIndex = currentpage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    const npage = Math.ceil(data.length / postsPerPage)

    const open_form = () => {
        setShoeForm(true)

        console.log(!showForm);
    }

    const close_Form =() => {
        setShoeForm(false)
    }


    return (
        <>
        
            {/* <div className="z-50">
                {
                    showForm&&  <FaxId_Form />
                }
                 
            </div> */}
               
            
            <div className="w-ful pt-5 relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-40rem) no-scrollbar">
                <div className="w-full h-full flex justify-end items-center p-2 ">
                    <Pagination
                        totalPosts={data.length}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentpage}
                        lastPostIndex={lastPostIndex}
                        npage={npage}
                    />
                </div>
                <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[600px]  h-[500px]   no-scrollbar ">
                    <table className="w-full text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-sm text-[#2b5b7a] font-bold bg-[#a3d3ffa4] rounded-2xl">
                                <th className="px-6 py-3">Fax ID</th>
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
                                    className={`${index % 2 === 0 ? "" : "bg-[#e2e2e2]"
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
                {
                    showForm &&   <FaxId_Form  close_Form={close_Form} setShoeForm={setShoeForm} />
                }
             
            </div>
        </>
    );
};

export default TableList;