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
import "../Background"
import SaveIcon from '@mui/icons-material/Save';
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
  const [rotatedPages, setRotatedPages] = useState([]);
  const [pageRotationData, setPageRotationData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [splitHistory, setSplitHistory] = useState([]);


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
    // Update the splitPage state
    setSplitPage(value);

    // Update the selectedPages state based on the entered page numbers
    const selectedPagesArray = value.split(',').map((page) => parseInt(page.trim(), 10));
    setSelectedPages(selectedPagesArray);
  } else if (name === 'fromPage') {
    setFromPage(value);
    // Update the splitPage state for range splitting
    setSplitPage(`${value}-${toPage}`);
  } else if (name === 'toPage') {
    setToPage(value);
    // Update the splitPage state for range splitting
    setSplitPage(`${fromPage}-${value}`);
  }
};

const handleSplitPDfPageClick = () => {
  console.log('Selected Option:', selectedOption);
  console.log('Selected Pages:', selectedPages);
  console.log('Split Page:', splitPage);

  const pagesToSplit = selectedOption === 'By Page' ? selectedPages : parsePageRange();

  console.log('Pages to Split:', pagesToSplit);

  if (pagesToSplit.length > 0) {
    const selectedPagesString = pagesToSplit.join(',');
    axiosBaseURL
      .post(`/api/v1/fax/sendPdfByPages`, { faxId ,pages: selectedPagesString })
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
};

const parsePageRange = () => {
  const pages = [];
  for (let i = parseInt(fromPage); i <= parseInt(toPage); i++) {
    pages.push(i);
  }
  return pages;
};

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
  if (selectedOption === 'By Page') {
    handleSplitPDfPageClick();
  } else if (selectedOption === 'By Range') {
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

  // Check if any pages are rotated and apply rotation
  rotatedPages.forEach(({ page, rotation }) => {
    const canvas = document.getElementById(`page-${page}`);
    if (canvas) {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((rotation * Math.PI) / 180);
      context.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
      context.restore();
    }
  });

  // Pass the rotation to the Page component
  const rotationForPage = pageRotationData[pageNumber] || 0;
  setRotate(rotationForPage);
};


const handleThumbnailClick = (pageIndex) => {
  setPageNumber(pageIndex + 1);

  // Create a copy of the current selected pages array
  const updatedSelectedPages = [...selectedPages];

  // Check if the clicked page is already selected
  const isPageSelected = updatedSelectedPages.includes(pageIndex + 1);

  if (isPageSelected) {
    const index = updatedSelectedPages.indexOf(pageIndex + 1);
    updatedSelectedPages.splice(index, 1);
  } else {
    updatedSelectedPages.push(pageIndex + 1);
  }

  // Filter out NaN values and keep only valid page numbers
  const filteredPages = updatedSelectedPages.filter(page => !isNaN(page));

  setSelectedPages(filteredPages);
  setSelectedThumbnail(pageIndex); // Update selected thumbnail index

  console.log('Updated Selected Pages:', filteredPages);

  setSplitPage(filteredPages.join(','));
};


const handleOptionClick = (option) => {
  setSelectedOption(option);
  setShowInputBoxes(true);
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
    
      
      const handleRotate = () => {
        const currentPage = pageNumber; // Get the current page number
      
        const newRotation = rotate + 90;
        const validRotation = newRotation % 360;
      
        // Update the local state with the new rotation information
        setRotatedPages((prevRotatedPages) => [
          ...prevRotatedPages,
          { page: currentPage, rotation: validRotation },
        ]);
      
        // Update the page rotation data state
        setPageRotationData((prevData) => ({
          ...prevData,
          [currentPage]: validRotation,
        }));
      
        // Update the rotate state with the valid rotation value
        setRotate(validRotation);
        // console.log('Rotated Pages:', rotatedPages);
        // console.log('Page Rotation Data:', pageRotationData);
      };
      useEffect(() => {
        // This will log the updated state after it's been processed
        console.log('Rotated Pages:', rotatedPages);
        console.log('Page Rotation Data:', pageRotationData);
      }, [rotatedPages, pageRotationData]); // Dependency array ensures the effect runs when these values change
      
      const sendRotateToServer = (rotatedPages) => {
        const currentPage = pageNumber; // Get the current page number
      
        const rotationData = {
          [currentPage]: 0, // Set the rotation to 0 for the current page
        };
      
        // Iterate over rotatedPages to build the rotationData object
        // rotatedPages.forEach(({ page, rotation }) => {
        //   rotationData[page] = rotation;
        // });
      
        // const allPageNumbers = Array.from({ length: numPages }, (_, index) => index + 1);
        // allPageNumbers.forEach((pageNumber) => {
        //   if (rotationData[pageNumber] === undefined) {
        //     rotationData[pageNumber] = 0;
        //   }
        // });
      
        // Make a POST request to the server endpoint to save rotation information
        axiosBaseURL.post(`/api/v1/fax/rotateAndSavePdf/${faxId}`, rotationData)
          .then((response) => {
            console.log('Rotation saved successfully:', response.data);
            toast.success('Rotation saved Successfully');
          })
          .catch((error) => {
            console.error('Error saving rotation:', error);
          });
      };
      const handleSaveRotate = () => {
        sendRotateToServer(rotatedPages);
      };

      const inputBoxesStyle = {
        position: 'absolute',
          top: '70px',
        left: '160px',
      };

      const buttonStyle = {
        position: 'absolute',
          bottom: '110px',
        right: '250px',
      };
      useEffect(() => {
        const fetchSplitHistory = async () => {
          try {
            const response = await axiosBaseURL.get(`/api/v1/fax/faxRxSplitHist/${faxId}`);
            setSplitHistory(response.data.data); // Assuming the API response is an array of split history objects
          } catch (error) {
            console.error('Error fetching split history:', error);
          }
        };
    
        fetchSplitHistory();
      }, [faxId]);

      
  return (
    <>
     <Header_Navigation/> 
    <section className="w-full h-full absolute top-0 left-0 overflow-hidden -z-10">  
     <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative  h-screen"></div>
            <div className="bg-left-design  bg-[#276A8C]  w-[500px] h-[500px]  absolute -left-[300px] -top-[150px] rotate-45 rounded-[80px] lg:w-[800px] lg:h-[800px] lg:-top-[10px] lg:-left-[410px] lg:rounded-[150px]"></div>
            <div className="bg-right-design  bg-[#276A8C] w-[500px] h-[500px] absolute -right-[300px] -bottom-[150px] -rotate-45 rounded-[80px] lg:w-[800px] lg:h-[800px] lg:bottom-[10px] lg:-right-[410px] lg:rounded-[150px]"></div>
            <div className="fixed top-12 lg:left-50 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto">
            <div className="w-ful  relative overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll max-h-[636px h-[calc(120%-4rem)] no-scrollbar">
          <div className="relative  overflow-x-auto rounded-xl    overflow-y-scroll  h-[620px] no-scrollbar ">
              <div className='flex md:flex-row flex-col gap-1'>
                
                  <div className='w-full flex flex-col gap-1'>
    <div className="relative bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300 h-[calc(100vh-5rem)] w-full max-w-2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">      
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
                style={{ border: selectedThumbnail === index ? '2px solid #276A8C' : 'none' }}

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
                                        


        <div className='flex flex-col gap-2 absolute top-1/4 md:right-4 right-2'>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleSaveRotate} > <SaveIcon  className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleRotate}> <ThreeSixtyIcon className='md:text-base text-xs' /></div>

        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleSendFaxEmail}> <AttachEmailIcon className='md:text-base text-xs' /></div>

        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer 'onClick={downloadPdf}> <DownloadIcon className='md:text-base text-xs' /></div>

        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={handleZoomIn}> <ZoomInIcon className='md:text-base text-xs' /></div>
        <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleZoomOut}> <ZoomOutIcon className='md:text-base text-xs' /></div>
        </div>
       
            </div>
            </div>
            <div className='w-[calc(120vh-1rem)]  h-[calc(60vh-10rem)] bg-white rounded-2xl border-2 shadow-xl relative'>
            <div className='w-100 flex justify-center shadow-2xlw- shadow-[#e36c09]'>
              <hr className="h-px border-[#e36c09] border w-32 absolut " />
              <p className='absolute top-0 text-[#e36c09] text-sm'>Split</p>
              <div className='absolute md:top-7 top-6  right-20 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50'>
                {/* By Page */}
                <div className='flex justify-around px-6' onClick={() => handleOptionClick('By Page')} >
                  <div className='flex relative'>
                    <div className='text-lg absolute  -right-1 h-full bg-gray-100'></div>
                  </div>
                  <p className='text-white text-xs'>By Page</p>
                </div>
              </div>
              <div className='absolute md:top-7 top-6  left-20 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50'>
                {/* By Range */}
                <div className='flex justify-around px-6' onClick={() => handleOptionClick('By Range')} >
                  <div className='flex relative'>
                    <div className='text-lg absolute  -right-1 h-full bg-gray-100'></div>
                  </div>
                  <p className='text-white text-xs'>By Range</p>
                </div>
              </div>
          
              {showInputBoxes && (
          <div style={inputBoxesStyle}>
            {selectedOption === 'By Page' && (
              <input
                className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
                type="text"
                name="splitPage"
                value={splitPage}
                onChange={handleInputChange}
                placeholder="Split Page"
              />
            )}

            {selectedOption === 'By Range' && (
              <>
                <input
                  className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
                  type="text"
                  name="fromPage"
                  value={fromPage}
                  onChange={(e) => setFromPage(e.target.value)}
                  placeholder="From Page"
                />
                   <div style={{ height: '10px' }}></div> 
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
            </div>
            <div className='absolute md:bottom-50 top-60  right-1 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50 w-[calc(90vh-1rem)]   h-[calc(60vh-10rem)] bg-white rounded-2xl border-2 shadow-xl relative'>        <table className="w-full">
          <thead >
            <tr>
              <th  >Sl. No</th>
              <th >Split File Name</th>
              <th >Split Pages</th>
            </tr>
          </thead>
          <tbody >
            {splitHistory.map((split, index) => (
              <tr key={index}>
                <td className=' px-5' >{index + 1}</td>
                <td className='px-20' >{split.splitFileName}</td>
                <td className='px-10 ' >{split.splitPages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          </div>
          
          <div style={buttonStyle} className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-base text-xs cursor-pointer' >Reviewed & Exit</div>
    
          </div>  
           
            </div>
           {/* Display split information */}
     
        
        <ToastContainer />
      </div>
    </div >
    </section>
    </>
  )
}

export default FaxId_Form_New