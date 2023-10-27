
import { AiFillCloseSquare } from 'react-icons/ai'
import React, { useState, useEffect } from 'react';
import axiosBaseURL from '../axios';
import { useParams } from 'react-router-dom';

const Physician = () => {

  //const [trnFaxId, setTrnFaxId] = useState([]);
  const [apiData, setApiData] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [officeData, setOfficeData] = useState({
    officeName: '',
    cellPhone: '',
    email: '',
    address:'',
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
  }, );

 
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
                address:officeDataArray.address1,
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
}, );

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
  return (
    <div className='w-full h-[calc(100vh-27rem)] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll flex md:flex-row flex-col items-center gap-5 no-scrollbar'>

            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09] absolute top-0  '>
                <hr className="h-px border-[#e36c09] border w-32  absolut " />
                <p className='absolute top-0 text-[#e36c09] text-sm'>Physicain</p>
            </div>
              <div >
                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll   no-scrollbar">
                  <table className="w-f text-sm text-center table-auto   ">
                    <thead className="">
                     <tr className="text-xs text-black font-bold bg-[#246180] rounded-2xl">
                        <th className="px-2 py-3 ">Signed</th>
                        <th className="px-2 py-3">First Name</th>
                        <th className="px-2 py-3">Middle Name</th>
                        <th className="px-2 py-3">Last Name</th>
                        <th className="px-2 py-3">NPI</th>
                        <th className="px-2 py-3 ">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {apiData.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                     <td className="p-1">
                                    <input
                                        type="checkbox"
                                        className="relative h-3 w-3 cursor-pointer"
                                        id={`checkbox-${index}`}
                                        defaultChecked={data.signed}
                                    />
                                </td>
                                    <td className="className='bg-gray-300 text-gray-600 p-1">{data.hcp_first_Name}</td>
                                    <td className="className='bg-gray-300 text-gray-600 p-1">{data.hcp_middle_Name}</td>
                                    <td className="className='bg-gray-300 text-gray-600 p-1">{data.hcp_last_Name}</td>
                                    <td className="className='bg-gray-300 text-gray-600 p-1">{data.npi}</td>
                                    <td className="className='bg-gray-300 text-gray-600 p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                                </tr>
                            ))}

                  </tbody>
                  </table>
                </div>
              </div>

              <div className='fle flex-col  hidde md:pt-10 pt-5'>
                <div className='flex items-center'>
                  <label className='text-black text-xs' htmlFor="">Office Name:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-3 text-black py-1 text-xs' type="text"
                   id='officeName'
                   value={officeData.officeName}
                  
                  />
                </div>

                <div className='flex items-center pt-1'>
                  <label className='text-black text-xs' htmlFor="">Cell Phone:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-5 text-black py-1 text-xs' 
                  
                  type="text" 
                  id='cellPhone'
                  value={officeData.cellPhone}
                  
                  
                  />
                </div>

                <div className='flex items-center pt-1'>
                  <label className='text-black text-xs' htmlFor="">Email:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-11 text-black py-1 text-xs'
                   type="text"
                   id='email'
                  value={officeData.email}
                   />
                </div>
                <div className='flex items-center pt-1'>
                  <label className='text-black text-xs' htmlFor="">Address:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-11 text-black py-1 text-xs'
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
                </div>

                <div className='flex csm:gap-10 gap-9 pt-1'>
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
                </div>

              </div>
            </div>
  )
}

export default Physician