import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DuplicateContext } from "../../context/DuplicateContext";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Document, Page, pdfjs } from "react-pdf";
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
import FaxId_Form from "./FaxId_Form";
import Header_Navigation_FaxReview from "../header/Header_Navigation_FaxReview";
import Header_Navigation_Validate_Fax from "../header/Header_Navigation_Validate_Fax";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Validate_Note = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [scalePopUp, setScalePopoup] = useState(1);
  const [rotate, setRotate] = useState({});
  const [showInputBoxes, setShowInputBoxes] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [rotatedPages, setRotatedPages] = useState([]);
  const [pageRotationData, setPageRotationData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [thumbnailPageNumbers, setThumbnailPageNumbers] = useState([]);
  const [rxlist, setRxList] = useState([]);
  const [attachToPatient, setAttachToPatient] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [hcpName, setHcpName] = useState("");
  const [showSearchPatient, setShowSearchPatient] = useState(false);
  const [showSearchHcp, setShowSearchHcp] = useState(false);
  const { faxId, sendNoOfRxs, trnFaxId, patientFirstName, patientLastName, hcpFirstName, hcpLastName } = useParams();
  const sanitizedPatientFirstName = patientFirstName === 'null' || patientFirstName === null ? ' ' : patientFirstName;
  const sanitizedPatientLastName = patientLastName === 'null' || patientLastName === null ? ' ' : patientLastName;
  const sanitizedHcpFirstName = hcpFirstName === 'null' || hcpFirstName === null ? ' ' : hcpFirstName;
  const sanitizedHcpLastName = hcpLastName === 'null' || hcpLastName === null ? ' ' : hcpLastName;
  const [patientNames, setPatientNames] = useState(`${sanitizedPatientFirstName.trim()} ${sanitizedPatientLastName.trim()}`);
  const [hcpNames, setHcpNames] = useState(`${sanitizedHcpFirstName.trim()} ${sanitizedHcpLastName.trim()}`);

  const [rxNoteslist, setRxNotesList] = useState([]);

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchPatients, setSearchPatients] = useState([]);
  const [filteredHcps, setFilteredHcps] = useState([]);
  const [searchHcps, setSearchHcps] = useState([]);
  const [isPatientListVisible, setIsPatientListVisible] = useState(false);
  const [isHcpListVisible, setIsHcpListVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [selectedFaxId, setSelectedFaxId] = useState(null);
  const [showFaxForm, setShowFaxForm] = useState(false);
  const [faxIds, setFaxIds] = useState('');
  const [selectedRxId, setSelectedRxId] = useState({ rxId: null, faxId: null, index: null, trnFaxId: null });
  const [selectedNotesRxId, setSelectedNotesRxId] = useState({ rxNotesId: null, faxNotesId: null, indexNotes: null });
  const [noOfRxs, setNoOfRxs] = useState(0);
  const navigate = useNavigate();
  const previousPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  };

  const nextPage = () => {
    setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
  };

  const [searchNotesFlag, setSearchNotesFlag] = useState(1);

  console.log("pa :", hcpFirstName)
  console.log("spa :", sanitizedHcpFirstName)
  console.log('Sanitized values:', sanitizedPatientFirstName, sanitizedPatientLastName, sanitizedHcpFirstName, sanitizedHcpLastName);
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

  // const isSelected = (rxId) => {
  //   return selectedRxId === rxId;
  // };

  //const isChecked = (rxId) => selectedRxId === rxId;

  // Function to handle checkbox changes
  // const handleCheckboxChange = (rxId) => {
  //   setSelectedRxId(rxId);
  // };

  const isSelected = (index, rxId, faxId, trnFaxId) => {
    return selectedRxId.rxId === rxId && selectedRxId.index === index && selectedRxId.faxId == faxId && selectedRxId.trnFaxId == trnFaxId;
  };

  const handleCheckboxChange = (index, rxId, faxId, trnFaxId) => {
    //setSelectedRxId({index: index , rxId: rxId, faxId : faxId});

    setSelectedRxId((prevSelectedRx) => {
      // If the clicked checkbox is already selected, deselect it
      if (prevSelectedRx.index === index && prevSelectedRx.rxId === rxId && prevSelectedRx.faxId === faxId && prevSelectedRx.trnFaxId === trnFaxId) {
        return { id: null, index: null };
      }

      // Otherwise, select the new checkbox
      return { index: index, rxId: rxId, faxId: faxId, trnFaxId: trnFaxId };
    });
  };

  const isNotesSelected = (indexNotes, rxId, faxId) => {
    return selectedNotesRxId.rxNotesId === rxId && selectedNotesRxId.indexNotes === indexNotes && selectedNotesRxId.faxNotesId == faxId;
  };

  const handleNotesCheckboxChange = (index, rxId, faxId) => {
    //setSelectedRxId({index: index , rxId: rxId, faxId : faxId});

    setSelectedNotesRxId((prevSelectedRx) => {
      // If the clicked checkbox is already selected, deselect it
      if (prevSelectedRx.indexNotes === index && prevSelectedRx.rxNotesId === rxId && prevSelectedRx.faxNotesId === faxId) {
        return { id: null, index: null };
      }

      // Otherwise, select the new checkbox
      return { indexNotes: index, rxNotesId: rxId, faxNotesId: faxId };
    });
  };

  const handleZoomOut = () => {
    console.log("clicked");
    setScalePopoup(scalePopUp - 0.2);
  };

  const handleZoomIn = () => {
    console.log("clicked");
    setScalePopoup(scalePopUp + 0.2);
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

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowInputBoxes(true);

    // Check if the "Attach to Patient" option is selected
    if (option === "By Range") {
      setAttachToPatient(true);
      setShowSearchPatient(true);
      setShowSearchHcp(true);
    } else {
      setAttachToPatient(false);
      setShowSearchPatient(false);
      setShowSearchHcp(false);
    }
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


  const handleSubmit = () => {
    if (rxNoteslist.length > 0) {
      return toast.error("Failed to submit,remove notes.");
    }
    const userName = localStorage.getItem('userName');
    console.log("duplicate fax Id:", selectedRxId.faxId);
    const retryData = {

      userName: userName,
      faxIdMain: selectedRxId.faxId,
      faxIdDuplicate: faxId,
    };
    //console.log("duplicate fax Id:", trnFaxIdDuplicate);
    axiosBaseURL
      .put(`/api/v1/fax/updateFaxRxAttachNotes`, retryData, {
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        // Handle success
        console.log("search notes flag in submit:", searchNotesFlag),
          console.log("attached rx notes successfully:", response.data),
          console.log("search notes flag in submit:", searchNotesFlag),
          toast.success("Submitted successfully");

        if (searchNotesFlag === 0) {
          fetchSearchNotesRxData();
        } else {
          fetchNotesRxData();
        }


      })
      .catch((error) => {
        // Handle error
        console.error("Error attach notes rx:", error);
        toast.error("Failed to submit.");
      });
  };

  const handleSearch = () => {
    //const userName = localStorage.getItem('userName');
    if (!patientNames.trim()) {
      toast.error('Please enter Patient Name.');
      return;
    }

    if (!hcpNames.trim()) {
      toast.error('Please enter HCP Name.');
      return;
    }
    setSearchNotesFlag(0);
    // axiosBaseURL
    //   .get(`/api/v1/fax/showNotesPrevRxNameSearch/${patientNames}/${hcpNames}`)
    //   .then((response1) => {
    //     setRxNotesList(response1.data.data);
    //     // Handle success
    //     console.log("search notes list:", response1.data.data);     
    //       setRxNotesList(response1.data.data);
    //       setSearchNotesFlag('0');
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error("Error search notes list:", error);
    //     //toast.error("Failed to submit.");
    //   });
    // setRxNotesList('');
    fetchSearchNotesRxData();
    setWarningMessage('');
    axiosBaseURL
      .get(`/api/v1/fax/showPrevRxNameSearch/${patientNames}/${hcpNames}`)
      .then((response) => {
        setRxList(response.data.data);
        // Handle success
        console.log("search list:", response.data.data);
        if (response.data.data.length === 0) {
          toast.info("No data found.");
        } else {
          setRxList(response.data.data);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error search list:", error);
        toast.error("Failed to submit.");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = localStorage.getItem('userName');
        const response = await axiosBaseURL.get(`/api/v1/fax/showPrevRxHcp/${userName}/${trnFaxId}`);

        // Assuming response.data contains the desired data
        setRxList(response.data.data);

        // Accessing faxId from the first item in the array (index 0)
        if (response.data.data.length > 0) {
          setFaxIds(response.data.data[0].faxId);
          console.log(response.data.data[0].faxId);
        }

        console.log("RxList:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const fetchNotesRxData = async () => {
    try {
      const userName = localStorage.getItem('userName');
      const response = await axiosBaseURL.get(`/api/v1/fax/showNotesPrevRxHcp/${userName}/${trnFaxId}`);

      // Assuming response.data contains the desired data
      setRxNotesList(response.data.data);

      // Accessing faxId from the first item in the array (index 0)
      // if (response.data.data.length > 0) {
      //   setFaxIds(response.data.data[0].faxId);
      //   console.log(response.data.data[0].faxId);
      // }

      console.log("RxNotesList:", response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchNotesRxData = async () => {
    try {
      const userName = localStorage.getItem('userName');
      const response = await axiosBaseURL.get(`/api/v1/fax/showNotesPrevRxNameSearch/${patientNames}/${hcpNames}`);

      // Assuming response.data contains the desired data
      setRxNotesList(response.data.data);

      console.log("search notes flag :", searchNotesFlag)
      console.log("search notes list:", response.data.data);
      // Accessing faxId from the first item in the array (index 0)
      // if (response.data.data.length > 0) {
      //   setFaxIds(response.data.data[0].faxId);
      //   console.log(response.data.data[0].faxId);
      // }
    } catch (error) {
      console.error("Error fetching earch notes list:", error);
    }
  };

  useEffect(() => {
    fetchNotesRxData();
  }, []);

  const handleFaxStatus = (faxIds) => {
    setSelectedFaxId(faxIds);
    setShowFaxForm(true);
  };

  const handleRemoveNotesSubmit = () => {
    const userName = localStorage.getItem('userName');
    console.log("duplicate fax Id:", selectedNotesRxId.faxNotesId);
    const retryData = {

      userName: userName,
      faxIdMain: selectedNotesRxId.faxNotesId,
      faxIdDuplicate: faxId,
    };
    //console.log("duplicate fax Id:", trnFaxIdDuplicate);
    axiosBaseURL
      .put(`/api/v1/fax/removeRxNotes`, retryData, {
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        // Handle success
        console.log(" Rx Notes Removed successfully:", response.data);
        //window.location.reload();
        toast.success("Submitted successfully");
        fetchNotesRxData();
      })
      .catch((error) => {
        // Handle error
        console.error("Error Rx Notes Remove:", error);
        // window.location.reload();
        //toast.error("Failed to submit.");
        fetchNotesRxData();
      });
  };


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosBaseURL.get('/api/v1/fax/rxpatient');
        setAllPatients(response.data.data); // Assuming the response data is an array of patients
        console.log('setAllPatients', response.data.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const getAllPatientNames = async () => {
      try {
        const response = await axiosBaseURL.get('/api/v1/fax/searchPatientName');
        setSearchPatients(response.data.data);
        console.log("patients search list:", searchPatients);
      } catch (error) {
        console.error('Error fetching patients search list:', error);
      }
    };

    getAllPatientNames();
  }, []);

  const handlePatientInputChange = (e) => {
    const searchTerm = e.target.value;
    setPatientNames(searchTerm);
    // Filter the patients based on the search term if there's a search term; otherwise, show all patients
    const filteredResults = searchTerm
      ? searchPatients.filter(patient =>
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

    setFilteredPatients(filteredResults);
    setIsPatientListVisible(!!searchTerm);
  };

  const handlePatientSelection = (selectedPatient) => {
    setPatientNames(`${selectedPatient.patientName}`);
    setIsPatientListVisible(false);
  };

  const handlePatientInputClick = () => {
    setIsPatientListVisible(!isPatientListVisible);
  };

  useEffect(() => {
    const getAllHcpNames = async () => {
      try {
        const response = await axiosBaseURL.get('/api/v1/fax/searchHcpName');
        setSearchHcps(response.data.data);
        console.log("hcp search list:", searchHcps);
      } catch (error) {
        console.error('Error fetching hcp search list:', error);
      }
    };

    getAllHcpNames();
  }, []);

  const handleHcpsInputChange = (e) => {
    const searchTerm = e.target.value;
    setHcpNames(searchTerm);
    // Filter the patients based on the search term if there's a search term; otherwise, show all patients
    const filteredResults = searchTerm
      ? searchHcps.filter(hcps =>
        hcps.hcpName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

    setFilteredHcps(filteredResults);
    setIsHcpListVisible(!!searchTerm);
  };

  const handleHcpSelection = (selectedHcp) => {
    setHcpNames(`${selectedHcp.hcpName}`);
    setIsHcpListVisible(false);
  };
  const handleHcpInputClick = () => {
    setIsHcpListVisible(!isHcpListVisible);
  };

  const handleThumbnailClick = (pageIndex) => {
    setPageNumber(pageIndex + 1);
  };

  return (
    <>
      <Header_Navigation_Validate_Fax />
      <section className="w-full h-full absolute top-0 left-0 overflow-hidden -z-10 hidde">
        <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative  h-screen"></div>
        <div className="bg-left-design  bg-[#276A8C]  w-[500px] h-[500px]  absolute -left-[300px] -top-[150px] rotate-45 rounded-[80px] lg:w-[800px] lg:h-[800px] lg:-top-[10px] lg:-left-[410px] lg:rounded-[150px]"></div>
        <div className="bg-right-design  bg-[#276A8C] w-[500px] h-[500px] absolute -right-[300px] -bottom-[150px] -rotate-45 rounded-[80px] lg:w-[800px] lg:h-[800px] lg:bottom-[10px] lg:-right-[410px] lg:rounded-[150px]"></div>

        <div className="fixed top-12 lg:left-50 left-0 right-0 z-50 overflow-x-hidde">
          <div className="  relativ overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll  h-[calc(100vh-4rem)] no-scrollbar ">
            <div className="relativ  overflow-x-auto rounded-xl    overflow-y-scroll  h-[620px no-scrollbar  ">
              <div className="flex  flex-col justify-center items-center gap-1">
                <div className="w-full flex md:flex-row flex-col gap-5">
                  <div className="relative  md:w-[50%] w-full bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300 h-[calc(100vh-5.5rem)]  max-w2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">
                    <p className="text-[#596edb] text-xs absolute font-semibold top-0 right-40">
                      Fax ID: {faxId}
                    </p>
                    <p className="text-[#596edb] text-xs absolute font-semibold top-0 right-5">
                      {" "}
                      No Of Rx: {noOfRxs}
                    </p>
                    <div className="relative">
                      <p className="text-[#717171] text-sm absolute -top-6">
                        {pageNumber} of {numPages}
                      </p>
                    </div>
                    <div className="flex h-full">
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

                      <div className="w-4/5 overflow-hidden">
                        <div className="text-black overflow-hidden overflow-x-scroll overflow-y-scroll h-screen max-h-[75vh]">
                          {!isloading ? (
                            <Document
                              file={pdfData}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              <Page
                                pageNumber={pageNumber}
                                scale={scalePopUp}
                                width={400}
                                height={200}
                                rotate={rotate[pageNumber]}
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

                    <div className="relative">
                      <p className="text-[#717171] text-sm absolute top-2">
                        {pageNumber} of {numPages}
                      </p>
                    </div>

                    <div className="flex justify-center gap-2 mt-1">
                      <div
                        className={`text-white sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber <= 1 ? "bg-[#d9e0e3]" : "bg-[#00aee6]"
                          }`}
                        onClick={previousPage}
                      >
                        {" "}
                        <FaArrowLeft />
                      </div>
                      <div
                        className={`text-white sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber === numPages
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
                  <div className=" md:w-[50%] w-full relative">
                    <div className="flex flex-col h-full justify-betwee gap-5">
                      <div className="absolute hidde   right-1 z-50  w-full  md:h-3/6 h-[calc(100vh-25rem)] overflow-x-scroll bg-white rounded-2xl border-2 shadow-xl relativ overflow-y-auto">
                        <div className="flex justify-center ">
                          <hr className="h-px border-[#e36c09] border w-32 absolute   " />
                        </div>
                        <p className="absolute top-0 text-[#e36c09] text-sm flex justify-center w-full"></p>
                        <div className="absolute md:top-7 top-6  md:right-20 sm:right-10 right-2 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50">
                          {/* By Page */}
                          {/* <div
                            className="flex justify-around px-6"
                            onClick={() => handleOptionClick("By Page")}
                          >
                            <div className="flex relative">
                              <div className="text-lg absolute  -right-1 h-full bg-gray-100"></div>
                            </div>

                          </div> */}
                        </div>
                        {/* <div className="absolute md:top-7 top-6  md:left-20 sm:left-10 left-2 rounded-xl bg-[#] w-28  cursor-pointer z-50"> */}
                        {/* By Range */}
                        {/* <div
                            className="flex justify-around px-6"
                            onClick={() => handleOptionClick("By Range")}
                          >
                            <div className="flex relative">
                              <div className="text-lg absolute   -right-1 h-full bg-gray-100"></div>
                            </div>

                          </div> */}

                        {/* <div className="absolute md:top-7 top-6  md:left-20 sm:left-10 left-2 rounded-xl bg-[#] w-28   z-50"> */}
                        {/* Always show patient and HCP input fields */}
                        {/* <div className="absolute md:top-7 top-6 md:left-20 sm:left-10 left-2 rounded-xl bg-[#] w-28  z-50"> */}
                        {/* Always show patient and HCP input fields */}
                        {/* <div className="flex flex-col items-center relative "> */}
                        <div className="flex gap-1 relative left-10 top-2 md:h-2/5">
                          <div className="absolute left-1 ">
                            <label htmlFor="patientName" className="text-sm text-gray-600 overflow-hidden">
                              Patient Name:
                              <div className="flex items-center">
                                <div className="absoulute">
                                  <span
                                    title={`${sanitizedPatientFirstName} ${sanitizedPatientLastName}`}
                                    className="truncate inline-block max-w-[100px] cursor-pointer"
                                  >
                                    <strong>{`${sanitizedPatientFirstName} ${sanitizedPatientLastName}`}</strong>
                                  </span>
                                </div>
                              </div>
                            </label>
                            <input
                              type="text"
                              id="searchPatientName"
                              value={patientNames}
                              autoComplete="off"
                              onChange={handlePatientInputChange}
                              onClick={handlePatientInputClick}
                              className="border px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500"
                            />
                            {isPatientListVisible && (
                              <ul className="max-h-40 max-w-[12.5rem] overflow-y-auto">
                                {filteredPatients.map(patient => (
                                  <li key={patient.patientId} onClick={() => handlePatientSelection(patient)}>
                                    {patient.patientName}</li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="absolute right-80">
                            <label htmlFor="hcpName" className="text-sm text-gray-600 overflow-hidden">
                              HCP Name:
                              <div className="flex items-center">
                                <div className="absoulute">
                                  <span
                                    title={`${sanitizedHcpFirstName} ${sanitizedHcpLastName}`}
                                    className="truncate inline-block max-w-[100px] cursor-pointer"
                                  >
                                    <strong>{`${sanitizedHcpFirstName} ${sanitizedHcpLastName}`}</strong>
                                  </span>
                                </div>
                              </div>
                            </label>
                            <input
                              type="text"
                              id="searchHcpName"
                              value={hcpNames}
                              autoComplete="off"
                              onChange={handleHcpsInputChange}
                              onClick={handleHcpInputClick}
                              className="border px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500"
                            />
                            {isHcpListVisible && (
                              <ul className="max-h-40 max-w-[12.5rem] overflow-y-auto">
                                {filteredHcps.map(hcps => (
                                  <li key={hcps.hcpId} onClick={() => handleHcpSelection(hcps)} >{hcps.hcpName}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          {/* </div> */}


                          {/* </div> */}

                          <div style={{ marginLeft: '350px', margin: '150px', textAlign: 'center' }}>
                            <div className="absolute  right-20 top-10 cursor-pointer">
                              <div
                                className="text-white bg-[#00aee6]  px-4 py-2 rounded-lg"
                                onClick={handleSearch}
                              >
                                Search Rx
                              </div>
                            </div>
                          </div>



                        </div>

                        <div className="top-50 md:h-3/5">
                          <div className=" flex justify-center ">
                            <hr className=" h-px border-[#e36c09] border w-32  flex justify-center   " />
                          </div>
                          <p className=" top-30 text-[#e36c09] text-sm flex justify-center w-full">
                            List Of Notes Rx
                          </p>
                          <div className='top-30 bottom-10 pt-5'>
                            {rxNoteslist.length > 0 ? (
                              <p className="text-center bg-orange-300	 text-orange-600 m-1">
                                {`This note is currently attached to this following rx `}
                              </p>) : (
                              null
                            )}
                            {rxNoteslist.length > 0 ? (
                              <div className=" ">
                                <table className="w-full">
                                  <thead className=''>
                                    <tr className='text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl'>
                                      <th className="px-2 py-3 border">Select</th>
                                      <th className="px-2 py-3 border">RX ID</th>
                                      <th className="px-2 py-3 border">Case ID</th>

                                      <th className="px-2 py-3 border">Fax Date</th>
                                      {/* <th className="px-2 py-3 border">HCP</th> */}

                                      <th className="px-2 py-3 border" >Fax ID</th>


                                      {/* Add more headers based on your data structure */}
                                    </tr>

                                  </thead>
                                  <tbody>

                                    {rxNoteslist.map((rxNotes, indexNotes) => (
                                      <tr key={indexNotes}>
                                        <td className='bg-[#f2f2f2] text-gray-600 border px-14'>
                                          <input
                                            type="checkbox"
                                            id={`checkbox-${indexNotes}`}
                                            //checked={rx.trnRxId}
                                            // checked={isSelected(index,rx.trnRxId)}
                                            checked={isNotesSelected(indexNotes, rxNotes.trnRxId, rxNotes.faxId)}
                                            //defaultChecked={rx.trnRxId}
                                            onChange={() => handleNotesCheckboxChange(indexNotes, rxNotes.trnRxId, rxNotes.faxId)}
                                          />
                                        </td>
                                        <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rxNotes.trnRxId}</td>
                                        <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rxNotes.caseId}</td>

                                        <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rxNotes.faxDate}</td>
                                        {/* <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rx.hcpName}</td> */}

                                        <td className='bg-[#f2f2f2]  text-[#2683c2] border px-10 cursor-pointer' >{rxNotes.faxId}</td>


                                        {/* Add more cells based on your data structure */}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <div className=" text-white sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00aee6] 
                              rounded-lg flex justify-center md:text-base text-xs cursor-pointer mr-3 m-2" onClick={handleRemoveNotesSubmit}>
                                  Remove Rx From Notes
                                </div>
                              </div>

                            ) : (
                              <p className="text-center text-gray-600">No data available</p>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className=" absolute hidde bottom-20 w-full  md:h-2/5 bg-white rounded-2xl border-2 shadow-xl relativ overflow-y-auto">
                        <div className=" w-[calc(90vh-1rem) h-[calc(60vh-10rem)] 500 rounded-2xl border- shadow-xl relative">
                          <div className="flex justify-center ">
                            <hr className="h-px border-[#e36c09] border w-32 absolute flex justify-center   " />
                          </div>
                          <p className="absolute top-0 text-[#e36c09] text-sm flex justify-center w-full">
                            List Of Rx
                          </p>
                          <div className='pt-5'>
                            {rxlist.length > 0 ? (
                              <table className="w-full">
                                <thead className=''>
                                  <tr className='text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl'>
                                    <th className="px-2 py-3 border">Select</th>
                                    <th className="px-2 py-3 border">RX ID</th>
                                    <th className="px-2 py-3 border">Case ID</th>

                                    <th className="px-2 py-3 border">Fax Date</th>
                                    {/* <th className="px-2 py-3 border">HCP</th> */}

                                    <th className="px-2 py-3 border" >Fax ID</th>


                                    {/* Add more headers based on your data structure */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {rxlist.map((rx, index) => (
                                    <tr key={index}>
                                      <td className='bg-[#f2f2f2] text-gray-600 border px-14'>
                                        <input
                                          type="checkbox"
                                          id={`checkbox-${index}`}
                                          //checked={rx.trnRxId}
                                          // checked={isSelected(index,rx.trnRxId)}
                                          checked={isSelected(index, rx.trnRxId, rx.faxId, rx.trnFaxId)}
                                          //defaultChecked={rx.trnRxId}
                                          onChange={() => handleCheckboxChange(index, rx.trnRxId, rx.faxId, rx.trnFaxId)}
                                        />
                                      </td>
                                      <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rx.trnRxId}</td>
                                      <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rx.caseId}</td>

                                      <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rx.faxDate}</td>
                                      {/* <td className='bg-[#f2f2f2] text-gray-600 border px-10'>{rx.hcpName}</td> */}

                                      <td className='bg-[#f2f2f2]  text-[#2683c2] border px-10 cursor-pointer' onClick={() => handleFaxStatus(rx.faxId)}>{rx.faxId}</td>


                                      {/* Add more cells based on your data structure */}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-center text-gray-600">No data available</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="absolute hidde  bottom-7 top-100 right-1 z-50  w-full  md:h-0.5/5">
                        <div
                          className="  text-white sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-base text-xs cursor-pointer mr-3"
                          onClick={handleSubmit}
                        >
                          Attach Notes to Rx
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ToastContainer />
          </div>
        </div>
      </section >
      {showFaxForm && <FaxId_Form close_Form={() => setShowFaxForm(false)} sendFaxId={selectedFaxId} />}

    </>
  );
};

export default Validate_Note;
