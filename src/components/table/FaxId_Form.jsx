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
  const [thumbnails, setThumbnails] = useState([]);

  const navigate = useNavigate();
  const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } = useContext(DuplicateContext)

  const handleOpen_Duplicate = () => {
    setOpenDuplicate(true)
    setShoeForms(false)
  }



  const previousPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  }

  const nextPage = () => {
    setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
  }
 
  // useEffect(() => {
  //   try {
  //     axios.get("https://demo.tika.mobi:8443/next-service/api/v1/fax/getFaxPdf/1509414370", {
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




 const generateThumbnails = async (numPages) => {
  if (pdfData) {
    const thumbArray = [];
    const loadingTask = pdfjs.getDocument(pdfData);
    const pdf = await loadingTask.promise;

    for (let i = 1; i <= numPages; i++) {
      const pdfPage = await pdf.getPage(i);
      const thumb = await generateThumbnail(pdfPage);
      thumbArray.push(thumb);
    }

    setThumbnails(thumbArray);
  }
};

const generateThumbnail = async (pdfPage) => {
  const scale = 0.2; // Adjust this scale as needed
  const viewport = pdfPage.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await pdfPage.render({
    canvasContext: context,
    viewport,
  }).promise;

  return canvas.toDataURL('image/png');
};

const onDocumentLoadSuccess = ({ numPages }) => {
  setNumPages(numPages);
  generateThumbnails(numPages);
};

const handleThumbnailClick = (pageIndex) => {
  setPageNumber(pageIndex + 1);
};


  return (
    <div className="fixed top-0 lg:left-80 -left-0 right-30 z-100 w-full p-4 overflow-x-hidden overflow-y-auto ">
    <ToastContainer />
    <div className="relative bg-[#ffffff]  rounded-2xl shadow-md shadow-gray-900 h-[calc(100vh-5rem)] w-full max-w-2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">
      <div className="flex h-full">
        {/* Left section for thumbnails */}
        <div className="w-1/5 border mr-4 overflow-y-auto">
          <div className="thumbnails-container">
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Page ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Right section for the document */}
        <div className="w-100 overflow-hidden">
  <div className="text-black overflow-hidden overflow-x-scroll overflow-y-scroll h-screen max-w-[80vh] max-h-[80vh]">
    {!isloading ? (
      <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          scale={scalePopUp}
          width={600}
          height={200}
          rotate={rotate}
        />
      </Document>
    ) : (
      <div className="w-full flex justify-center items-center mt-32">
        <Loader />
      </div>
    )}
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