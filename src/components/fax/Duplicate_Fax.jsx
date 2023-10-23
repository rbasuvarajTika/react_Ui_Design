import React, { useEffect, useState } from 'react'
import Table from '../table/Table'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { Document, Page, pdfjs } from 'react-pdf';
import fax from "../../assets/pdf/fax.pdf"
import axios from 'axios';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Loader from '../Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Duplicate_Fax = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages2, setNumPages2] = useState(null);
    const [pageNumber2, setPageNumber2] = useState(1);
    const [pdfData, setPdfData] = useState(null);
    const [isloading, setIsLoading] = useState(false)



    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setNumPages2(numPages);
    }

    const previousPage = () => {
        setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
    }

    const nextPage = () => {
        setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
    }


    // const onDocumentLoadSuccess = ({ numPages2 }) => {
    //     setNumPages2(numPages2);
    // }

    const previousPage2 = () => {
        setPageNumber2(pageNumber2 <= 1 ? 1 : pageNumber2 - 1);
    }

    const nextPage2 = () => {
        setPageNumber2(pageNumber2 >= numPages2 ? pageNumber2 : pageNumber2 + 1);
    }

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

    return (
        <div className="w-ful  relative  overflow-x-auto rounded-xl lg:px-8 md:px-4   overflow-y-scroll  lg:h-[640px] h-full no-scrollbar ">
            <div className="w-full  h-full flex lg:flex-row flex-col justify-between items-center  gap-10 overflow-hidden overflow-y-scroll no-scrollbar">

                <div className='w-full h-full flex flex-col gap-3  '>
                    <div className='bg-[#c7dee6] max-w-[685px]  h-10 rounded-3xl md:mx-8 mx-1 px-5 flex items-center justify-around'>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Fax ID: <span className='text-[#276a8c] md:text-sm text-[10px]'>1030A3</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Fax # <span className='text-[#276a8c] md:text-sm text-[10px]'>(717) 550-1675</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Date: <span className='text-[#276a8c] md:text-sm text-[10px]'>5/9/2023</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Time: <span className='text-[] md:text-sm text-[10px]'>12:40</span></p>
                    </div>
                    <div className='text-white  w-full lg:h-[calc(100%-1rem)] h-screen  bg-[#ffff] border-2 shadow-2xl rounded-xl relative flex justify-center pt-10'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                        <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber <=1 ? "bg-[#d9e0e3]": "bg-[#00aee6]" }`} onClick={previousPage}> <FaArrowLeft /></div>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber === numPages ? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage}> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer '> <LuPlus className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus className='md:text-base text-xs' /></div>
                        </div>

                        <div className='xl:w-[calc(100%-250px)] md:w-[calc(100%-150px)]  w-[calc(100%-70px)]  h-[calc(100%-100px)] border overflow-y-scroll absolute overflow-hidden no-scrollbar  '>
                            <div className=' w-full h-full '>
                                <div className='text-black overflow-hidden overflow-x-scroll overflow-y-scroll no-scrollbar  '>

                                    {
                                        !isloading ?
                                            <>
                                                    <Document 

                                                        file={pdfData}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                    >
                                                        <Page pageNumber={pageNumber}
                                                            width={400} height={500}
                                                            className="responsive-pdf-container "

                                                        />
                                                    </Document>
                                            </>
                                            :
                                            <>
                                                <div className='w-full flex justify-center items-center mt-32'>
                                                    <Loader />
                                                </div>

                                            </>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='absolute bottom-20 left-4'>
                            <p className='text-[#717171] text-sm absolute md:top-2 md:bottom-0 -bottom-10 w-20'>Page: {pageNumber}</p>
                        </div>

                        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                            <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                            <p className='absolute top-0 text-[#e36c09] text-sm'>Master Fax</p>
                        </div>
                    </div>
                </div>

                <div className='w-full h-full flex flex-col gap-3 '>
                    <div className='bg-[#c7dee6] max-w-[685px]  h-10 rounded-3xl md:mx-8 mx-1 px-5 flex items-center justify-around'>
                        <p className='text-[#1b4a68] text-sm font-semibold flex items-center'>Fax ID:
                            <span className='text-[#276a8c] sm:block hidden'>
                                <select className='w-24 rounded-2xl ml-2 py-1' name="" id=""></select>
                            </span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Fax # <span className='text-[#276a8c] md:text-sm text-[10px]'>(206) 342-8631</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Date: <span className='text-[#276a8c] md:text-sm text-[10px]'>5/9/2023</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Time: <span className='text-[] md:text-sm text-[10px]'>12:40</span></p>
                    </div>
                    <div className='text-white w-full lg:h-[calc(100%-1rem)] h-screen bg-[#ffff] shadow-2xl border-2  rounded-xl  relative  flex justify-center pt-10'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber2 <=1 ? "bg-[#d9e0e3]": "bg-[#00aee6]" }`} onClick={previousPage2}> <FaArrowLeft /></div>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber2 === numPages2 ? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage2}> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer '> <LuPlus className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus className='md:text-base text-xs' /></div>
                        </div>

                        <div className='xl:w-[calc(100%-250px)] md:w-[calc(100%-150px)]  w-[calc(100%-70px)]   h-[calc(100%-100px)] border overflow-y-scroll absolute overflow-hidden no-scrollbar no-scrollbar  '>
                            <div className=' w-full h-full  '>
                                <div className='text-black overflow-hidden  no-scrollbar overflow-x-scroll overflow-y-scroll'>

                                    {
                                        !isloading ?
                                            <>

                                                <Document className=" "

                                                    file={pdfData}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={pageNumber2}
                                                        width={400}
                                                        height={200}

                                                    />
                                                </Document>
                                            </>
                                            :
                                            <>
                                                <div className='w-full flex justify-center items-center mt-32'>
                                                    <Loader />
                                                </div>

                                            </>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='absolute bottom-20 left-4'>
                            <p className='text-[#717171] text-sm absolute md:top-2 md:bottom-0 -bottom-10 w-20'>Page: {pageNumber2}</p>
                        </div>

                        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                            <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                            <p className='absolute top-0 text-[#e36c09] text-sm'>Duplicate Fax</p>
                        </div>

                        <div className='absolute bottom-2 flex  w-full justify-around'>
                            <div className=' xl:w-44 lg:w-32 md:w-24 sm:w-32 csm:w-32 vsm:w-20 w-20 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-xs text-[10px]'>Make Master</div>
                            <div className=' xl:w-44 lg:w-32 md:w-24 sm:w-32 csm:w-32 vsm:w-20 w-20 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-xs text-[10px]'>Keep Duplicate</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center pt-3'>
                <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#35ad41] rounded-lg flex justify-center md:text-sm text-xs'>Submit</div>
            </div>
        </div>
    )
}

export default Duplicate_Fax