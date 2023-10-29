import React, { useState, useEffect } from 'react';
import axiosBaseURL from '../axios';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai'
import { MdAddBox } from 'react-icons/md'


import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DuplicateContext } from '../../context/DuplicateContext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import fax from "../../assets/pdf/fax.pdf"

import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Loader from '../Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const CaseDetailsNew = () => {
  const { trnRxId } = useParams();

  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientMiddleName, setPatientMiddleName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize dateOfBirth as null
  const [ssn, setSsn] = useState('');
  const [cellPhone, setCellPhone] = useState('');

  const [shipToAddress, setShipToAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const [repName, setSalesRepName] = useState('');
  const [repCell, setSalesRepCell] = useState('');
  const [yesNoValue, setYesNoValue] = useState('');
  const [placeOfService, setPlaceOfService] = useState(''); // Define placeOfService state
  const [distributor, setDistributor] = useState('');
  const [orderType, setOrderType] = useState(''); // Define orderInformation state
  const [woundActive, setActiveWound] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [distributorData, setDistributorData] = useState([]);
  const [states, setStates] = useState([]);
  const [patientId, setPatientId] = useState(''); 
  const [trnFaxId, setTrnFaxId] = useState('');
  const [faxId, setFaxId] = useState('');
  const [patientData, setPatientData] = useState({
    state: '', // Initialize patientData with an object containing 'state' property
  });
  const [patientInfo, setPatientInfo] = useState({ patientId: patientId,
    trnFaxId:trnFaxId,
    faxId:faxId,
    patientFirstName: patientFirstName,
   patientMiddleName:patientMiddleName,
   patientLastName:patientLastName,
   cellPhone: cellPhone,
   shipToAddress: shipToAddress,
   ssn: ssn,
   city:  city,
   state:patientData.state,
   zip: zip,
   dateOfBirth: dateOfBirth,
   repName:repName ,
   repPhoneNo:"repPhoneNo",
   placeOfService: placeOfService,
   distributorName: distributor,
   orderType: orderType,
   woundActive:woundActive, });

   const [cellPhoneError, setCellPhoneError] = useState('');
   const [zipError, setZipError] = useState('');
   const [ssnError, setSsnError] = useState('');


  // Total Save Call
  const handleSavePatientData = () => {
   handlePatientSave();
   handleWoundUpdate();
  handleWoundDelete();
  handleSaveKitClick();
  handleDeleteKitClick();
  handleSaveOfficeClick();
  handleSaveHcpClick();
  };
// Total Save Call

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axiosBaseURL.get(`/api/v1/fax/rxpatient/${trnRxId}`);
        const responseData = response.data;
        // console.log("responseData",responseData);
        // console.log("patientData",patientData);
        if (responseData && responseData.data && responseData.data.length > 0) {
          const patientData = responseData.data[0]
          // console.log("patientData",patientData.patientFirstName);
          setPatientFirstName(patientData.patientFirstName);
          setPatientMiddleName(patientData.patientMiddleName);
          setPatientLastName(patientData.patientLastName);
          setCellPhone(patientData.cellPhone);
          setShipToAddress(patientData.shipToAddress);
          setSsn(patientData.ssn)
          setCity(patientData.city);
          setPatientData({
            state: patientData.state,
            // Set other fields as well
          });
          setZip(patientData.zip);
          //  console.log(patientData.zip);
          setDateOfBirth(patientData.dateOfBirth);
          //  console.log(patientData.dateOfBirth);
          setSalesRepName(patientData.repName);
          setSalesRepCell(patientData.repPhoneNo);
          setPlaceOfService(patientData.placeOfService);
          setDistributor(patientData.distributorName);
          setOrderType(patientData.orderType);
          setActiveWound(patientData.woundActive)
          setPatientId(patientData.patientId);
          setTrnFaxId(patientData.trnFaxId);
          setFaxId(patientData.faxId);
          setIsLoading(false);
        } else {
          // Handle the case where no data is returned or the structure is different
          console.error('No patient data found.');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  useEffect(() => {
    // Define a function to fetch distributor data from the API
    const fetchDistributorData = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get('/api/v1/fax/distributorDetails', config);
        const distributorData = response.data.data; // Adjust based on API response structure

        setDistributorData(distributorData);
      } catch (error) {
        console.error('Error fetching distributor data:', error);
      }
    };

    // Call the fetchDistributorData function when the component mounts
    fetchDistributorData();
  }, []);
  useEffect(() => {
    // Define a function to fetch the state data from the API
    const fetchStateData = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get('/api/v1/fax/stateDetails', config);
        const stateData = response.data.data; // Assuming the API returns an array of states
        setStates(stateData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    // Call the fetchStateData function when the component mounts
    fetchStateData();
  }, []);

  const handlePatientSave = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    console.log("Patient Save Data Call")
  
    // Send the data to your API for saving
    const dataToSave = {
    patientId: patientId,
    trnFaxId:trnFaxId,
    faxId:faxId,
    patientFirstName: patientFirstName,
    patientMiddleName:patientMiddleName,
    patientLastName:patientLastName,
    cellPhone: cellPhone,
    shipToAddress: shipToAddress,
    ssn: ssn,
    city:  city,
    state:patientData.state,
    zip: zip,
    dateOfBirth: dateOfBirth,
    repName: repName,
    repPhoneNo:repCell,
    placeOfService: placeOfService,
    distributorName: distributor,
    orderType: orderType,
    woundActive:woundActive,
    };
  
    try {
      // Send a PUT request to your API to save the data and include the authorization header
      const response = await axiosBaseURL.put(`/api/v1/fax/rxpatient` ,dataToSave, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify(dataToSave),
      });
      if (response.status== 200) {
        // Data saved successfully
        alert('Data saved successfully.');
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleStateChange = (event) => {
    setPatientData({ ...patientData, state: event.target.value });
  };
  const handleCellPhoneChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 10);

    // Update the state and error message
    setCellPhone(truncatedValue);

    if (truncatedValue.length !== 10) {
      setCellPhoneError('Please enter only 10 digits .');
    } else {
      setCellPhoneError('');
    }
  };
  const handleZipChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 5);

    // Update the state and error message
    setZip(truncatedValue);

    if (truncatedValue.length !== 5) {
      setZipError('Please enter only 5 digits .');
    } else {
      setZipError('');
    }
  };

  const handleSsnChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 4);

    // Update the state and error message
    setSsn(truncatedValue);

    if (truncatedValue.length !== 4) {
      setSsnError('Please enter a valid 4-digit SSN.');
    } else {
      setSsnError('');
    }
  };

// WOUND START -------------------------------------------------
  const [woundData, setWoundData] = useState([]);
  const [deleteWoundData, setDeleteWoundData] = useState([]);
  const [woundDataRxId, setWoundDataRxId] = useState(null);
  const [woundDataTranFaxId, setWoundDataRxIdTranFaxID] = useState(null);
  const [woundDataFaxId, setWoundDataRxIdFaxID] = useState(null);
  const [newWound, setNewWound] = useState([]);
  const [isAddClicked, setIsAddClicked] = useState(false);


  useEffect(() => {
    console.log(newWound);
  }, [newWound]);

  useEffect(() => {
    console.log(woundData);
  }, [woundData]);

  useEffect(() => {
    console.log(deleteWoundData);
  }, [deleteWoundData]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('tokenTika');
            const config = {
                headers: {
                    //Authorization: `Bearer ${token}`,
                },
            };

            // Make a GET request to the API to fetch wound data
            const response = await axiosBaseURL.get(`/api/v1/fax/woundInfo/${trnRxId}`, config);
            const responseData = response.data;
            // const trnFaxId = responseData.data[0].trnFaxId;
            //  const woundNo = responseData.data[0].woundNo;
            //   setwoundNo(woundNo);
            //  console.log("woundN  ssso", woundNo);

            // setTrnFaxId(trnFaxId);
            // console.log("woundInforesponse",trnFaxId);
            console.log(responseData);
            if (responseData && responseData.data && responseData.data.length > 0) {
                // Update the woundData state variable with the retrieved data
                console.log("Woun responseData");
                console.log(responseData);
                setWoundData(responseData.data);
                setWoundDataRxId(responseData.data[0].trnRxId);
                setWoundDataRxIdTranFaxID(responseData.data[0].trnFaxId);
                setWoundDataRxIdFaxID(responseData.data[0].faxId);
                console.log(responseData.data);
            } else {
                // Handle the case where no wound data is found.
                console.error('No wound data found.');
            }
        } catch (error) {
            console.error('Error fetching wound data:', error);
        }
    };

    fetchData();
}, []);

const handleEditRowChange = (index, column, value) => {
    const updatedWoundData = [...woundData];
    updatedWoundData[index][column] = value;
    setWoundData(updatedWoundData);
};

 const handleAddWound = () => {
    alert("ADD");
    const updatedWoundData = {
      trnRxId:woundDataRxId,
      trnFaxId:woundDataTranFaxId,
      faxId:woundDataFaxId,
      woundNo: '',
      woundLocation: '',
      woundLength: '',
      woundWidth: '',
      woundDepth: '',
      woundType: '',
      drainage: '',
      debrided: '',
      icdCode: '',
      debridedDate:'',
      status:'insert'
    }
    console.log(updatedWoundData);
    setWoundData([...woundData, updatedWoundData]);
    setIsAddClicked(true);
  };

  const handleDeleteWound = (index) => {
    woundData[index]["status"] = "delete";
    const deletedData =woundData[index]
    setDeleteWoundData([...deleteWoundData,deletedData]);
    const updatedWoundData = woundData.filter((_, i) => i !== index);
    setWoundData(updatedWoundData);
  };

  const handleWoundUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      };

      alert("saving data");
      const updatedWoundData = woundData;
      const response = await axiosBaseURL.post(`/api/v1/fax/updateWoundInfoList`, updatedWoundData, config);
      //const woundNo = response.data.data.woundNo
    
      if (response.status === 200) {
        // The data was successfully updated. You can handle the success here.
        console.log('Data updated successfully.');

      } else {
        // Handle any errors or validation issues here.
        console.error('Error updating data:', response.data);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleWoundDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      };

      alert("deleting data");
      const updatedWoundData = deleteWoundData;
      

      console.log("Saving daata-->"+updatedWoundData)
      const response = await axiosBaseURL.post(`/api/v1/fax/updateWoundInfoList`, updatedWoundData, config);
      //const woundNo = response.data.data.woundNo
    
      if (response.status === 200) {
        // The data was successfully updated. You can handle the success here.
        console.log('Deleted updated successfully.');

      } else {
        // Handle any errors or validation issues here.
        console.error('Error updating data:', response.data);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
 

  // WOUND END -------------------------------------------------


  //KIT START
  const [kitData, setKitData] = useState([]);
  const [product, setProductData] = useState([]);
  const [deleteKit, setDeletKit] = useState([]); 
  const [kitDataRxId, setKitDataRxId] = useState(null);
  const [kitDataTranFaxId, setKitDataRxIdTranFaxID] = useState(null);
  const [kitDataFaxId, setKitDataRxIdFaxID] = useState(null);

  useEffect(() => {
    console.log(kitData);
  }, [kitData]);
  useEffect(() => {
    console.log(deleteKit);
  }, [deleteKit]);

  const handleKitEditRowChange = (index, column, value) => {
    const updateKitData = [...kitData];
    if(column == "wnd1" || column == "wnd2" || column == "wnd3"){
       if(value){
        value=1;
       }else{
        value=0;
       }
    }
    updateKitData[index][column] = value;
    setKitData(updateKitData);
  };

  const handleAddKit = () => {
    alert("ADD");
    const addKitData = {
      trnRxId:kitDataRxId,
      trnFaxId:kitDataTranFaxId,
      faxId:kitDataFaxId,
      productId: '',
      productCode: '',
      productDisplayName:'',
      quantity: '',
      wnd1: 0,
      wnd2: 0,
      wnd3: 0,
      wnd4: 0,
      wndCode:'',
      status:'insert'
    }
    console.log(addKitData);
    setKitData([...kitData, addKitData]);
  };

  const handleDeleteKit = (index) => {
    kitData[index]["status"] = "delete";
    const deletedData =kitData[index]
    setDeletKit([...deleteKit,deletedData]);
    const updatedKitData = kitData.filter((_, i) => i !== index);
    setKitData(updatedKitData);
  };

  useEffect(() => {
    // Define a function to fetch the state data from the API
    const fetchProductData = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get('/api/v1/fax/productInfo', config);
        const productData = response.data.data; // Assuming the API returns an array of states
        setProductData(productData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };

    // Call the fetchStateData function when the component mounts
    fetchProductData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('tokenTika');
            const config = {
                headers: {
                    //Authorization: `Bearer ${token}`,
                },
            };

            // Make a GET request to the API to fetch product data
            const response = await axiosBaseURL.get(`/api/v1/fax/productInfo/${trnRxId}`, config);
            const responseData = response.data;

            if (responseData && responseData.data && responseData.data.length > 0) {
                console.log("KIT Datttttt--->",responseData.data);
                setKitData(responseData.data);
                setKitDataRxId(responseData.data[0].trnRxId);
                setKitDataRxIdTranFaxID(responseData.data[0].trnFaxId);
                setKitDataRxIdFaxID(responseData.data[0].faxId);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
},[]);


const handleSaveKitClick = () => {

  // Get the token from your authentication mechanism, e.g., localStorage
  const token = localStorage.getItem('token');

  // Define the request headers with the Authorization header
  const config = {
    headers: {
      //Authorization: `Bearer ${token}`,
    },
  };
   alert("save Kit Data");
   console.log('Data Saving:', kitData);
   const dataToSave =kitData;
  // Send a POST request to the API with the headers
  axiosBaseURL
    .post('/api/v1/fax/updateProductInfoList', dataToSave, config)
    .then((response) => {
      // Handle the response from the API if needed
      console.log('Data saved successfully:', response.data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error saving data:', error);
    });
};

const handleDeleteKitClick = () => {

  // Get the token from your authentication mechanism, e.g., localStorage
  const token = localStorage.getItem('token');

  // Define the request headers with the Authorization header
  const config = {
    headers: {
      //Authorization: `Bearer ${token}`,
    },
  };
   alert("Delete Kit Data");
   console.log('Delete Data Saving:', deleteKit);
   const dataToSave =deleteKit;
  // Send a POST request to the API with the headers
  axiosBaseURL
    .post('/api/v1/fax/updateProductInfoList', dataToSave, config)
    .then((response) => {
      // Handle the response from the API if needed
      console.log('Data saved successfully:', response.data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error saving data:', error);
    });
};


  //KIT END


  //Physician Start
  const [newApiData, setNewApiData] = useState([])
  const [officeData, setOfficeData] = useState([]);


  const [hcpData, setHcpData] = useState([]);
  const [deleteHcp, setDeletHcp] = useState([]); 
  const [hcpDataRxId, setHcpDataRxId] = useState(null);
  const [hcpDataTranFaxId, setHcpDataRxIdTranFaxID] = useState(null);
  const [hcpDataFaxId, setHcpDataRxIdFaxID] = useState(null);


  useEffect(() => {
    console.log(hcpData);
  }, [hcpData]);
  useEffect(() => {
    console.log(deleteHcp);
  }, [deleteHcp]);

  const handleHcpEditRowChange = (index, column, value) => {
    const updateHcpData = [...hcpData];
    if(column == "signature_Flag"){
       if(value){
        value=1;
       }else{
        value=0;
       }
    }
    updateHcpData[index][column] = value;
    setHcpData(updateHcpData);
  };

  const handleAddHcp = () => {
    alert("ADD HCP");
    const addHcpData = {
      trnRxId:kitDataRxId,
      trnFaxId:kitDataTranFaxId,
      faxId:kitDataFaxId,
      hcpId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      provider_Type: '',
      npi: '',
      signature_Flag: '',
      signature_Date: '',
      profId:'',
      status:'insert'
    }
    console.log(addHcpData);
    setHcpData([...hcpData, addHcpData]);
  };

/*   const handleDeleteHcp = (index) => {
    hcpData[index]["status"] = "delete";
    const deletedData =hcpData[index]
    setDeletKit([...deleteHcp,deletedData]);
    const updatedHcpData = hcpData.filter((_, i) => i !== index);
    setHcpData(updatedHcpData);
  };
 */

  const handleOfficeInputChange = (e) => {
    const { name, value } = e.target;
    setOfficeData({
      ...officeData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
           // Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get(`/api/v1/fax/hcpInfo/${trnRxId}`, config);
        //const trnFaxId = response.data.data[0].trnFaxId;
        // setTrnFaxId(trnFaxId);
        setHcpData(response.data.data);
        //  setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchOfficeInfo = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
           // Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get(`/api/v1/fax/officeInfo/${trnRxId}`, config);
        const officeInfo = response.data.data[0];
        console.log("Office Data---->");
        console.log(officeInfo);
        setOfficeData(officeInfo);
        ///console.log(officeName);
      } catch (error) {
        console.error('Error fetching office data:', error);
      }
    };

    fetchOfficeInfo();
  }, []);


  const handleSaveOfficeClick = () => {

    // Get the token from your authentication mechanism, e.g., localStorage
    const token = localStorage.getItem('token');
  
    // Define the request headers with the Authorization header
    const config = {
      headers: {
        //Authorization: `Bearer ${token}`,
      },
    };
     alert("save Office Data");
     console.log('Data Saving:', officeData);
     const dataToSave =officeData;
    // Send a POST request to the API with the headers
    axiosBaseURL
      .put('/api/v1/fax/officeInfo', dataToSave, config)
      .then((response) => {
        // Handle the response from the API if needed
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error saving data:', error);
      });
  };
  

  const handleSaveHcpClick = () => {

    // Get the token from your authentication mechanism, e.g., localStorage
    const token = localStorage.getItem('token');
  
    // Define the request headers with the Authorization header
    const config = {
      headers: {
        //Authorization: `Bearer ${token}`,
      },
    };
     alert("save Hcp Data");
     console.log('Data Saving:', hcpData);
     const dataToSave =hcpData;
    // Send a POST request to the API with the headers
    axiosBaseURL
      .post('/api/v1/fax/updateHCPInfoList', dataToSave, config)
      .then((response) => {
        // Handle the response from the API if needed
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error saving data:', error);
      });
  };
  

  //Physician End


  //PDF RENDER START

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = useState(null);
  const [isPdfloading, setIsPdfLoading] = useState(false)
  const [scalePopUp, setScalePopoup] = useState(1);
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const previousPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  }

  const nextPage = () => {
    setPageNumber(pageNumber >= numPages ? pageNumber : pageNumber + 1);
  }

  useEffect(() => {
    const fetchPdf = async () => {
      setIsPdfLoading(true)
      try {
        const response = await axiosBaseURL.get(
          "https://dev.tika.mobi:8443/next-service/api/v1/fax/getFaxPdf/1509414370",
          { responseType: 'arraybuffer' }
        );
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setIsPdfLoading(false)
        setPdfData(url);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  const zoomOutSecond = () => {
    setScale(scale -0.2);
}

const zoomInSecond = () => {
    setScale(scale+0.2);
}
// const onDocumentLoadSuccess = ({ numPages2 }) => {
//     setNumPages2(numPages2);
// }
  //PDF RENDER END 

  return (
    <>
      {
      <div className="w-ful  relative overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll max-h-[636px h-[calc(120%-4rem)] no-scrollbar">
          <div className="relative  overflow-x-auto rounded-xl    overflow-y-scroll  h-[620px] scrollbar ">
              <div className='flex md:flex-row flex-col gap-5'>
                  <div className='w-full flex flex-col gap-2'>

            {/* Patient Start ---------------------------*/}
            <section className=" ">
            <div className='w-full h-[calc(130vh-30rem)] bg-white rounded-2xl   border-2 shadow-xl relative overflow-y-scroll no-scrollbar '>
                            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                                <hr className=" border-[#e36c09] border w-32  absolute top-0 " />
                                <p className='absolute top-0 text-[#e36c09] text-sm'>Patient</p>
                                <p className='text-[#596edb] text-xs absolute top-1 left-4'>Netsuit Patient ID:23214234</p>
                                <p className='text-[#596edb] text-xs absolute top-1 right-10'>Tika ID:12053</p>
                            </div>


                   <form className=''>
                       <div className=' flex  flex-col xl:items-start items-center'>
                           <div className='px-5 pt-5'>
                               <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-full text-start' htmlFor="">First Name :</label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={patientFirstName || ''}
                                                    onChange={(e) => setPatientFirstName(e.target.value)}
                                                />
                                           </div>
                                       </div>
                                   </div>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">Middle Name : </label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                                 type="text"
                                                 id="middleName"
                                                 name="middleName"
                                                 value={patientMiddleName || ''}
                                                 onChange={(e) => setPatientMiddleName(e.target.value)}
                                               />
                                           </div>
                                       </div>
                                   </div>

                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">Last Name :</label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={patientLastName || ''}
                                                onChange={(e) => setPatientLastName(e.target.value)}                             
                                               />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className='px-5 pt-2'>
                               <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-full text-start' htmlFor="">Date Of Birth: </label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                                type="text"
                                                id="dateOfBirth"
                                                name="dateOfBirth"
                                                value={dateOfBirth || ''}
                                                onChange={(e) => setDateOfBirth(e.target.value)}                                        />
                                           </div>
                                       </div>
                                   </div>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">Last 4 of SSN : </label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                                type="text"
                                                id="ssn"
                                                name="ssn"
                                                value={ssn || ''}
                                                onChange={handleSsnChange}
                                               />
                                                <p className="text-red-500 text-xs">{ssnError}</p>
                                           </div>
                                          
                                       </div>
                                   </div>

                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">Phone No : </label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1'
                                               type="text"
                                               id="cellPhone"
                                               name="cellPhone"
                                               value={cellPhone || ''}
                                               onChange={handleCellPhoneChange}
                                               />
                                                <p className="text-red-500 text-xs">{cellPhoneError}</p>
                                           </div>
                                          
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className='w-full pt-2 flex flex-col justify-around  px-4'>
                                    <div className=' flex flex-col'>
                                    <p className='text-xs text-black  w-28' htmlFor="">Ship to Address :</p>
                                    <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-full text-black h-5 text-xs mr-5 t-1'
                                        type="text"
                                        id="shipToAddress"
                                        name="shipToAddress"
                                        value={shipToAddress || ''}
                                        onChange={(e) => setShipToAddress(e.target.value)}
                                    />
                                    </div>
                            </div>

                           <div className='px-5 pt-2'>
                               <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-full text-start' htmlFor="">City: </label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                               type="text"
                                               id="city"
                                               name="city"
                                               value={city || ''}
                                               onChange={(e) => setCity(e.target.value)}
                                               />
                               
                                           </div>
                                       </div>
                                   </div>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">State : </label>
                                    <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1'
                                        value={patientData.state}
                                        onChange={(e) => setPatientData({ ...patientData, state: e.target.value })}

                                    >
                                        {states.map((state) => (
                                        <option key={state.stateName} value={state.shortName}>
                                            {state.stateName}
                                        </option>
                                        ))}
                                    </select>
                                           </div>
                                       </div>
                                   </div>

                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w- text-start' htmlFor="">Zip :</label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                               type="text"
                                               id="zip"
                                               name="zip"
                                               value={zip || ''}
                                               onChange={handleZipChange}
                                           />
                                           <p className="text-red-500 text-xs">{zipError}</p>
                                           </div>
                                           
                                       </div>
                                   </div>
                               </div>
                           </div>
                           
                           <hr className='px-2 w-full my-1 border-center border-gray-300' />
                           <div className='px-5 pt-2'>
                               <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                           <p className='text-xs text-black    ' htmlFor="">Sales Rep Name:</p>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                               type="text"
                                               id="salesRepName"
                                               name="salesRepName"
                                               value={repName || ''}
                                               onChange={(e) => setSalesRepName(e.target.value)}
                                               />
                               
                                           </div>
                                       </div>
                                   </div>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                           <label className='text-xs text-black w- text-start' htmlFor="">Sales Rep Cell: :</label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                               type="text"
                                               id="salesRepCell"
                                                name="salesRepCell"
                                                value={repCell || ''}
                                                onChange={(e) => setSalesRepCell(e.target.value)}
                                           />
                                           </div>
                                       </div>
                                   </div>

                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                       <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">Distributer: : </label>
                                    <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1'
                                        value={distributor}
                                        onChange={(e) => setDistributor(e.target.value)}
                                    >
                                        {distributorData.map((item) => (
                                        <option key={item.distributorId} value={item.distributorName}>
                                            {item.distributorName}
                                        </option>
                                        ))}
                                    </select>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           
                           <div className='px-5 pt-2'>
                               <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                       <div className=' flex  justify-start  flex-col w-full '>
                                        <label className='text-xs text-black w-28 text-start' htmlFor="">Place of Service: </label>
                                                <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1'
                                                    name="placeOfService"

                                        id="placeOfService"
                                        value={placeOfService || ''}
                                        onChange={(e) => setPlaceOfService(e.target.value)}

                                        >
                                        <option value={placeOfService}>{placeOfService}</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        </select>
                                           </div>
                                       </div>
                                   </div>
                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                       <div className=' flex  justify-start  flex-col w-full '>
                                        <label className='text-xs text-black w-28 text-start' htmlFor="">Order Information: : </label>
                                                <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1'
                                                    name="orderType"

                                        id="orderType"
                                        value={orderType || ''}
                                        onChange={(e) => setOrderType(e.target.value)}

                                    >
                                        <option value={orderType}>{orderType}</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                           </div>
                                       </div>
                                   </div>

                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                       <div className=' flex  justify-start  flex-col w-full '>
                                        <label className='text-xs text-black w-full text-start' htmlFor="">Does patient still have an active wound?:</label>
                                    <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1'
                                                   name="woundActive"

                                        id="woundActive"
                                        value={woundActive || ''}
                                        onChange={(e) => setActiveWound(e.target.value)} >
                                        <option value={woundActive}>{woundActive}</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>

                       </div>
                   </form>
               </div>
           </section>
                   
          {/* Patient End ---------------------------*/}

      {/* Order and Kit Start ---------------------------*/}
      <div className='w-full h-[calc(130vh-30rem)] bg-white rounded-2xl   border-2 shadow-xl relative overflow-y-scroll no-scrollbar '>
            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                <hr className="h-px border-[#e36c09] border w-32  absolut " />
                <p className='absolute top-0 text-[#e36c09] text-sm'>Order Information</p>
            </div>
            <div>
                {}
                <div className='absolute md:top-1 top-6  right-3 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50' onClick={handleAddWound}  >
                    <div className=' flex justify-around px-1'>
                        <div className='flex  relative'>
                            <MdAddBox className='text-lg' />
                            <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                        </div>

                        <p className='text-white text-xs'

                        >ADD</p>
                    </div>

                </div>
                {}


                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll    no-scrollbar md:mt-8 mt-14">
                    <table className="w-f text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                                <th className="px-2 py-3   border ">Wound <span>(WND)#</span></th>
                                <th className="px-2 py-3  border ">Location</th>
                                <th className="px-2 py-3  border ">Length <span>(cm)</span></th>
                                <th className="px-2 py-3  border ">Width <span>(cm)</span></th>
                                <th className="px-2 py-3  border ">Depth <span>(cm)</span></th>
                                <th className="px-2 py-3  border ">Wound <span>Stage</span></th>
                                <th className="px-2 py-3  border ">Drainage</th>
                                <th className="px-2 py-3  border  ">Debrided</th>
                                <th className="px-2 py-3  border  ">ICD-10 <span>Code</span></th>
                                <th className="px-2 py-3  border  ">Debridement <span>Date</span></th>
                                <th className="px-2 py-3  border  ">Debridement <span>Type</span></th>
                                <th className="px-2 py-3  border  ">Delete</th>
                            </tr>
                        </thead>


                        <tbody  >
                            {woundData.map((row, index) => (
                                <tr key={index} >
                                    <td className="p-1 rounded-2xl border">
                                        <input type="text" name="woundNo" id="woundNo" value={row.woundNo} 
                                        onChange={(e) => handleEditRowChange(index, 'woundNo', e.target.value)}
                                        className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'/>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-14 text-xs'
                                         name="woundLocation" id="woundLocation"
                                         onChange={(e) => handleEditRowChange(index, 'woundLocation', e.target.value)}>
                                            <option value={row.woundLocation}>{row.woundLocation}</option>
                                            <option value="LT">LT</option>
                                            <option value="RT">RT</option>
                                        </select>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <input type="text" name="woundLength" id="woundLength" value={row.woundLength} 
                                        onChange={(e) => handleEditRowChange(index, 'woundLength', e.target.value)}
                                        className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'/>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <input type="text" name="woundLength" id="woundWidth" value={row.woundWidth} 
                                        onChange={(e) => handleEditRowChange(index, 'woundWidth', e.target.value)}
                                        className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'/>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <input type="text" name="woundDepth" id="woundWidth" value={row.woundDepth} 
                                        onChange={(e) => handleEditRowChange(index, 'woundDepth', e.target.value)}
                                        className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'/>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <p className='bg-gray-200 rounded-3xl py- px-'>
                                            <select className='bg-gray-200 text-gray-600 rounded-3xl h-5 px-1 text-xs'   
                                             name="woundThickness" id="woundThickness"
                                            onChange={(e) => handleEditRowChange(index, 'woundThickness', e.target.value)}>
                                                <option value={row.woundThickness}>{row.woundThickness}</option>
                                            </select>
                                        </p>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <p className='bg-gray-200 rounded-3xl py- px-'>
                                            <select className='bg-gray-200 text-gray-600 rounded-3xl h-5 px-1 text-xs'
                                             name="drainage" id="drainage"
                                            onChange={(e) => handleEditRowChange(index, 'drainage', e.target.value)}>
                                                <option value={row.drainage}>{row.drainage}</option>
                                            </select>
                                        </p>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <p className='bg-gray-200 rounded-3xl py- px-'>
                                            <select className='bg-gray-200 text-gray-600 rounded-3xl h-5 px-1 text-xs' 
                                            name="debrided" id="debrided"
                                            onChange={(e) => handleEditRowChange(index, 'debrided', e.target.value)}>
                                                <option value={row.debrided}>{row.debrided}</option>
                                            </select>
                                        </p>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <input type="text" name="icdCode" id="icdCode" value={row.icdCode} 
                                        onChange={(e) => handleEditRowChange(index, 'icdCode', e.target.value)}
                                        className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'/>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <input type="text" name="debridedDate" id="debridedDate" value={row.debridedDate} 
                                        onChange={(e) => handleEditRowChange(index, 'debridedDate', e.target.value)}
                                        className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'/>
                                    </td>
                                    <td className="p-1 rounded-2xl border">
                                        <p className='bg-gray-200 rounded-3xl py- px-'>
                                            <select className='bg-gray-200 text-gray-600 rounded-3xl h-5 px-1 text-xs' 
                                             name="debridedType" id="debridedType"
                                            onChange={(e) => handleEditRowChange(index, 'debridedType', e.target.value)}>
                                                <option value={row.debridedType}>{row.debridedType}</option>
                                            </select>
                                        </p>
                                    </td>
                                    <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center border" onClick={() => handleDeleteWound(index)}>
                                        <AiFillCloseSquare />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
               </div>
            </div>
        </div>
        {/* Order and Kit End ---------------------------*/}

       {/*  Kit Start ---------------------------*/}
       <div className='w-full h-[150px] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll scrollbar'>
            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                <hr className="h-px border-[#e36c09] border w-32  absolut " />
                <p className='absolute top-50  text-[#e36c09] text-sm'>Kit Information</p>
            </div>
            <div className='absolute -bottom  right-3 rounded-xl bg-[#00aee6] w-28  cursor-pointer' onClick={handleAddKit}>
                <div className=' flex justify-around px-1'>
                    <div className='flex  relative'>
                        <MdAddBox className='text-lg' />
                        <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                    </div>
                    <p className='text-white text-xs'>ADD</p>
                </div>
            </div>
                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll   no-scrollbar mt-8">
                    <table className="w-f text-sm text-center table-auto  w-full ">
                        <thead className="">
                            <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                                <th className="px-2 py-3 border">Kit Number</th>
                                <th className="px-2 py-3 border">Frequency</th>
                                <th className="px-2 py-3 border">(WND)1</th>
                                <th className="px-2 py-3 border">(WND)2</th>
                                <th className="px-2 py-3 border">(WND)3</th>
                                <th className="px-2 py-3 border">Delete</th>
                            </tr>
                        </thead>  
                        <tbody>
                            {kitData.map((kit, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f2f2f2]'}>
                                    <td className="p-1 border">
                                        <select className='bg-[#f2f2f2] text-gray-600 rounded-3xl h-5 w-24 border text-xs'
                                         value={kit.productCode}
                                         onChange={(e) => handleKitEditRowChange(index, 'productCode', e.target.value)}>
                                        <option value={kit.productCode} className=''>{kit.productCode}</option>

                                        {product.map((product) => (
                                        <option key={product.productCode} value={product.productCode}>
                                            {product.productCode}
                                        </option>
                                        ))}
                                        </select>
                                    </td>
                                    <td className="p-1 border">
                                        <select className='bg-[#f2f2f2] text-gray-600 rounded-3xl h-5 w-24 border text-xs'
                                         value={kit.quantity}
                                         onChange={(e) => handleKitEditRowChange(index, 'quantity', e.target.value)}>
                                          <option value={kit.quantity}>{kit.quantity}</option>
                                          <option value="15">15</option>
                                          <option value="30">30</option>
                                          <option value="45">45</option>
                                          <option value="60">60</option>
                                        </select>
                                    </td>
                                    <td className="p-1 border">
                                        <input
                                            type="checkbox"
                                            className="relative h-3 w-3 cursor-pointer"
                                            id={`checkbox-${index}`}
                                            defaultChecked={kit.wnd1}
                                            onChange={(e) => handleKitEditRowChange(index, 'wnd1', e.target.checked)}
                                        />
                                    </td>
                                    <td className="p-1 border">
                                        <input
                                            type="checkbox"
                                            className="relative h-3 w-3 cursor-pointer"
                                            id={`checkbox-${index}`}
                                            defaultChecked={kit.wnd2}
                                            onChange={(e) => handleKitEditRowChange(index, 'wnd2', e.target.checked)}
                                        />
                                    </td>
                                    <td className="p-1 border-2">
                                        <input
                                            type="checkbox"
                                            className="relative h-3 w-3 cursor-pointer"
                                            id={`checkbox-${index}`}
                                            defaultChecked={kit.wnd3}
                                            onChange={(e) => handleKitEditRowChange(index, 'wnd3', e.target.checked)}
                                        />
                                    </td>
                                    <td className="p-1 rounded-2xl flex justify-center text-xl text-red-600 mt-2 items-center" onClick={() => handleDeleteKit(index)}>
                                        <AiFillCloseSquare />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
                {/*  Kit end ---------------------------*/}


                  {/*  Physician Start ---------------------------*/}
          <div className='w-full h-[calc(120vh-30rem)] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll flex md:flex-row flex-col items-center gap-5 scrollbar'>
            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09] absolute top-0  '>
              <hr className="h-px border-[#e36c09] border w-32  absolut " />
              <p className='absolute top-0 text-[#e36c09] text-sm'>Physicain</p>
            </div>
            <div className='flex flex-col justify-center w-full items-center  md:pt-10 pt-5 pl-5'>
 

              <div className=' flex  items-center  gap-5 '>
                <p className='text-xs text-black' htmlFor="">Office Name:</p>
                <input className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
                  type="text"
                  name="accountName"
                  id='accountName'
                  value={officeData.accountName}
                  onChange={handleOfficeInputChange}
                />
              </div>
              
              <div className=' flex  items-center  gap-5 pt-1'>
                <p className='text-xs text-black pl-1   ' htmlFor="">Cell Phone:</p>
                <input className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
                type="text"
                id='cellPhone'
                name="cellPhone"
                value={officeData.cellPhone}
                onChange={handleOfficeInputChange}
                />
              </div>

                    <div className=' flex  items-center  gap-5 pt-1'>
                      <p className='text-xs text-black pl-7   ' htmlFor="">Email:</p>
                      <input className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
                      type="text"
                      id='cellPhone'
                      name="email"
                      value={officeData.email}
                      onChange={handleOfficeInputChange}
                      />
                    </div>

                    <div className=' flex  items-center  gap-5 pt-1'>
                      <p className='text-xs text-black pl-8   ' htmlFor="">City:</p>
                      <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
                        type="text"
                        value={officeData.city}
                        name="city"
                        onChange={handleOfficeInputChange}
                      />
                    </div>

                    <div className=' flex  items-center  gap-5 pt-1'>
                      <p className='text-xs text-black pl-[25px]   ' htmlFor="">State:</p>
                      <select className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
                          // style={{ width: '7rem', margin: '2px' }}
                          fullWidth
                          size="small"
                          name="state"
                          value={officeData.state}
                          onChange={handleOfficeInputChange}
                        >
                          {states.map((state) => (
                            <option key={state.stateName} value={state.shortName}>
                              {state.stateName}
                            </option>
                          ))}
                        </select>
                    </div>

                    <div className=' flex  items-center  gap-5 pt-1'>
                      <p className='text-xs text-black pl-8   ' htmlFor="">ZIp:</p>
                      <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
                        type="text"
                        value={officeData.zip}
                        name="zip"
                        onChange={handleOfficeInputChange}
                      />
                    </div>

                  </div>

                  <div className='hidde' >
                    <div className='flex  justify-end'>
                      <div className='absolut  md:top-0 top-6  right-3 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50'
                        onClick={handleAddHcp}
                      >
                        <div className=' flex justify-around px-1'>
                          <div className='flex  relative'>
                            <MdAddBox className='text-lg' />
                            <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                          </div>

                          <p className='text-white text-xs'

                          >ADD</p>
                        </div>
                      </div>
                    </div>

                    <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll   no-scrollbar">
                      <table className=" text-sm text-center table-auto   ">
                        <thead className="">
                          <tr className="text-xs text-white font-bold bg-[#246180] rounded-2xl ">
                            <th className="px-2 py-3  border">Signed</th>
                            <th className="px-2 py-3 border">First Name</th>
                            <th className="px-2 py-3 border">Middle Name</th>
                            <th className="px-2 py-3 border">Last Name</th>
                            <th className="px-2 py-3 border">NPI</th>
                           {/*  <th className="px-2 py-3  border">Delete</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {hcpData.map((data, index) => (
                            <tr key={index}
                            // className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}
                            >
                              <td className="p-1">
                                <input 
                                  type="checkbox"
                                  className="relative h-3 w-3 cursor-pointer"
                                  id={`checkbox-${index}`}
                                  defaultChecked={data.signed}
                                  onChange={(e) => handleHcpEditRowChange(index, 'signed', e.target.checked)}
                                />
                              </td>
                              <td className="p- rounded-2xl border">
                                <input  className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'
                                            type="text"
                                            id='firstName'
                                            name='firstName'
                                            value= {data.firstName}
                                            onChange={(e) => handleHcpEditRowChange(index, 'firstName', e.target.value)}
                                        />
                              </td>
                              <td className="p- rounded-2xl border">
                                <input  className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'
                                            type="text"
                                            id='middleName'
                                            name='middleName'
                                            value= {data.middleName}
                                            onChange={(e) => handleHcpEditRowChange(index, 'middleName', e.target.value)}
                                        />
                                </td>
                              <td className="p- rounded-2xl border">
                                <input  className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'
                                            type="text"
                                            id='lastName'
                                            name='lastName'
                                            value= {data.lastName}
                                            onChange={(e) => handleHcpEditRowChange(index, 'lastName', e.target.value)}
                                        />
                              </td>
                              <td className="p- rounded-2xl border">
                                <input  className='bg-gray-200 text-gray-600 rounded-3xl h-5 w-10 text-xs'
                                            type="text"
                                            id='npi'
                                            name='npi'
                                            value= {data.npi}
                                            onChange={(e) => handleHcpEditRowChange(index, 'npi', e.target.value)}
                                        />
                                
                                </td>
{/*                               <td className="className='bg-gray-300 text-gray600 p-1 border   flex justify-center text-xl text-red-600  items-center" onClick={() => handleDeleteKit(index)}>
                                <AiFillCloseSquare />
                              </td> */}
                            </tr>
                          ))}

                        </tbody>
                      </table>
                    </div>
                  </div>
                  </div>
                  {/*  Physician End ---------------------------*/}
      </div>

            <div className='w-full h-screen  bg-white rounded-xl border-2 shadow-xl relative'>
            <div className='text-white w-full lg:h-[calc(100%-1rem)] h-screen bg-[#ffff] shadow-2xl border-2  rounded-xl  relative  flex justify-center pt-10'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full  flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber <=1 ? "bg-[#d9e0e3]": "bg-[#00aee6]" }`} onClick={previousPage}> <FaArrowLeft /></div>
                            <div className={`sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs z-50 ${pageNumber === numPages? "bg-[#e7eaea]" : "bg-[#00aee6]"}`} onClick={nextPage}> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer ' onClick={zoomInSecond}> <ZoomInIcon className='md:text-base text-xs' /></div>
                            <div className=' rounded-lg md:w-7 w-5 h-5 md:h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' onClick={zoomOutSecond}> <ZoomOutIcon className='md:text-base text-xs' /></div>
                        </div>

                        <div className='xl:w-[calc(100%-100px)] md:w-[calc(100%-150px)]  w-[calc(100%-70px)]   h-[calc(100%-100px)] border overflow-y-scroll absolute overflow-hidden no-scrollbar no-scrollbar  '>
                            <div className=' w-full h-full  '>
                                <div className='text-black overflow-hidden  no-scrollbar overflow-x-scroll overflow-y-scroll'>

                                    {
                                        !isPdfloading ?
                                            <>

                                                <Document className=" "

                                                    file={pdfData}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={pageNumber} scale={scale}
                                                        width={500}
                                                        height={500}

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
                            <p className='text-[#717171] text-sm absolute md:top-2 md:bottom-0 -bottom-10 w-20'>Page: {pageNumber}</p>
                        </div>

                        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                            <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                            <p className='absolute top-0 text-[#e36c09] text-sm'>Fax</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex csm:flex-row flex-col  p-1 csm:justify-evenly justify-center items-center sm:gap-0 csm:gap-5 gap-3'>
                  <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#e60000] rounded-lg flex justify-center md:text-base text-xs'>Discard</div>
                  <div className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-lg flex justify-center md:text-base text-xs' onClick={handleSavePatientData}>Save</div>
                  <div className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-base text-xs cursor-pointer'>Ready for Review</div>
                </div>
    </div>
  </div>
      }
    </>

  )
}

export default CaseDetailsNew