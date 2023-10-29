import React, { useState, useEffect } from 'react';
import axiosBaseURL from '../axios';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { MdOutlineArrowDropDown } from 'react-icons/md';

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
  return (
    <>
      {
            <div className="w-ful  relative overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
              <div className="relative  overflow-x-auto rounded-xl    overflow-y-scroll  h-[640px] no-scrollbar ">
                <div className='flex md:flex-row flex-col gap-5'>
                  <div className='w-full h-screen  flex flex-col gap-2'>


            <section className=" h-scree  flex justify-center  bg-[#ffffff] md:px-0 px-4 ">
               
            <div className='w-full h-[calc(130vh-30rem)] bg-white rounded-2xl   border-2 shadow-xl relative overflow-y-scroll no-scrollbar '>
                            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                                <hr className=" border-[#e36c09] border w-32  absolute top-0 " />
                                <p className='absolute top-0 text-[#e36c09] text-sm'>Patient</p>
                            </div>


                   <form className=''>
                       <div className=' flex  flex-col xl:items-start items-center'>
                           <div className='px-5 pt-2'>
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
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                                type="text"
                                                id="ssn"
                                                name="ssn"
                                                value={ssn || ''}
                                                onChange={handleSsnChange}
                                               />
                                           </div>
                                           <p className="text-red-500 text-xs">{ssnError}</p>
                                       </div>
                                   </div>

                                   <div className='flex flex-col'>
                                       <div className=' flex items-center flex-row w-full g '>
                                           <div className=' flex  justify-start  flex-col w-full '>
                                               <label className='text-xs text-black w-28 text-start' htmlFor="">Phone No : </label>
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                               type="text"
                                               id="cellPhone"
                                               name="cellPhone"
                                               value={cellPhone || ''}
                                               onChange={handleCellPhoneChange}
                                               />
                                           </div>
                                           <p className="text-red-500 text-xs">{cellPhoneError}</p>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className='w-full pt-2 flex flex-col justify-around  px-4'>
                                    <div className=' flex flex-col'>
                                    <p className='text-xs text-black  w-28' htmlFor="">Ship to Address :</p>
                                    <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-full text-black h-5 text-xs mr-5'
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
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                               type="text"
                                               id="zip"
                                               name="zip"
                                               value={zip || ''}
                                               onChange={handleZipChange}
                                           />
                                           </div>
                                           <p className="text-red-500 text-xs">{zipError}</p>
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
                                               <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
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
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
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


                    {/* Patient Start ---------------------------*/}
                   
                    {/* Patient End ---------------------------*/}


                  </div>

                  <div className='w-full h-screen  bg-white rounded-xl border-2 shadow-xl relative'>
                    <div className='flex justify-center w-full gap-2 mt-1 absolute  bottom-2'>
                      <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowLeft /></div>
                      <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowRight /></div>
                    </div>

                    <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                      <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer'  > <LuPlus /></div>
                      <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus /></div>
                    </div>
                    <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                      <hr className="h-px border-[#e36c09] border w-32  absolut " />
                      <p className='absolute top-0 text-[#e36c09] text-sm'>Fax</p>
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