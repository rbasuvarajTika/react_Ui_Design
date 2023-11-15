import React, { useEffect, useState } from 'react'
import Table from '../table/Table'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { Document, Page, pdfjs } from 'react-pdf';
import fax from "../../assets/pdf/fax.pdf"
import axios from 'axios';
import axiosBaseURL from '../axios';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Loader from '../Loader';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useNavigate } from 'react-router';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { useParams } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Duplicate_Fax = () => {
    const navigate = useNavigate()

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);
    const [scale2, setScale2] = useState(1);
    const [numPages2, setNumPages2] = useState(null);
    const [pageNumber2, setPageNumber2] = useState(1);
    const [pdfData, setPdfData] = useState(null);
    const [isloading, setIsLoading] = useState(false)
    const [faxData , setFaxData]= useState([])
    const [mainFaxData, setMainFaxData] = useState(null);
    const [mainTrnFaxId, setMainTrnFaxId] = useState(null);

    const [pdfResponse, setPdfResponse] = useState(null);
    const [duplicatePdfResponse, setDuplicatePdfResponse] = useState(null);
    const [duplicateFaxData, setDuplicateFaxData] = useState(null);
    const [duplicateTrnFaxId, setDuplicateTrnFaxId] = useState(null);

    const [rotate, setRotate] = useState(0);
    const [rotate2, setRotate2] = useState(0);


    const { faxId } = useParams();
    console.log("sendFaxId...", faxId);


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
    const zoomOut = () => {
        setScale(scale -0.2);
    }

    const zoomIn = () => {
        setScale(scale+0.2);
    }

    const zoomOutSecond = () => {
        setScale2(scale2 -0.2);
    }

    const zoomInSecond = () => {
        setScale2(scale2+0.2);
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
    let mainFaxId, duplicateFaxId ,mainTrnsFaxId, duplicateTrnsFaxId ,mainFaxDatas,duplicateFaxDatas;
    const fetchPdfData = (faxId) => {
        //const token = localStorage.getItem('tokenTika');
    
      
          axiosBaseURL({
            method: 'GET',
            url: `/api/v1/fax/faxDupeById/${faxId}`, // Use the endpoint that provides both IDs
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          })
            .then((response) => {
              
              if (response.data && response.data.data) {
                const faxStatusArr = response.data.data.map(item => item.faxStatus);
               
               console.log(faxStatusArr);
                const mainIndex = faxStatusArr.indexOf('Main');
                if (mainIndex !== -1) {
                  mainFaxId = response.data.data[mainIndex].faxId;
                  mainTrnsFaxId = response.data.data[mainIndex].trnFaxId;
                  console.log("response.data.data[mainIndex]",response.data.data[mainIndex]);
                  mainFaxDatas =response.data.data[mainIndex];
                }
          
                const duplicateIndex = faxStatusArr.indexOf('Duplicate');
                if (duplicateIndex !== -1) {
                  duplicateFaxId = response.data.data[duplicateIndex].faxId;
                  duplicateTrnsFaxId = response.data.data[duplicateIndex].trnFaxId;
                  duplicateFaxDatas = response.data.data[duplicateIndex];
                }
          
                // Use these IDs further in your code logic...
              }
              console.log("mainFaxId", mainFaxId, "duplicateFaxData",duplicateFaxId);
              //const trnFaxId = response.data.data[1].trnFaxId;
               // Set the selected fax ID
    
              // Fetch main fax PDF
              axiosBaseURL({
                method: 'GET',
                url: `/api/v1/fax/getFaxPdf/${mainFaxId}`,
                responseType: 'arraybuffer',
                // headers: {
                //   Authorization: `Bearer ${token}`,
                // },
              })
                .then((mainResponse) => {
                  setPdfResponse(mainResponse.data);
                  // Clear any previous errors on successful response
                  setMainFaxData(mainFaxDatas);
                 // console.log("mainFaxData",mainFaxData)
                  setMainTrnFaxId(mainTrnsFaxId);
                })
                .catch((error) => {
                  //setError('Error fetching main PDF. Please try again later.');
                  console.error('Error fetching main PDF:', error);
                });
    
              // Fetch duplicate fax PDF
              axiosBaseURL({
                method: 'GET',
                url: `/api/v1/fax/getFaxPdf/${duplicateFaxId}`,
                responseType: 'arraybuffer',
                // headers: {
                //   Authorization: `Bearer ${token}`,
                // },
              })
                .then((duplicateResponse) => {
                  setDuplicatePdfResponse(duplicateResponse.data);
                 
                  setDuplicateFaxData(duplicateFaxDatas);
                 console.log("DuplicateFaxData",duplicateTrnFaxId);
                 setDuplicateTrnFaxId(duplicateTrnsFaxId);
                })
                .catch((error) => {
                  
                  console.error('Error fetching duplicate PDF:', error);
                });
            })
            .catch((error) => {
           //   setError('Error fetching fax IDs. Please try again later.');
              console.error('Error fetching fax IDs:', error);
            });
       
      };
    
      useEffect(() => {
        // Fetch PDF data for both main and duplicate fax when the component mounts
        fetchPdfData(faxId);
      }, []);
  console.log("duplicateResponse" ,duplicateTrnFaxId ,"mainTrnFaxId" , mainTrnFaxId);

  const data =
    {
      dupeTrnFaxId : duplicateTrnFaxId,
      mainTrnFaxId :mainTrnFaxId
  }
  
      const handleMakeMaster = () => {
       // const token = localStorage.getItem('tokenTika');
          axiosBaseURL
            .post(`/api/v1/fax/faxRxDupe`, data, {
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // },
            })
            .then((response) => {
              // Handle success
              console.log('Keep Duplicate Success:', response.data);
              const confirmation = window.confirm('Fax has been made the master. Do you want to redirect to the fax page?');
    
              // If the user clicks "OK" in the alert box, redirect to the fax page
              if (confirmation) {
                // Replace 'fax-page-url' with the actual URL of your fax page
               console.log("clicked");
                navigate("/nsrxmgt/fax-list");
                
              }
           
              // You may want to update the state or perform other actions on success.
            })
            .catch((error) => {
              // Handle error
              console.error('Keep Duplicate Error:', error);
              // You can set an error state or show an error message to the user.
            });
       
      };
    
    console.log("sendFaxId...", faxId);
    const handleKeepDuplicate = () => {
        console.log("duplicateTrnFaxIdhandleKeepDuplicate",duplicateTrnFaxId);
      
        //const token = localStorage.getItem('tokenTika');
       
            axiosBaseURL
            .put(`/api/v1/fax/keepDuplicate/${duplicateTrnFaxId}`, null, {
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // },
            })
            .then((response) => {
              // Handle success
              console.log('Keep Duplicate Success:', response.data);          
                alert('Fax has been kept as a duplicate.');
               
                // Redirect to the fax page
                navigate("/nsrxmgt/fax-list");
            })
            .catch((error) => {
              // Handle error
              console.error('Keep Duplicate Error:', error);
              // You can set an error state or show an error message to the user.
            });
        
      };


      const handleRotate = () => {
        console.log("Rotate");
        setRotate(rotate + 90);
        if(rotate === 270){
          setRotate(0);
        }
      }
      
      const handleRotate2 = () => {
        console.log("Rotate");
        setRotate2(rotate2 + 90);
        if(rotate2 === 270){
          setRotate2(0);
        }
      }
    return (
        
        <div className="w-ful  relative  overflow-x-auto rounded-xl lg:px-8 md:px-4 overflow-y-scroll lg:h-[640px] h-full no-scrollbar">
        <div className="w-full  h-full flex lg:flex-row flex-col justify-between items-center  gap-10 overflow-hidden overflow-y-scroll no-scrollbar">
          <div className='w-full h-full flex flex-col gap-3  '>
            <div className='bg-[#c7dee6] max-w-[685px] h-10 rounded-3xl md:mx-8 mx-1 px-5 flex items-center justify-around'>
              {mainFaxData ? (
                <>
                  <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Fax ID: <span className='text-[#276a8c] md:text-sm text-[10px]'>{mainFaxData.faxId}</span>
                  </p>
                  <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Fax # <span className='text-[#276a8c] md:text-sm text-[10px]'>{mainFaxData.faxNumber}</span>
                  </p>
                  <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Date: <span className='text-[#276a8c] md:text-sm text-[10px]'>{mainFaxData.faxDate}</span>
                  </p>
                  <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Time: <span className='text-[] md:text-sm text-[10px]'>12:40</span>
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
                    <div className='text-white  w-full lg:h-[calc(100%-1rem)] h-screen  bg-[#ffff] border-2 shadow-2xl rounded-xl relative flex justify-center pt-10'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                        <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber <=1 ? "bg-[#d9e0e3]": "bg-[#00aee6]" }`} onClick={previousPage}> <FaArrowLeft /></div>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber === numPages ? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage}> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={zoomIn}> <ZoomInIcon className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={zoomOut}> <ZoomOutIcon className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleRotate}> <ThreeSixtyIcon className='md:text-base text-xs' /></div>
                        </div>

                        <div className='xl:w-[calc(100%-100px)] md:w-[calc(100%-150px)]  w-[calc(100%-70px)]  h-[calc(100%-100px)] border overflow-y-scroll absolute overflow-hidden no-scrollbar  '>
                            <div className=' w-full h-full '>
                                <div className='text-black overflow-hidden overflow-x-scroll overflow-y-scroll h-screen'>

                                    {
                                        !isloading ?
                                            <>
                                                    <Document 

                                                        file={pdfResponse}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                    >
                                                        <Page pageNumber={pageNumber} scale={scale}
                                                            width={500} height={500}
                                                            rotate={rotate}
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

                        <div className='absolute top-1 flex  w-full left-1'>
                            <p className='text-[#717171] text-sm absolute md:top-2 md:bottom-0 -bottom-10 w-20'> Page : {pageNumber}</p>
                        </div>

                        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                            <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                            <p className='absolute top-0 text-[#e36c09] text-sm'>Master Fax</p>
                        </div>
                    </div>
                </div>

                <div className='w-full h-full flex flex-col gap-3 '>
    <div className='bg-[#c7dee6] max-w-[685px] h-10 rounded-3xl md:mx-8 mx-1 px-5 flex items-center justify-around'>
        {duplicateFaxData ? (
            <>
                <label className='text-[#1b4a68] xl:text-sm text-xs font-semibold' htmlFor='faxIdDropdown'>
            Fax ID:
        </label>
        <select id='faxIdDropdown' className='text-[#276a8c] md:text-sm text-[10px]'>
            <option value={duplicateFaxData.faxId}>{duplicateFaxData.faxId}</option>
            {/* You can add more options here if needed */}
           </select>
                <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Fax # <span className='text-[#276a8c] md:text-sm text-[10px]'>{duplicateFaxData.faxNumber}</span>
                </p>
                <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Date: <span className='text-[#276a8c] md:text-sm text-[10px]'>{duplicateFaxData.faxDate}</span>
                </p>
                <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>
                    Time: <span className='text-[] md:text-sm text-[10px]'>12:40</span>
                </p>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
                    <div className='text-white w-full lg:h-[calc(100%-1rem)] h-screen bg-[#ffff] shadow-2xl border-2  rounded-xl  relative  flex justify-center pt-10'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber2 <=1 ? "bg-[#d9e0e3]": "bg-[#00aee6]" }`} onClick={previousPage2}> <FaArrowLeft /></div>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber2 === numPages2 ? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage2}> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={zoomInSecond}> <ZoomInIcon className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={zoomOutSecond}> <ZoomOutIcon className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={handleRotate2}> <ThreeSixtyIcon className='md:text-base text-xs' /></div>
                        </div>

                        <div className='xl:w-[calc(100%-100px)] md:w-[calc(100%-150px)]  w-[calc(100%-70px)]   h-[calc(100%-100px)] border overflow-y-scroll absolute overflow-hidden no-scrollbar no-scrollbar  '>
                            <div className=' w-full h-full  '>
                                <div className='text-black overflow-hidden overflow-x-scroll overflow-y-scroll h-screen'>

                                    {
                                        !isloading ?
                                            <>

                                                <Document className=" "

                                                    file={duplicatePdfResponse}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={pageNumber2} scale={scale2}
                                                        width={500}
                                                        height={500}
                                                        rotate={rotate2}
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

                        <div className='absolute top-1 flex  w-full left-1'>
                            <p className='text-[#717171] text-sm absolute md:top-2 md:bottom-0 -bottom-10 w-20'>Page: {pageNumber2}</p>
                        </div>

                        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                            <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                            <p className='absolute top-0 text-[#e36c09] text-sm'>Duplicate Fax</p>
                        </div>

                        <div className='absolute top-1 flex  w-full justify-around'>
                            <div className=' xl:w-38 lg:w-32 md:w-24 sm:w-32 csm:w-32 vsm:w-20 w-20 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-xs text-[8px] cursor-pointer'
                             onClick={handleMakeMaster} 
                            >
                                Make Master
                                </div>
                            <div className=' xl:w-38 lg:w-32 md:w-24 sm:w-32 csm:w-32 vsm:w-20 w-20 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-xs text-[10px] cursor-pointer'
                             onClick={handleKeepDuplicate} 
                            >Keep Duplicate</div>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
            
           
        
        </div>
        
    )
}

export default Duplicate_Fax