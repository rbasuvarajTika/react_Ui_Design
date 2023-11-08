import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DuplicateContext } from '../../context/DuplicateContext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import fax from "../../assets/pdf/fax.pdf"

import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Loader from '../Loader';
import axiosBaseURL from '../axios';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FaxId_Form = ({ close_Form, sendFaxId }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [faxdata, setFaxData] = useState("")
  const [pdfData, setPdfData] = useState(null);
  const [isloading, setIsLoading] = useState(false)
  const [scalePopUp, setScalePopoup] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [fromPage, setFromPage] = useState('');
  const [toPage, setToPage] = useState('');

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
      axiosBaseURL({
        method: 'GET',
        url: `/api/v1/fax/getFaxPdf/${sendFaxId}`,
        responseType: 'arraybuffer',
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setIsLoading(false)
          setPdfData(url);
        })
        .catch((error) => {
          //setError('Error fetching main PDF. Please try again later.');
          console.error('Error fetching main PDF:', error);
        });
    };

    fetchPdf();
  }, []);


  const handleZoomOut = () => {
    console.log("clicked");
    setScalePopoup(scalePopUp - 0.2);
}

const handleZoomIn = () => {
  console.log("clicked");
  setScalePopoup(scalePopUp + 0.2);
}

const handleRotate = () => {
  console.log("Rotate");
  setRotate(rotate + 90);
  if(rotate === 270){
    setRotate(0);
  }
}

const handleSplitClick = () => {
  setShowInputBoxes(true);
  setFromPage("");
  setToPage("");
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'fromPage') {
    setFromPage(value);
  } else if (name === 'toPage') {
    setToPage(value);
  }
};


const handleSplitPDfRangeClick = () => {
  // const token = localStorage.getItem('tokenTika');
     axiosBaseURL
       .get(`/api/v1/fax/splitPdfByRange/${sendFaxId}/${fromPage}/${toPage}`, {
         // headers: {
         //   Authorization: `Bearer ${token}`,
         // },
       })
       .then((response) => {
         // Handle success
         console.log('Split PDF Successfully:', response.data);
         if(response.data.message == 'Successfully '){
          toast.success("PDF Splitted Sucessfully")
          setShowInputBoxes(false);
         }else{
          toast.error(response.data.message)
         }
         // You may want to update the state or perform other actions on success.
       })
       .catch((error) => {
         // Handle error
         setShowInputBoxes(false);
         console.error('Keep Duplicate Error:', error);
         // You can set an error state or show an error message to the user.
       });
  
 };

  return (
    <div className="fixed top-10 lg:left-48 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto ">
      <ToastContainer />
      <div className="relative  bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300  h-[calc(100vh-5rem)] w-full max-w-2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">
        <div className='xl:w-[calc(100%-100px)] md:w-[calc(100%-150px)]  w-[calc(100%-70px)]   h-[calc(100%-100px)]  border mt-14 overflow-y-scroll absolute overflow-hidden no-scrollbar no-scrollbar  '>
          <div className=' w-full h-full  '>
          
            <div className='text-black overflow-hidden  overflow-x-scroll overflow-y-scroll h-screen'>
            {
              !isloading ?
                <>
                  <Document className=" "

                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} scale={scalePopUp}
                      width={500}
                      height={200}
                      rotate={rotate}
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
        <div className='relative'>
          <p className='text-[#717171] text-sm absolute top-2'>{pageNumber} of {numPages}</p>
        </div>
       
        <div className='flex justify-center gap-2 mt-1'>
          <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber <= 1 ? "bg-[#d9e0e3]" : "bg-[#00aee6]"}`} onClick={previousPage}> <FaArrowLeft /></div>
          <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber === numPages ? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage}> <FaArrowRight /></div>
        </div>
        <span className="flex flex-col gap-2 absolute top-10 md:right-1 right-2">
                                            <div className='sm:w-20 csm:w-32 vsm:w-20 w-18 py-1 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer' onClick={handleSplitClick}>Split</div>
                                        </span>
                                        {showInputBoxes && (
        <div style={{ position: 'relative', marginTop: '0px' }}>
          <input
            className='bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1'
            type="text"
            name="fromPage"
            value={fromPage}
            onChange={handleInputChange}
            placeholder="From Page"
          />
          <input
            className='bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1'
            type="text"
            name="toPage"
            value={toPage}
            onChange={handleInputChange}
            placeholder="To Page"
          />
          <div style={{ position: 'absolute', marginTop: '-20px', right: '280px' }}>
            <div className='sm:w-20 csm:w-32 vsm:w-20 w-18 bg-[#00ab06] flex justify-center md:text-sm text-xs cursor-pointer' onClick={handleSplitPDfRangeClick}>
              Save
            </div>
          </div>
        </div>
      )}
        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleZoomIn}> <ZoomInIcon className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleZoomOut}> <ZoomOutIcon className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleRotate}> <ThreeSixtyIcon className='md:text-base text-xs' /></div>
        </div>

        <div className='text-blue-400 text-2xl absolute top-2 right-2 cursor-pointer' onClick={close_Form}>
          <AiFillCloseCircle />
        </div>

      </div>
    </div >
  )
}

export default FaxId_Form