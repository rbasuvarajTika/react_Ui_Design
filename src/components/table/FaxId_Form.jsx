import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DuplicateContext } from '../../context/DuplicateContext';

import fax from "../../assets/pdf/fax.pdf"

import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Loader from '../Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FaxId_Form = ({ close_Form }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [faxdata, setFaxData] = useState("")
  const [pdfData, setPdfData] = useState(null);
  const [isloading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } = useContext(DuplicateContext)

  const handleOpen_Duplicate = () => {
    setOpenDuplicate(true)
    setShoeForms(false)
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const previousPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  }

  const nextPage = () => {
    setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
  }

  // useEffect(() => {
  //   try {
  //     axios.get("https://dev.tika.mobi:8443/next-service/api/v1/fax/getFaxPdf/1509414370", {
  //       headers: { "Content-Type": "application/pdf" }
  //     })

  //       .then((res) => {
  //         const file = new Blob(
  //           [res.data],
  //           { type: 'application/pdf' });
  //         const fileURL = URL.createObjectURL(file);

  //         setFaxData(fileURL)

  //         console.log(res.data);

  //       })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [])


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
    <div className="fixed top-10 lg:left-48 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto ">
      <div className="relative  bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300  h-[calc(100vh-5rem)] w-full max-w-2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">
        <div className=' border-2 border-black h-[calc(100%-10px)]   overflow-hidden overflow-y-scroll overflow-x-scroll no-scrollbar'>
          <div className='text-blac sm:flex justify-center items-center  '>

            {
              !isloading ?
                <>
                  <Document className=" "
                 
                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber}
                      width={500} 
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
        <div className='relative'>
          <p className='text-[#717171] text-sm absolute top-2'>{pageNumber} of {numPages}</p>
        </div>

        <div className='flex justify-center gap-2 mt-1'>
        <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber <=1 ? "bg-[#d9e0e3]": "bg-[#00aee6]" }`} onClick={previousPage}> <FaArrowLeft /></div>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber === numPages ? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage}> <FaArrowRight /></div>
        </div>

        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
          <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer'
          // onClick={handleOpen_Duplicate} 
          > <LuPlus /></div>
          <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus /></div>
        </div>

        <div className='text-blue-400 text-2xl absolute top-2 right-2 cursor-pointer' onClick={close_Form}>
          <AiFillCloseCircle />
        </div>

      </div>
    </div >
  )
}

export default FaxId_Form