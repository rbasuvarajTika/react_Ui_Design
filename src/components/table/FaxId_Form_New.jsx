import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DuplicateContext } from '../../context/DuplicateContext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import fax from "../../assets/pdf/fax.pdf"
import jsPDF from 'jspdf';

import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Loader from '../Loader';
import axiosBaseURL from '../axios';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import DownloadIcon from '@mui/icons-material/Download';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { useParams } from 'react-router-dom';
import Header_Navigation from '../header/Header_Navigation';
import Background from '../Background';
import SaveIcon from '@mui/icons-material/Save';
import CallSplitIcon from '@mui/icons-material/CallSplit';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FaxId_Form_New = ({ }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [faxdata, setFaxData] = useState("")
  const [pdfData, setPdfData] = useState(null);
  const [isloading, setIsLoading] = useState(false)
  const [scalePopUp, setScalePopoup] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [splitPage, setSplitPage] = useState('');
  const [fromPage, setFromPage] = useState('');
  const [selectedSplitOption, setSelectedSplitOption] = useState('');

  const [toPage, setToPage] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  const { faxId } = useParams();
console.log("start",faxId);
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
    const fetchPdf =  () => {
      setIsLoading(true)
      axiosBaseURL({
        method: 'GET',
        url: `/api/v1/fax/getFaxPdf/${faxId}`,
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
  setSelectedSplitOption(''); // Reset selected option
  setSplitPage('');
  setFromPage('');
  setToPage('');
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'splitPage') {
    setSplitPage(value);
  } 
};

const handleSplitPDfPageClick = () => {
  if (selectedPages.length > 0) {
    const selectedPagesString = selectedPages.join(',');
    axiosBaseURL
      .post(`/api/v1/fax/splitByPdfPages/${faxId}`,{ pages: selectedPagesString } )
      .then((response) => {
        console.log('Split PDF Successfully:', response.data);
        if (response.data.message === 'Successfully ') {
          toast.success('PDF Splitted Successfully');
          setShowInputBoxes(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setShowInputBoxes(false);
        console.error('Split PDF Error:', error);
      });
  } else {
    toast.error('Please select at least one page before splitting.');
  }
}

 const handleSplitPDfRangeClick = () => {
  // const token = localStorage.getItem('tokenTika');
     axiosBaseURL
       .get(`/api/v1/fax/splitPdfByRange/${faxId}/${fromPage}/${toPage}`, {
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

 const handleSaveSplit = () => {
  if (selectedSplitOption === 'pages') {
    handleSplitPDfPageClick();
  } else if (selectedSplitOption === 'range') {
    handleSplitPDfRangeClick();
  }
  setShowInputBoxes(false);
};

 //console.log(sendFaxId);
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

  // Create a copy of the current selected pages array
  const updatedSelectedPages = [...selectedPages];

  // Check if the clicked page is already selected
  const isPageSelected = updatedSelectedPages.includes(pageIndex + 1);

  // Toggle the selected state of the clicked page
  if (isPageSelected) {
    // Page is already selected, so remove it
    const index = updatedSelectedPages.indexOf(pageIndex + 1);
    updatedSelectedPages.splice(index, 1);
  } else {
    // Page is not selected, so add it
    updatedSelectedPages.push(pageIndex + 1);
  }

  // Update the state with the new array of selected pages
  setSelectedPages(updatedSelectedPages);

  // If you want to update the input fields, you can use the following code:
  const selectedPagesString = updatedSelectedPages.join(',');
  setSplitPage(selectedPagesString);
};

const splitButtonStyle = {
    position: 'absolute',
    top: '20px', /* Adjust the top value based on your layout */
    right: '-110px', /* Adjust the right value based on your layout */
    zIndex: 50, /* Ensure it's above other content */
    padding: '8px 16px',
    backgroundColor: '#00ab06',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
  };

  const inputBoxesStyle = {
    position: 'absolute',
    top: '0', // Adjust the top value as needed
    left: '0', // Adjust the left value as needed
    right: '0', // Adjust the right value as needed
    margin: 'auto', // Center the input boxes
    zIndex: '50',
  };
  
  const saveButtonStyle = {
    position: 'absolute',
    right: '0',
    backgroundColor: '#00ab06',
    padding: '8px 16px',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
  };
  const downloadPdf = () => {
    
      axiosBaseURL({
        method: 'GET',
        url: `/api/v1/fax/download-fax-pdf/${faxId}`, // Replace with your API endpoint for downloading the PDF
        responseType: 'blob',
        headers: {
          // Add headers if required
        },
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'fax.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading PDF:', error);
        });
    } 


    const handleSendFaxEmail = () => {
        // Replace 'your-email@example.com' with the actual email address
      
    
        // Make a POST request to send the fax PDF to the specified email address
        axiosBaseURL
          .post(`/api/v1/fax/faxRx/alertMail/${faxId}`, {
            
          })
          .then((response) => {
            // Handle success
            console.log('Fax PDF sent successfully:', response.data);
            toast.success('Fax PDF sent successfully');
          })
          .catch((error) => {
            // Handle error
            console.error('Error sending fax PDF:', error);
            toast.error('Error sending fax PDF. Please try again later.');
          });
      };
    
      const handleSave = () => {
        const doc = new jsPDF();
        const loadingTask = pdfjs.getDocument(pdfData);
        const pdfDataArray = []; // Array to store individual page data URLs
      
        loadingTask.promise.then((pdf) => {
          const numPages = pdf.numPages;
      
          for (let i = 1; i <= numPages; i++) {
            pdf.getPage(i).then((page) => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              const viewport = page.getViewport({ scale: 1, rotation: i === pageNumber ? rotate : 0 });
      
              canvas.width = viewport.width;
              canvas.height = viewport.height;
      
              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };
      
              page.render(renderContext).promise.then(() => {
                const dataURL = canvas.toDataURL();
                pdfDataArray.push(dataURL);
      
                if (pdfDataArray.length === numPages) {
                  // All pages have been processed, send the data to the server
                  sendPdfToServer(pdfDataArray);
                }
              });
            });
          }
        });
      };
      
      const sendPdfToServer = (pdfDataArray) => {
        // Convert the data URLs to binary data
        const binaryDataArray = pdfDataArray.map((dataURL) => {
          const byteCharacters = atob(dataURL.split(',')[1]);
          const byteNumbers = new Array(byteCharacters.length);
      
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
      
          return new Uint8Array(byteNumbers);
        });
      
        // Create FormData to send the Blobs to the server
        const formData = new FormData();
        binaryDataArray.forEach((binaryData, index) => {
          const blob = new Blob([binaryData], { type: 'application/pdf' });
          formData.append(`file_${index + 1}`, blob, `rotatedFax_page_${index + 1}.pdf`);
        });
      
        // Make a POST request to the server endpoint to store the PDF
        axios.post(`/api/v1/fax/uploadPdfToSftp/${faxId}`, formData)
          .then((response) => {
            console.log('PDF sent to server successfully:', response.data);
            // Optionally, you can handle success here
          })
          .catch((error) => {
            console.error('Error sending PDF to server:', error);
            // Optionally, you can handle errors here
          });
      };
      


  return (
   
    <div className="fixed top-10 lg:left-48 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto">
   
    <div className="relative bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300 h-[calc(100vh-5rem)] w-full max-w-2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">      <div className="flex h-full">
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
        <div className="w-4/5 overflow-hidden">
  <div className="text-black overflow-hidden overflow-x-scroll overflow-y-scroll h-screen max-h-[75vh]">
    {!isloading ? (
      <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          scale={scalePopUp}
          width={400}
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
        {/* <span className="flex flex-col gap-2">
        <div style={splitButtonStyle} onClick={handleSplitClick}>Split</div>
                                        </span> */}

  {showInputBoxes && (
    <div style={{ position: 'absolute', bottom:'350px', left: '700px', right: '0', margin: 'auto' }}>
      <select
        className="bg-[#f2f2f2] border border-gray-300 xl:w-[120px] text-black py-0.5 text-xs t-1"
        value={selectedSplitOption}
        onChange={(e) => {
          console.log('Selected value:', e.target.value);
          setSelectedSplitOption(e.target.value);
        }}
      >
        <option value="">Select Option</option>
        <option value="pages">Split by Pages</option>
        <option value="range">Split by Range</option>
      </select>

      {selectedSplitOption === 'pages' && (
        <input
          className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
          type="text"
          name="splitPage"
          value={splitPage}
          onChange={handleInputChange}
          placeholder="Split Page"
        />
      )}

      {selectedSplitOption === 'range' && (
        <>
          <input
            className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
            type="text"
            name="fromPage"
            value={fromPage}
            onChange={(e) => setFromPage(e.target.value)}
            placeholder="From Page"
          />
          <input
            className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
            type="text"
            name="toPage"
            value={toPage}
            onChange={(e) => setToPage(e.target.value)}
            placeholder="To Page"
          />
        </>
      )}

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <div
          className="sm:w-20 csm:w-32 vsm:w-20 w-18 bg-[#00ab06] flex justify-center md:text-sm text-xs cursor-pointer"
          onClick={handleSaveSplit}
        >
          Save
        </div>
      </div>
    </div>
  )}

        <div className='flex flex-col gap-2 absolute top-1/4 md:right-4 right-2'>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleSplitClick} > <CallSplitIcon  className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleSave} > <SaveIcon  className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleRotate}> <ThreeSixtyIcon className='md:text-base text-xs' /></div>

        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleSendFaxEmail}> <AttachEmailIcon className='md:text-base text-xs' /></div>

        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer 'onClick={downloadPdf}> <DownloadIcon className='md:text-base text-xs' /></div>

        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleZoomIn}> <ZoomInIcon className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleZoomOut}> <ZoomOutIcon className='md:text-base text-xs' /></div>
        </div>

      
        <ToastContainer />
      </div>
    </div >
  )
}

export default FaxId_Form_New