import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DuplicateContext } from "../../context/DuplicateContext";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import fax from "../../assets/pdf/fax.pdf";
import jsPDF from "jspdf";
import { AiFillCloseCircle } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Loader from "../Loader";
import axiosBaseURL from "../axios";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DownloadIcon from "@mui/icons-material/Download";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { useParams } from "react-router-dom";
import "../Background";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";
import Header_Navigation_FaxReview from "../header/Header_Navigation_FaxReview";
import { alignProperty } from "@mui/material/styles/cssUtils";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FaxId_Form_New = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [scalePopUp, setScalePopoup] = useState(1);
  const [rotate, setRotate] = useState({});
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [splitPage, setSplitPage] = useState("");
  const [fromPage, setFromPage] = useState("");
  const [selectedSplitOption, setSelectedSplitOption] = useState("");

  const [toPage, setToPage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [rotatedPages, setRotatedPages] = useState([]);
  const [pageRotationData, setPageRotationData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [splitHistory, setSplitHistory] = useState([]);
  const [thumbnailPageNumbers, setThumbnailPageNumbers] = useState([]);
  const [userName, setUserName] = useState(null);
  const [retryNeeded, setRetryNeeded] = useState(false);
  const { faxId, sendNoOfRxs, trnFaxId } = useParams();
  const [noOfRxs, setNoOfRxs] = useState(0);
  const [pageDegree, setPageDegree] = useState([]);

  const navigate = useNavigate();
  const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } =
    useContext(DuplicateContext);

  const handleOpen_Duplicate = () => {
    setOpenDuplicate(true);
    setShoeForms(false);
  };

  const previousPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  };

  const nextPage = () => {
    setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
  };

  useEffect(() => {
    const fetchPdf = () => {
      setIsLoading(true);
      axiosBaseURL({
        method: "GET",
        url: `/api/v1/fax/getFaxPdf/${faxId}`,
        responseType: "arraybuffer",
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          setIsLoading(false);
          setPdfData(url);
        })
        .catch((error) => {
          //setError('Error fetching main PDF. Please try again later.');
          console.error("Error fetching main PDF:", error);
        });
    };

    fetchPdf();
  }, []);

  const handleZoomOut = () => {
    console.log("clicked");
    setScalePopoup(scalePopUp - 0.2);
  };

  const handleZoomIn = () => {
    console.log("clicked");
    setScalePopoup(scalePopUp + 0.2);
  };

  const handleSplitClick = () => {
    setShowInputBoxes(true);
    setSelectedSplitOption(""); // Reset selected option
    setSplitPage("");
    setFromPage("");
    setToPage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "splitPage") {
      // Update the splitPage state
      setSplitPage(value);

      // Update the selectedPages state based on the entered page numbers
      const selectedPagesArray = value
        .split(",")
        .map((page) => parseInt(page.trim(), 10));
      setSelectedPages(selectedPagesArray);
    } else if (name === "fromPage") {
      setFromPage(value);
      // Update the splitPage state for range splitting
      setSplitPage(`${value}-${toPage}`);
    } else if (name === "toPage") {
      setToPage(value);
      // Update the splitPage state for range splitting
      setSplitPage(`${fromPage}-${value}`);
    }
  };

  const handleSplitPDfPageClick = () => {
    console.log("Selected Option:", selectedOption);
    console.log("Selected Pages:", selectedPages);
    console.log("Split Page:", splitPage);

    const pagesToSplit =
      selectedOption === "By Page" ? selectedPages : parsePageRange();

    console.log("Pages to Split:", pagesToSplit);

    if (pagesToSplit.length > 0) {
      const selectedPagesString = pagesToSplit.join(",");
      const splitType = selectedOption === "By Page" ? "BY_PAGE" : "BY_RANGE";
      const userName = localStorage.getItem("userName");

      console.log("Split Type:", splitType); // Log splitType here

      axiosBaseURL
        .post(`/api/v1/fax/sendPdfByPages`, {
          faxId,
          userName,
          pages: selectedPagesString,
          splitType,
        })
        .then((response) => {
          console.log("Split PDF Successfully:", response.data);
          if (response.data.message === "Successfully ") {
            toast.success("PDF Splitted Successfully");
            window.location.reload();
            setShowInputBoxes(false);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setShowInputBoxes(false);
          console.error("Split PDF Error:", error);
        });
    } else {
      toast.error("Please select at least one page before splitting.");
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
    const selectedPagesArray = parsePageRange();

    if (selectedPagesArray.length > 0) {
      const selectedPagesString = selectedPagesArray.join(",");
      const userName = localStorage.getItem("userName");

      axiosBaseURL
        .post(`/api/v1/fax/sendPdfByPages`, {
          faxId,
          userName,
          pages: selectedPagesString,
          splitType: "BY_RANGE",
        })
        .then((response) => {
          console.log("Split PDF Successfully:", response.data);
          if (response.data.message === "Successfully ") {
            toast.success("PDF Splitted Successfully");
            //window.location.reload();
            setShowInputBoxes(false);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setShowInputBoxes(false);
          console.error("Split PDF Error:", error);
        });
    } else {
      toast.error("Please select at least one page before splitting.");
    }
  };

  const handleSaveSplit = () => {
    if (selectedOption === "By Page") {
      handleSplitPDfPageClick();
    } else if (selectedOption === "By Range") {
      handleSplitPDfRangeClick();
    }
    setShowInputBoxes(false);
  };

  //console.log(sendFaxId);
  const generateThumbnails = async (numPages) => {
    if (pdfData) {
      const thumbArray = [];
      const pageNumbersArray = [];

      const loadingTask = pdfjs.getDocument(pdfData);
      const pdf = await loadingTask.promise;

      for (let i = 1; i <= numPages; i++) {
        const pdfPage = await pdf.getPage(i);
        const thumb = await generateThumbnail(pdfPage);
        thumbArray.push(thumb);
        pageNumbersArray.push(i);
      }

      setThumbnails(thumbArray);
      setThumbnailPageNumbers(pageNumbersArray);
    }
  };

  const generateThumbnail = async (pdfPage) => {
    const scale = 0.2; // Adjust this scale as needed
    const viewport = pdfPage.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await pdfPage.render({
      canvasContext: context,
      viewport,
    }).promise;

    return canvas.toDataURL("image/png");
  };

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages);

    // Load the main pages
    for (let i = 1; i <= numPages; i++) {
      await renderMainPage(i);
    }

    // Generate thumbnails after main pages are loaded
    await generateThumbnails(numPages);

    // Delay rendering for debugging purposes
    setTimeout(() => {
      // Check if any pages are rotated and apply rotation
      rotatedPages.forEach(({ page, rotation }) => {
        const canvas = document.getElementById(`page-${page}`);
        if (canvas) {
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);

          const thumbnailIndex = pageThumbnailNumbers.indexOf(page);
          const thumbnailRotation = thumbnails[thumbnailIndex]?.rotation || 0;

          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate((thumbnailRotation * Math.PI) / 180);
          context.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
          context.restore();
        }
      });

      // Pass the rotation to the Page component
      const rotationForPage = pageRotationData[pageNumber] || 0;
      setRotate(rotationForPage);
    }, 1000); // Delay for 1 second
  };

  const renderMainPage = async (pageNumber) => {
    const canvas = document.getElementById(`page-${pageNumber}`);
    if (canvas) {
      const pdfPage = await pdf.getPage(pageNumber);
      const context = canvas.getContext("2d");
      const viewport = pdfPage.getViewport({ scale: 1 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await pdfPage.render({
        canvasContext: context,
        viewport,
      }).promise;
    }
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
    const filteredPages = updatedSelectedPages.filter((page) => !isNaN(page));

    setSelectedPages(filteredPages);
    setSelectedThumbnail(pageIndex); // Update selected thumbnail index

    console.log("Updated Selected Pages:", filteredPages);

    setSplitPage(filteredPages.join(","));
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowInputBoxes(true);
  };

  const downloadPdf = () => {
    axiosBaseURL({
      method: "GET",
      url: `/api/v1/fax/download-fax-pdf/${faxId}`, // Replace with your API endpoint for downloading the PDF
      responseType: "blob",
      headers: {
        // Add headers if required
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "fax.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  const handleSendFaxEmail = () => {
    axiosBaseURL
      .post(`/api/v1/fax/faxRx/alertMail/${faxId}`, {})
      .then((response) => {
        // Handle success
        console.log("Fax PDF sent successfully:", response.data);
        toast.success("Fax PDF sent successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending fax PDF:", error);
        toast.error("Error sending fax PDF. Please try again later.");
      });
  };

  const handleRotate = () => {
    const currentPage = pageNumber;

    const currentRotation = rotate[currentPage] || 0;
    const newRotation = (currentRotation + 90) % 360; // Ensure the rotation is within [0, 90, 180, 270]

    console.log("Before Rotation Update:", rotate);

    // Update the local state with the new rotation information for the current page
    setRotate((prevRotate) => ({
      ...prevRotate,
      [currentPage]: newRotation,
    }));

    console.log("After Rotation Update:", rotate);
  };

  useEffect(() => {
    // This will log the updated state after it's been processed
    console.log("Rotated Pages:", rotatedPages);
    console.log("Page Rotation Data:", pageRotationData);
  }, [rotatedPages, pageRotationData]); // Dependency array ensures the effect runs when these values change

  const sendRotateToServer = () => {
    const allRotationData = {};

    // Include the individual page rotations in the object
    Object.keys(rotate).forEach((page) => {
      allRotationData[page] = rotate[page];
    });

    axiosBaseURL
      .post(`/api/v1/fax/rotateAndSavePdf/${faxId}`, allRotationData)
      .then((response) => {
        console.log("Rotation saved successfully:", response.data);
        toast.success("Rotation saved Successfully");
      })
      .catch((error) => {
        console.error("Error saving rotation:", error);
      });
  };

  const handleSaveRotate = () => {
    sendRotateToServer();
  };
  useEffect(() => {
    console.log("Component Rendered");
  }, []);

  // Main useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosBaseURL.get(
          `/api/v1/fax/getFaxPdfRotation/${faxId}`
        );
        const pageRotationData = response.data.pageRotation;

        console.log("Fetched Page Rotation Data:", pageRotationData);

        // Convert string values to numbers
        const numericPageRotationData = {};
        Object.keys(pageRotationData).forEach((key) => {
          numericPageRotationData[key] = Number(pageRotationData[key]);
        });

        // Initialize the rotation state based on the fetched data
        setRotate((prevRotate) => {
          // Merge the existing state with the fetched data
          const updatedRotate = { ...prevRotate, ...numericPageRotationData };

          console.log("After Setting Rotation:", updatedRotate);

          return updatedRotate;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Logging for State Changes
  useEffect(() => {
    console.log("Rotate State Updated:", rotate);
  }, [rotate]);

  const fetchSplitHistory = async () => {
    try {
      const response = await axiosBaseURL.get(
        `/api/v1/fax/faxRxSplitHist/${faxId}`
      );
      const splitHistoryData = response.data.data;
      // console.log(response.data.data);
      // Assuming splitHistoryData is an array of split history objects
      setSplitHistory(splitHistoryData);
    } catch (error) {
      console.error("Error fetching split history:", error);
    }
  };

  const handleRetryClick = async (index) => {
    try {
      // Assuming there is an update API for retrying failed splits
      console.log("Retrying failed split at index:", index);

      const splitInfo = splitHistory[index];
      const pagesToRetry = getRetryPages(splitInfo);
      const userName = localStorage.getItem("userName");

      const retryData = {
        faxId: splitHistory[index].faxId,
        splitFaxId: splitHistory[index].splitFaxId,
        trnFaxSplitId: splitHistory[index].trnFaxSplitId,
        pages: splitHistory[index].splitPages,
        userName: userName,
        splitType: splitHistory[index].splitType,
        splitAttempts: splitHistory[index].splitAttempts,
        splitStatus: splitHistory[index].splitStatus,
      };

      const response = await axiosBaseURL.post(
        `api/v1/fax/sendPdfByPagesRetrive`,
        retryData
      );

      // Check the response and handle accordingly
      if (response.data.success) {
        console.log("Failed split retried successfully.");
        // Optionally, you can fetch the split history again to update the UI
        fetchSplitHistory();
      } else {
        console.error("Failed to retry split:", response.data.message);
        // Handle the case where retrying the failed split was not successful
      }
    } catch (error) {
      console.error("Error retrying failed split:", error);
      // Handle the case where an error occurred while retrying the failed split
    } finally {
      // Reset retryNeeded after retrying, whether successful or not
      setRetryNeeded(false);
    }
  };

  useEffect(() => {
    fetchSplitHistory();
  }, [faxId]);

  const getRetryPages = (splitInfo) => {
    if (splitInfo.splitType === "BY_PAGE") {
      // Assuming selectedPages is an array of selected pages
      return selectedPages.join(",");
    } else if (splitInfo.splitType === "BY_RANGE") {
      // Assuming fromPage and toPage are available for range selection
      const pages = [];
      for (let i = parseInt(fromPage); i <= parseInt(toPage); i++) {
        pages.push(i);
      }
      return pages.join(",");
    } else {
      // Handle other split types if needed
      return "";
    }
  };

  useEffect(() => {
    // Convert sendNoOfRxs to a number, defaulting to 0 if it's null or NaN
    const parsedNoOfRxs =
      sendNoOfRxs !== null ? parseInt(sendNoOfRxs, 10) : null;

    // Check if parsedNoOfRxs is a valid number, if not, default to 0
    const updatedNoOfRxs = Number.isNaN(parsedNoOfRxs) ? 0 : parsedNoOfRxs;

    setNoOfRxs(updatedNoOfRxs);
  }, [sendNoOfRxs]);
  return (
    <>
      <Header_Navigation_FaxReview />
      <section className="w-full h-full absolute top-0 left-0 overflow-hidden -z-10 ">
        <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative  h-screen"></div>
        <div className="bg-left-design  bg-[#276A8C]  w-[50%] h-[50%]  absolute -left-[40%] -top-[20%] rotate-45 rounded-[80px] lg:w-[40%] lg:h-[40%] lg:-top-[10%] lg:-left-[410px] lg:rounded-[150px]"></div>
        <div className="bg-right-design  bg-[#276A8C] w-[20%] h-[50%] absolute -right-[40%] -bottom-[20%] -rotate-45 rounded-[80px] lg:w-[40%] lg:h-[40%] lg:bottom-[10%] lg:-right-[410px] lg:rounded-[150px]"></div>

        <div className="fixed top-12 lg:left-50 left-0 right-0 z-50 overflow-x-hidde">
          <div className="  relativ overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll  h-[calc(100vh-4rem)] no-scrollbar ">
            <div className="relativ  overflow-x-auto rounded-xl    overflow-y-scroll  h-[620px no-scrollbar  ">
              <div className="flex  flex-col justify-center items-center gap-1">
                <div className="w-full flex md:flex-row flex-col gap-5">
                  <div className="relative  md:w-[50%] w-full bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300 lg:h-[calc(100vh-5.5rem)] md:h-[calc(100vh-10rem)] h-[calc(80vh-5.5rem)] max-w2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53 ">
                    <p className="text-[#596edb] text-xs absolute font-semibold top-0 right-30 pb-1">
                      Fax ID: {faxId}
                    </p>
                    <p className="text-[#596edb] text-xs absolute font-semibold top-0 right-5 pb-1">
                      {" "}
                      No Of Rx: {noOfRxs}
                    </p>
                    <div className="relative">
                      <p className="text-[#717171] text-sm absolute -top-0">
                        {pageNumber} of {numPages}
                      </p>
                    </div>
                    <div className="flex h-full pt-5">
                      {/* Left section for thumbnails */}
                      <div className="w-1/5 border mr-4 overflow-y-auto">
                        <div className="thumbnails-container">
                          {thumbnails.map((thumbnail, index) => (
                            <div key={index} className="thumbnail-container">
                              <img
                                src={thumbnail}
                                alt={`Page ${index + 1}`}
                                onClick={() => handleThumbnailClick(index)}
                                className="thumbnail"
                                style={{
                                  border:
                                    selectedThumbnail === index
                                      ? "2px solid #276A8C"
                                      : "none",
                                }}
                              />

                              <div
                                className="thumbnail-number "
                                style={{ padding: "1px", marginLeft: "40px" }}
                              >
                                {thumbnailPageNumbers[index]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right section for the document */}

                      <div className="w-4/5 overflow-hidden overflow-x-scroll overflow-y-scroll">
                        <div className="text-black  h-screen  2xl:min-h-[1800vh] 2xl:min-w-[1500vw] ">
                          {!isloading ? (
                            <Document
                              file={pdfData}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              <Page
                                pageNumber={pageNumber}
                                scale={scalePopUp}
                                width={380}
                                height={200}
                                rotate={rotate[pageNumber]}
                              />
                            </Document>
                          ) : (
                            <div className="w-full flex justify-center items-center mt-32 ">
                              <Loader />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="relative ">
                      <p className="text-[#717171] text-sm absolute top-2">
                        {pageNumber} of {numPages}
                      </p>
                    </div>

                    <div className="flex justify-center gap-2 mt-1">
                      <div
                        className={`text-white sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${
                          pageNumber <= 1 ? "bg-[#d9e0e3]" : "bg-[#00aee6]"
                        }`}
                        onClick={previousPage}
                      >
                        {" "}
                        <FaArrowLeft />
                      </div>
                      <div
                        className={`text-white sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${
                          pageNumber === numPages
                            ? "bg-[#e7eaea]"
                            : "bg-[#00aee6]"
                        }`}
                        onClick={nextPage}
                      >
                        {" "}
                        <FaArrowRight />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 absolute top-1/4 md:right-4 right-2">
                      <div
                        className="text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer "
                        onClick={handleSaveRotate}
                      >
                        {" "}
                        <SaveIcon className="md:text-base text-xs" />
                      </div>
                      <div
                        className=" text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer"
                        onClick={handleRotate}
                      >
                        {" "}
                        <ThreeSixtyIcon className="md:text-base text-xs" />
                      </div>

                      <div
                        className="text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer "
                        onClick={handleSendFaxEmail}
                      >
                        {" "}
                        <AttachEmailIcon className="md:text-base text-xs" />
                      </div>

                      <div
                        className="text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer "
                        onClick={downloadPdf}
                      >
                        {" "}
                        <DownloadIcon className="md:text-base text-xs" />
                      </div>

                      <div
                        className="text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer "
                        onClick={handleZoomIn}
                      >
                        {" "}
                        <ZoomInIcon className="md:text-base text-xs" />
                      </div>
                      <div
                        className="text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer"
                        onClick={handleZoomOut}
                      >
                        {" "}
                        <ZoomOutIcon className="md:text-base text-xs" />
                      </div>
                    </div>
                    <div>{/* Other components using selectedUserData */}</div>
                  </div>
                  {/* </div> */}
                  <div className=" md:w-[50%] w-full relative ">
                    <div className="flex flex-col h-full justify-betwee gap-5 ">
                      <div className=" hidde md:bottom-50 xl:top-72 top-60 right-1  z-50  w-full sm:h-full md:h-full h-[calc(100vh-25rem)] overflow-x-scroll bg-white rounded-2xl border-2 shadow-xl relativ overflow-y-auto item-center w-[calc(90vh-1rem) h-[calc(60vh-10rem)] ">
                        <div className="flex justify-center  ">
                          <hr className="h-px border-[#e36c09] border w-32 absolute  item-center " />
                        </div>

                        <p className="absolute top-0 text-[#e36c09] text-sm flex  justify-center w-full">
                          Split Pdf
                        </p>
                        <div className="absolute md:top-7 top-6 justify-center md:right-20 sm:right-10 right-7 rounded-xl bg-[#00aee6] w-28   z-50">
                          {/* By Page */}
                          <div
                            className="flex justify-around px-6"
                            onClick={() => handleOptionClick("By Page")}
                          >
                            <div className="flex relative">
                              <div className="text-lg absolute  -right-1 h-full bg-gray-100"></div>
                            </div>
                            <p className="text-white text-xs cursor-pointer">
                              By Page
                            </p>
                          </div>
                        </div>
                        <div className="absolute md:top-7 top-6  md:left-20 sm:left-10 left-2 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50">
                          {/* By Range */}
                          <div
                            className="flex justify-around px-6"
                            onClick={() => handleOptionClick("By Range")}
                          >
                            <div className="flex relative">
                              <div className="text-lg absolute  -right-1 h-full bg-gray-100"></div>
                            </div>
                            <p className="text-white text-xs">By Range</p>
                          </div>
                        </div>

                        {showInputBoxes && (
                          <div className=" absolute top-[70px] left-[30%] sm:left-[35%] lg:left-[38%] xl:left-[43%] 2xl:left-[46%]  ">
                            {selectedOption === "By Page" && (
                              <input
                                className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
                                type="text"
                                name="splitPage"
                                value={splitPage}
                                onChange={handleInputChange}
                                placeholder="Split Page"
                              />
                            )}

                            {selectedOption === "By Range" && (
                              <>
                                <input
                                  className="bg-[#f2f2f2] border border-gray-300 xl:w-[100px] text-black py-0.5 text-xs t-1"
                                  type="text"
                                  name="fromPage"
                                  value={fromPage}
                                  onChange={(e) => setFromPage(e.target.value)}
                                  placeholder="From Page"
                                />
                                <div style={{ height: "10px" }}></div>
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

                            <div
                              style={{ marginTop: "10px", textAlign: "center" }}
                            >
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

                      <div className=" hidde md:bottom-50 xl:top-72 top-60 right-1  rounded-2xl border-2 shadow-xl bg-white  z-50  w-full  h-full  relativ ">
                        <div className="w-[calc(90vh-1rem) h-[calc(60vh-10rem)] 500  relative overflow-y-auto ">
                          <div className="flex justify-center ">
                            <hr className="h-px border-[#e36c09] border w-32 absolute flex justify-center   " />
                          </div>
                          <p className="absolute top-0 text-[#e36c09] text-sm flex justify-center w-full">
                            Split Completed
                          </p>
                          {/* </div> */}

                          <div className="pt-6 ">
                            {splitHistory.length > 0 ? (
                              <table className="w-full ">
                                <thead className="">
                                  <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl">
                                    <th className="px-2 py-3 border">Sl. No</th>
                                    <th className="px-2 py-3 border">
                                      Split File Name
                                    </th>
                                    <th className="px-2 py-3 border">
                                      Split Type
                                    </th>
                                    <th className="px-2 py-3 border">
                                      Split Pages
                                    </th>
                                    <th className="px-2 py-3 border">
                                      Split Status
                                    </th>
                                    <th className="px-2 py-3 border">
                                      User Name
                                    </th>
                                    <th className="px-2 py-3 border">
                                      Created Date
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {splitHistory.map((split, index) => (
                                    <tr key={index}>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {index + 1}
                                      </td>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {split.splitFileName}
                                      </td>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {split.splitType}
                                      </td>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {split.splitPages}
                                      </td>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {split.splitStatus === "failure" ? (
                                          <div className="flex items-center">
                                            <span>{split.splitStatus}</span>
                                            <div
                                              className="ml-2 text-white rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer"
                                              onClick={() =>
                                                handleRetryClick(index)
                                              }
                                            >
                                              <ReplayIcon className="md:text-base text-xs" />
                                            </div>
                                          </div>
                                        ) : (
                                          <span>{split.splitStatus}</span>
                                        )}
                                      </td>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {split.createdUser}
                                      </td>
                                      <td className="bg-[#f2f2f2] text-gray-600 border px-10">
                                        {split.createdDate}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-center text-gray-600 ">
                                No data available
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex csm:flex-row flex-col  p-1 csm:justify-evenly justify-center items-center sm:gap-0 csm:gap-5 gap-3 pt-3">
                  <div className="text-white sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-base text-xs cursor-pointer">
                    Reviewed & Exit
                  </div>
                  {noOfRxs === 0 && (
                    <div
                      className="text-white sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center text-center md:text-base text-xs cursor-pointer"
                      onClick={() =>
                        navigate(`/nsrxmgt/newrx/${faxId}/${trnFaxId}`)
                      }
                    >
                      New Rx
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ToastContainer />
          </div>
        </div>
      </section>
    </>
  );
};

export default FaxId_Form_New;
