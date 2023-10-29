
import { AiFillCloseSquare } from 'react-icons/ai'
import React, { useState, useEffect } from 'react';
import axiosBaseURL from '../axios';
import { useParams } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';

const Physician = () => {

  //const [trnFaxId, setTrnFaxId] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [newApiData, setNewApiData] = useState([])
  //const [loading, setLoading] = useState(true);
  const [officeData, setOfficeData] = useState({
    officeName: '',
    cellPhone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [states, setStates] = useState([]);

  const { trnRxId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get(`/api/v1/fax/hcpInfo/${trnRxId}`, config);
        //const trnFaxId = response.data.data[0].trnFaxId;
        // setTrnFaxId(trnFaxId);
        setApiData(response.data.data);
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
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosBaseURL.get(`/api/v1/fax/officeInfo/${trnRxId}`, config);
        const officeInfo = response.data.data;
        const officeDataArray = officeInfo[0];
        // console.log(officeInfo);
        // Set the office data in the state
        // console.log(officeData.accountName);
        setOfficeData({
          officeName: officeDataArray.accountName,
          cellPhone: officeDataArray.cellPhone,
          email: officeDataArray.email,
          address: officeDataArray.address1,
          city: officeDataArray.city,
          state: officeDataArray.state,
          zip: officeDataArray.zip,
        });
        ///console.log(officeName);
      } catch (error) {
        console.error('Error fetching office data:', error);
      }
    };

    fetchOfficeInfo();
  }, []);

  useEffect(() => {
    // Define a function to fetch the state data from the API
    const fetchStateData = async () => {
      try {
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
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



  const handleDeleteKit = (index) => {
    // Create a copy of the apiData array without the item at the specified index
    const updatedApiData = [...apiData];
    updatedApiData.splice(index, 1); // Remove the item at the specified index

    // Update the state with the modified array
    setApiData(updatedApiData);
  };

  useEffect(() => {
    try {
      axios.get("https://dev.tika.mobi:8443/next-service/api/v1/fax/faxList", {
        headers: { "Content-Type": "application/json" }
      })
        .then((res) => {
          // console.log(res?.data.data.data);
          setFaxData(res?.data.data.data)
          setSendDate(res?.data.data.data[0].faxDate)
          setSendFaxNumber(res?.data.data.data[0].faxNumber)
          console.log(sendDate);
          console.log(sendFaxNumber);
        })
    } catch (error) {
      console.log(error);
    }
  }, [])


  const handleAddWound = () => {
    setApiData([...apiData, newApiData]);
    setNewApiData({});
  };




  return (
    <div className='w-full h-[calc(120vh-30rem)] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll flex md:flex-row flex-col items-center gap-5 no-scrollbar'>

      <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09] absolute top-0  '>
        <hr className="h-px border-[#e36c09] border w-32  absolut " />
        <p className='absolute top-0 text-[#e36c09] text-sm'>Physicain</p>
      </div>


      <div className='flex flex-col justify-center w-full items-center  md:pt-10 pt-5 pl-5'>
       

        <div className=' flex  items-center  gap-5 '>
          <p className='text-xs text-black    ' htmlFor="">Office Name:</p>
          <input className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
            type="text"
            id='officeName'
            value={officeData.officeName}
          />
        </div>
        
        <div className=' flex  items-center  gap-5 pt-1'>
          <p className='text-xs text-black pl-1   ' htmlFor="">Cell Phone:</p>
          <input className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
           type="text"
           id='cellPhone'
           value={officeData.cellPhone}
          />
        </div>

        <div className=' flex  items-center  gap-5 pt-1'>
          <p className='text-xs text-black pl-7   ' htmlFor="">Email:</p>
          <input className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
           type="text"
           id='cellPhone'
           value={officeData.email}
          />
        </div>

        <div className=' flex  items-center  gap-5 pt-1'>
          <p className='text-xs text-black pl-8   ' htmlFor="">City:</p>
          <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
            type="text"
            value={officeData.city}
          />
        </div>

        <div className=' flex  items-center  gap-5 pt-1'>
          <p className='text-xs text-black pl-[25px]   ' htmlFor="">State:</p>
          <select className='bg-[#f2f2f2]  rounded-2xl border border-gray-300 w-32 text-black h-5 text-xs'
              // style={{ width: '7rem', margin: '2px' }}
              fullWidth
              size="small"
              value={officeData.state}
              onChange={(e) => setPatientData({ ...patientData, state: e.target.value })}

            >
              {states.map((state) => (
                <option key={state.stateName} value={state.shortName}>
                  {state.stateName}
                </option>
              ))}
            </select>
        </div>

        {/* <div className='flex items-center pt-1'>
          <label className='text-black text-xs' htmlFor=""></label>
          <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-5 text-black py-1 text-xs'
            type="text"
            id='cellPhone'
            value={officeData.cellPhone}
          />
        </div> */}

        {/* <div className='flex items-center pt-1'>
          <label className='text-black text-xs' htmlFor="">Email:</label>
          <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-11 text-black py-1 text-xs'
            type="email"
            id='email'
            value={officeData.email}
          />
        </div> */}


        {/* <div className='flex items-center pt-1'>
          <label className='text-black text-xs' htmlFor="">Address:</label>
          <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-8 text-black py-1 text-xs'
            type="text"
            value={officeData.address}
          />
        </div>
        <div className='flex items-center pt-1'>
          <label className='text-black text-xs' htmlFor="">City:</label>
          <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-[51px] text-black py-1 text-xs'

            type="text"
            value={officeData.city}

          />
        </div> */}

        {/* <div className='flex csm:gap-10 gap-9 pt-1'>
          <div>
            <label className='text-xs text-black w-20 text-start' htmlFor="">State: </label>
            <select className='bg-gray-300 text-gray-600 rounded-3xl py-0.8 px-1'
              style={{ width: '7rem', margin: '2px' }}
              fullWidth
              size="small"
              value={officeData.state}
              onChange={(e) => setPatientData({ ...patientData, state: e.target.value })}

            >
              {states.map((state) => (
                <option key={state.stateName} value={state.shortName}>
                  {state.stateName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='text-black text-xs' htmlFor="">Zip:</label>
            <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-20 w-14 text-black py-1 text-xs'

              type="text"

              value={officeData.zip}

            />
          </div>
        </div> */}

      </div>

      <div className='hidde' >
        <div className='flex  justify-end'>
          <div className='absolut  md:top-0 top-6  right-3 rounded-xl bg-[#00aee6] w-28  cursor-pointer z-50'
            onClick={handleAddWound}
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
                <th className="px-2 py-3  border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((data, index) => (
                <tr key={index}
                // className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}
                >
                  <td className="p-1">
                    <input
                      type="checkbox"
                      className="relative h-3 w-3 cursor-pointer"
                      id={`checkbox-${index}`}
                      defaultChecked={data.signed}
                    />
                  </td>
                  <td className="p- rounded-2xl border">
                    <p className='bg-gray-200 text-gray-600 rounded-3xl h-4 text-xs '>
                      {data.hcp_first_Name}
                    </p>
                  </td>
                  <td className="p- rounded-2xl border">
                    <p className='bg-gray-200 text-gray-600 rounded-3xl h-4 text-xs '>
                      {data.hcp_middle_Name}
                    </p></td>
                  <td className="p- rounded-2xl border">
                    <p className='bg-gray-200 text-gray-600 rounded-3xl h-4 text-xs '>
                      {data.hcp_last_Name}
                    </p>
                  </td>
                  <td className="p- rounded-2xl border">
                    <p className='bg-gray-200 text-gray-600 rounded-3xl h-4 text-xs w-20 '>

                      {data.npi}
                    </p></td>
                  <td className="className='bg-gray-300 text-gray600 p-1 border   flex justify-center text-xl text-red-600  items-center" onClick={() => handleDeleteKit(index)}>
                    <AiFillCloseSquare />
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Physician