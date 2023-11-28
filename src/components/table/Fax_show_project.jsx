import React, { useEffect, useState } from 'react'
import { BiSolidImageAlt } from 'react-icons/bi';
import { HiDocumentText } from 'react-icons/hi';
import { IoMdDownload, IoMdTime } from 'react-icons/io';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight
} from "react-icons/md"
import { IoCloseOutline, IoGridOutline, IoPrint } from "react-icons/io5";
import { LuPenTool } from "react-icons/lu";
import { GrSend } from "react-icons/gr";
import { AiOutlineSend } from 'react-icons/ai';
import { FaPenNib, FaSquareFull, FaStamp } from 'react-icons/fa';
import { PiEraserFill } from "react-icons/pi";
import { HiMiniPencil } from "react-icons/hi2";



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Fax_show_project = () => {
    const [pdfData, setPdfData] = useState(null);
    const [isloading, setIsLoading] = useState(false)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);
    const [selectedPageContent, setSelectedPageContent] = useState(null);
    const [showModal, setShowModal] = React.useState(false);



    useEffect(() => {
        const fetchPdf = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    "https://dev.tika.mobi:8443/next-service/api/v1/fax/getFaxPdf/1509414370",
                    { responseType: 'arraybuffer' }
                );
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                setIsLoading(false)
                setPdfData(url);

            } catch (error) {
                console.error("Error fetching PDF:", error);
            }
        };
        fetchPdf();

    }, []);

    useEffect(() => {
        const fetchPageContent = async () => {
            // Fetch the content of the selected page and update the state
            if (selectedPage !== null) {
                const pageContentResponse = await axios.get(
                    `https://dev.tika.mobi:8443/next-service/api/v1/fax/getFaxPdf/1509414370`,
                    { responseType: 'arraybuffer' }
                );
                console.log("pageContentResponse", pageContentResponse);
                setSelectedPageContent(pageContentResponse.data);
            }
        };

        fetchPageContent();
    }, [selectedPage]);


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handlePageClick = (pageNumber) => {
        console.log(`Clicked on page ${pageNumber}`);
        setSelectedPage(pageNumber);
        setShowModal(true)
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            const isClicked = i === selectedPage;
            pages.push(
                <div
                    key={i}
                    className={`relative cursor-pointer ${isClicked ? 'border border-blue-500' : 'border border-e1e1e1'
                        }`}
                    onClick={() => handlePageClick(i)}
                >
                    <Page
                        pageNumber={i}
                        width={100}
                        height={100}
                        className="responsive-pdf-container"
                    />
                    <div className='absolute bottom-0 right-0 bg-[#596073] h-3 text-white w-3 flex items-center justify-center text-[10px]'>{i}</div>
                </div>
            );
        }
        return pages;
    };

    return (
        <>




        
                <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[calc(100vh-4rem)] md:h[650px]  h[500px]   no-scrollbar ">
                    <div className='flex w-full  h-'>
                        {/*  */}
                        <div className='w-[100%] slg:w-[27%] '>
                            <section className='   border-b  bg-red500 h-[calc(100vh-8rem)] overflow-hidden'>
                                <div className='flex justify-between border border-b-2  w-full  '>
                                    <div className='h-16 w-full bg-[#f5f5f5] hover:bg-[#f5f5f5] flex flex-col pt-2 items-center cursor-pointer'>
                                        <BiSolidImageAlt className='text-[#4c5666]' size={20} />
                                        <p className=' text-sm text-[#4c5666]'>Thumbnails</p>
                                    </div>
                                    <div className='h-16 w-full bg-[#e1e1e1] hover:bg-[#f5f5f5] flex flex-col pt-2 items-center cursor-pointer'>
                                        <HiDocumentText className='text-[#4c5666]' size={20} />
                                        <p className=' text-sm text-[#4c5666]'>Document Details</p>
                                    </div>
                                    <div className='h-16 w-full bg-[#e1e1e1] hover:bg-[#f5f5f5] flex flex-col pt-2 items-center cursor-pointer'>
                                        <IoMdTime className='text-[#4c5666]' size={20} />
                                        <p className=' text-sm text-[#4c5666]'>Timeline</p>
                                    </div>
                                </div>
                                <div className='bg-[#ffffff] h-[calc(100%-4.1rem)] w-full border-b overflow-hidden'>
                                    <div className=' p-6'>
                                        <Document
                                            className={""}
                                            file={pdfData}
                                            onLoadSuccess={onDocumentLoadSuccess}>
                                            <div className=' flex gap-5 flex-wrap  '>
                                                {renderPages()}
                                            </div>
                                        </Document>
                                    </div>
                                </div>

                            </section>
                            <p className='p-3'>{numPages} Pages</p>
                        </div>


                        {/*  */}
                        <div className='w-[63%] relative slg:block hidden '>
                            <section className='bg-green500 hfull  bg-gray-200 pl-6 pt-6   h-[calc(100vh-8rem)] overflow-hidden overflow-y-scroll border-b no-scrollbar  '>
                                <div>
                                    <div className=' w-full bg-[#ffffff] overflow-hidden   flex flex-col pt-2 items-center cursor-pointer h-[576px '>

                                        {/* {renderFaxDetails()} */}
                                        <Document

                                            file={pdfData}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                        >
                                            <Page pageNumber={selectedPage}
                                                width={700}
                                                height={700}
                                                className="responsive-pdf-container "
                                            />
                                        </Document>
                                    </div>
                                </div>

                            </section>
                            <div className='p-2 text-[#596073]  absolute left-1/2 flex items-center gap-2.5'>
                                <MdOutlineKeyboardDoubleArrowLeft />
                                <MdOutlineKeyboardArrowLeft />
                                <p className='text-sm'>
                                    {selectedPage}
                                </p>
                                <MdOutlineKeyboardArrowRight />
                                <MdOutlineKeyboardDoubleArrowRight />
                            </div>
                        </div>

                        {/* edit tools */}
                        <div className='2xl:w-[12%] xl:w-[13%] w-[19%] overflow-hidden h-[calc(100vh-4rem)] overflow-y-scroll lg:block hidden'>
                            <div className='w-[10% bg-[#4d4d4d] overflow-hidde'>
                                <div className='flex'>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <LuPenTool />
                                        <p className='text-xs'>Shapes</p>
                                    </div>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <AiOutlineSend />

                                        <p className='text-xs'>Send</p>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-lg '>
                                        <FaSquareFull />
                                        <p className='text-xs'>Redact</p>
                                    </div>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl  '>
                                        <div className='w-6 h-[2px] bg-white -rotate-45 my-2'></div>
                                        <p className='text-xs'>Tools</p>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <PiEraserFill />
                                        <p className='text-xs'>Erase</p>
                                    </div>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <IoGridOutline className='text-white/50' />
                                        <p className='text-xs'>Edit Document</p>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <LuPenTool />
                                        <p className='text-xs'>Annotate</p>
                                    </div>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-lg '>
                                        <FaPenNib />
                                        <p className='text-xs'>Signature</p>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <HiMiniPencil />

                                        <p className='text-xs'>Highlight</p>
                                    </div>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <IoMdDownload />
                                        <p className='text-xs'>Downlaod</p>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <FaStamp />
                                        <p className='text-xs'>Watermark</p>
                                    </div>
                                    <div className='hover:bg-[#3c558d] duration-150 cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        <IoPrint />
                                        <p className='text-xs'>Print</p>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='cursor-pointer w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        {/* <LuPenTool />
                                        <p className='text-xs'>Shapes</p> */}
                                    </div>
                                    <div className=' w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        {/* <LuPenTool />
                                        <p className='text-xs'>Shapes</p> */}
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className=' w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        {/* <LuPenTool />
                                        <p className='text-xs'>Shapes</p> */}
                                    </div>
                                    <div className=' w-full h-[100px] border flex gap-3 flex-col justify-center items-center text-white text-xl '>
                                        {/* <LuPenTool />
                                        <p className='text-xs'>Shapes</p> */}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            

            {showModal ? (
                <div className='hidden'>
                    {/* <span>< IoCloseOutline /></span> */}
                    <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-end  justify-end  p-5 border-b border-solid  rounded-t">
                                    <span
                                        onClick={() => setShowModal(false)}
                                        className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        <IoCloseOutline />
                                    </span>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto responsive-pdf-container ">
                                    <Document

                                        file={pdfData}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                    >
                                        <div className=''>
                                            <Page pageNumber={selectedPage}
                                                // width={400}
                                                // height={400}
                                                className="responsive-pdf-container "

                                            />
                                        </div>
                                    </Document>
                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                    </div>
                </div>


            ) : (
                <></>

            )}


        </>
    )
}

export default Fax_show_project