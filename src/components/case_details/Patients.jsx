import React, { useState, useEffect } from 'react';
import axiosBaseURL from '../axios';
import { useParams } from 'react-router-dom';

const Patients = ({ sendfaxId,savePatientData }) => {
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientMiddleName, setPatientMiddleName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');

  const [cellPhone, setCellPhone] = useState('');
  const [shipToAddress, setShipToAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize dateOfBirth as null
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

   useEffect(() => {
    // This effect will trigger whenever patientInfo changes
    savePatientData(patientInfo);
  }, [patientInfo, savePatientData]);


  const { trnRxId } = useParams();
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


  return (
    <>

      <div className='w-full h-[calc(130vh-30rem)] bg-white rounded-2xl   border-2 shadow-xl relative overflow-y-scroll no-scrollbar '>
        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
          <hr className=" border-[#e36c09] border w-32  absolute top-0 " />
          <p className='absolute top-0 text-[#e36c09] text-sm'>Patient</p>
        </div>
        <div className='py-7 relative'>
          <p className='text-[#596edb] text-xs absolute top-1 left-4'>Netsuit Patient ID:{sendfaxId}</p>
          <p className='text-[#596edb] text-xs absolute top-1 right-10'>Tika ID:12053</p>
          <div className='flex flex-col justify-between sm:items-star items-cente h-full   md:px-1 px-2 '>

            <div className=''>


              <div className='md:flex justify-around '>
                <div className=' flex  items-center gap-4  '>
                  <p className='text-xs text-black    ' htmlFor="">Patient Name:</p>
                  <div className='flex items-center'>
                    <p className='text-xs text-black  ' htmlFor="">First Name: </p>
                    <input className='bg-gray-200 rounded-2xl border border-gray-300 w-20 text-black h-5 text-xs'
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={patientFirstName || ''}
                    />
                  </div>
                </div>
                <div className=' flex  items-center  '>
                  <p className='text-xs text-black    ' htmlFor="">Middle Name :</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-20 text-black h-5 text-xs'
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={patientMiddleName || ''}
                  />
                </div>
                <div className=' flex  items-center '>
                  <p className='text-xs text-black ' htmlFor="">Last Name :</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-20 text-black h-5 text-xs'
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={patientLastName || ''}
                  />
                </div>
              </div>


              {/* second part */}
              <div className='md:flex justify-around  w-full pt-1'>
                <div className=' flex  items-center gap-2  '>
                  <p className='text-xs text-black    ' htmlFor="">Date Of Birth:</p>
                  <div className='flex items-center'>
                    <input className='bg-gray-200 rounded-2xl border border-gray-300 w-[148px] text-black h-5 text-xs'
                      type="text"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={dateOfBirth || ''}
                    />
                  </div>
                </div>
                <div className=' flex  items-center  '>
                  <p className='text-xs text-black    ' htmlFor="">Last 4 of SSn :</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-20 ml-4 text-black h-5 text-xs'
                    type="text"
                    id="ssn"
                    name="ssn"
                    value={ssn || ''}
                  />
                </div>
                <div className=' flex  items-center '>
                  <p className='text-xs text-black ' htmlFor="">Phone No :</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-28 text-black h-5 text-xs'
                    type="text"
                    id="cellPhone"
                    name="cellPhone"
                    value={cellPhone || ''}
                  />
                </div>
              </div>

              {/* second part */}
              <div className='w-full pt-1 flex flex-col justify-around  px-4'>
                <div className=' flex  items-center '>
                  <p className='text-xs text-black  w-28' htmlFor="">Ship to Address :</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-full text-black h-5 text-xs mr-5'
                    type="text"
                    id="shipToAddress"
                    name="shipToAddress"
                    value={shipToAddress || ''}
                  />
                </div>
              </div>

              <div className='md:flex  justify-between  w-full md:px-[74px] pt-1 '>
                <div className=' flex  items-center '>
                  <p className='text-xs text-black ' htmlFor="">City :</p>
                  <input className='bg-gray-200 ml-2 rounded-2xl border border-gray-300 w-28 text-black h-5 text-xs'
                    type="text"
                    id="city"
                    name="city"
                    value={city || ''}
                  />
                </div>

                <div className=' flex  items-center '>
                  <p className='text-xs text-black ' htmlFor="">State :</p>
                  <select className='bg-gray-200 rounded-2xl border border-gray-300 w-28 text-black h-5 text-xs'
                    style={{ width: '7rem', margin: '2px' }}
                    fullWidth
                    size="small"
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
                <div className=' flex  items-center  '>
                  <p className='text-xs text-black ' htmlFor="">Zip :</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-28 text-black h-5 text-xs'
                    type="text"
                    id="zip"
                    name="zip"
                    value={zip || ''}
                  />
                </div>
              </div>






              {/* <div className='flex xl:flex-row flex-col w-full xl:gap-5 gap-1 justify-between '>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Cell Phone: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs'
                        type="text"
                        id="cellPhone"
                        name="cellPhone"
                        value={cellPhone || ''}

                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Date of Birth: </label>
                      <input className='bg-gray-200 rounded-2xl border py-[3px] px-2 text-black border-gray-300 md:w-56 w-36 text-xs'
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={dateOfBirth || ''}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Ship to Address: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs'
                        type="text"
                        id="shipToAddress"
                        name="shipToAddress"
                        value={shipToAddress || ''}

                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Last 4 of SSN: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs'
                        type="text"
                        id="ssn"
                        name="ssn"
                        value={ssn || ''}

                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">City: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs'
                        type="text"
                        id="city"
                        name="city"
                        value={city || ''}
                      />
                    </div>
                  </div>
                </div>



                <div className='flex '>
                  <div className='flex flex-col  '>
                    <div className=' flex items-center flex-row w-full g '>
                      <div className=' flex  justify-start  flex-col w-full '>
                        <label className='text-xs text-black w-20 text-start' htmlFor="">State: </label>
                        <select className='bg-gray-300 text-gray-600 rounded-3xl py-0.8 px-1'
                          style={{ width: '7rem', margin: '2px' }}
                          fullWidth
                          size="small"
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
                  <div className='flex flex-col '>
                    <div className=' flex items-center flex-row w-full g '>
                      <div className=' flex  justify-start  flex-col w-full '>
                        <label className='text-xs text-black w-28 text-start' htmlFor="">Zip: </label>
                        <input className='bg-gray-200 rounded-2xl border border-gray-300 w-16 text-black py-1 text-xs'
                          type="text"
                          id="zip"
                          name="zip"
                          value={zip || ''}

                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <hr className='px-1 w-auto my-1 border border-gray-300' />
            <div>

              <div className='md:flex justify-around  pr-4  w-full pt-1'>
                <div className=' flex  items-center gap-2  md:pr-10 '>
                  <p className='text-xs text-black    ' htmlFor="">Sales Rep Name:</p>
                  <div className='flex items-center'>
                    <input className='bg-gray-200 rounded-2xl border border-gray-300 w-[148px] text-black h-5 text-xs'
                      type="text"
                      id="salesRepName"
                      name="salesRepName"
                      value={repName || ''}
                      onChange={(e) => setSalesRepName(e.target.value)}
                    />
                  </div>
                </div>
                <div className=' flex  items-center  gap-3'>
                  <p className='text-xs text-black   pl-2 ' htmlFor="">Sales Rep Cell:</p>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 w-20  text-black h-5 text-xs'
                    type="text"
                    id="salesRepCell"
                    name="salesRepCell"
                    value={repCell || ''}
                    onChange={(e) => setSalesRepCell(e.target.value)}
                  />
                </div>
                <div className=' flex  items-center  '>
                  <p className='text-xs text-black ' htmlFor="">Distributer: </p>
                  <select className='bg-gray-200 rounded-2xl border border-gray-300 w-20 ml-4 text-black h-5 text-xs'
                    style={{ width: '7rem' }}
                    fullWidth
                    size="small"
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

              {/* second half */}
              <div className='md:flex justify-around gap pr-4  w-full '>
                <div className=' flex  items-center gap-2  md:pr-7 '>
                  <p className='text-xs text-black    ' htmlFor="">Place of Service:</p>
                  <div className='flex items-center'>
                    <select className='bg-gray-200 rounded-2xl border border-gray-300 w-[148px]  text-black h-5 text-xs'
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
                <div className=' flex  items-center  gap-3'>
                  <p className='text-xs text-black    ' htmlFor="">Order Information:</p>
                  <select className='bg-gray-200 rounded-2xl border border-gray-300 w-20  text-black h-5 text-xs'
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
                <div className=' flex  items-center  '>
                  <p className='text-xs text-black ' htmlFor="">Does patient still have
                    <p > an active wound?:
                    </p>  </p>
                  <select className='bg-gray-200 rounded-2xl border border-gray-300 w-20  text-black h-5 text-xs'
                    name="woundActive"

                    id="woundActive"
                    value={woundActive || ''}
                    onChange={(e) => setActiveWound(e.target.value)}

                  >
                    <option value={woundActive}>{woundActive}</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>


            </div>

            {/* <div className='flex  xl:flex-row flex-col justify-between md:pr-0 pr-10'> */}

            {/* <div> */}
            {/* <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Place of Service: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5'
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
                </div> */}
            {/* 
                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Order Information: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5'
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
                </div> */}

            {/* <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Does patient still have an active wound?:
                      </label>
                      <span className='font-serif text-[10px] text-black'>(for refill orders Only)</span>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5'
                        name="woundActive"

                        id="woundActive"
                        value={woundActive || ''}
                        onChange={(e) => setActiveWound(e.target.value)}

                      >
                        <option value={woundActive}>{woundActive}</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
 */}
            {/* </div> */}

            <div className='relative'>
              <div class="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-600"></div>
            </div>

            {/* <div>
                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Sales Rep Name: </label>
                      <input className='bg-gray-200 rounded-2xl border py-[3px] px-2 text-black border-gray-300 md:w-56 w-36 text-xs'
                        type="text"
                        id="salesRepName"
                        name="salesRepName"
                        value={repName || ''}
                        onChange={(e) => setSalesRepName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Sales Rep Cell: </label>
                      <input className='bg-gray-200 rounded-2xl border py-[3px] px-2 text-black border-gray-300 md:w-56 w-36 text-xs'
                        type="text"
                        id="salesRepCell"
                        name="salesRepCell"
                        value={repCell || ''}
                        onChange={(e) => setSalesRepCell(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Distributer: </label>

                      <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-1'
                        style={{ width: '16rem' }}
                        fullWidth
                        size="small"
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
              </div> */}

            {/* </div> */}
          </div>

        </div>



      </div>
    </>
  )
}

export default Patients