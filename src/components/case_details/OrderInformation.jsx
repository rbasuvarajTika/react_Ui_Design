import React, { useState, useEffect } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai'
import { MdAddBox } from 'react-icons/md'
import axiosBaseURL from '../axios';
import { useParams } from 'react-router-dom';

const OrderInformation = ({ openNetSuit }) => {
   // const [trnFaxId, setTrnFaxId] = useState([]);
   // const [woundNo, setwoundNo] = useState([]);
    const [woundData, setWoundData] = useState([]);
    const [kitData, setKitData] = useState([]);

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
              setWoundData(responseData.data);
             
              console.log(response.data);
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
      useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('tokenTika');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Make a GET request to the API to fetch product data
                const response = await axiosBaseURL.get(`/api/v1/fax/productInfo/${trnRxId}`, config);
                const responseData = response.data;

                if (responseData && responseData.data && responseData.data.length > 0) {
                   // const trnFaxId = responseData.data[0].trnFaxId;
                   // const productCode = responseData.data[0].productCode;
                   // setProductCode(productCode);
                    setKitData(responseData.data);
             //        console.log(responseData.data);
                    // Handle the case where no data is found.
                 //   console.error('No data found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
     }, );

    return (
        <div className='w-full h-[300px] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll no-scrollbar'>
            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                <hr className="h-px border-[#e36c09] border w-32  absolut " />
                <p className='absolute top-0 text-[#e36c09] text-sm'>Order Information</p>
            </div>
            <div>
                {
                    openNetSuit ? "" :
                        <div className='absolute md:top-1 top-6  right-3 rounded-xl bg-[#00aee6] w-28 py-1'>
                            <div className=' flex justify-around px-1'>
                                <div className='flex  relative'>
                                    <MdAddBox className='text-lg' />
                                    <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                                </div>

                                <p className='text-white text-xs'>ADD</p>
                            </div>

                        </div>
                }


                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll    no-scrollbar md:mt-8 mt-14">
                    <table className="w-f text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                                <th className="px-2 py-3 ">Wound <span>(WND)#</span></th>
                                <th className="px-2 py-3">Location</th>
                                <th className="px-2 py-3">Length <span>(cm)</span></th>
                                <th className="px-2 py-3">Width <span>(cm)</span></th>
                                <th className="px-2 py-3">Depth <span>(cm)</span></th>
                                <th className="px-2 py-3">Wound <span>Stage</span></th>
                                <th className="px-2 py-3">Drainage</th>
                                <th className="px-2 py-3 ">Debrided</th>
                                <th className="px-2 py-3 ">ICD-10 <span>Code</span></th>
                                <th className="px-2 py-3 ">Debridement <span>Date</span></th>
                                <th className="px-2 py-3 ">Debridement <span>Type</span></th>
                                <th className="px-2 py-3 ">Delete</th>
                            </tr>
                        </thead>
                        

                        <tbody>
                        {woundData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-'>
                                        {row.woundNo}
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option value={row.woundLocation}>{row.woundLocation}</option>
                                    </select>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-'>
                                        {row.woundLength}
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-'>
                                        {row.woundWidth}
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 text-gray-600   rounded-3xl py-1 px-'>
                                        {row.woundDepth}
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option value={row.woundThickness}>{row.woundThickness}</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option value={row.drainage}>{row.drainage}</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option value={row.debrided}>{row.debrided}</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-'>
                                        {row.icdCode}
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-'>
                                        {row.debridedDate}
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl">
                                    <p className='bg-gray-200 rounded-3xl px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option value={row.debridedType}>{row.debridedType}</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                
                {
                    openNetSuit ? ""
                    :
                    <div className='absolute -bottom  right-3 rounded-xl bg-[#00aee6] w-28 py-1'>
                    <div className=' flex justify-around px-1'>
                        <div className='flex  relative'>
                            <MdAddBox className='text-lg' />
                            <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                        </div>
                        <p className='text-white text-xs'>ADD</p>
                    </div>
                </div>
                }
                

                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll   no-scrollbar mt-8">
                    <table className="w-f text-sm text-center table-auto  w-full ">
                        <thead className="">
                            <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                                <th className="px-2 py-3 ">Kit Number</th>
                                <th className="px-2 py-3">Frequency</th>
                                <th className="px-2 py-3">(WND)1</th>
                                <th className="px-2 py-3">(WND)2</th>
                                <th className="px-2 py-3">(WND)3</th>
                                <th className="px-2 py-3 ">Delete</th>
                            </tr>
                        </thead>
                    
                            <tbody>
                        {kitData.map((kit, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className="p-1">
                                <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option value={kit.productCode}>{kit.productCode}</option>
                                    </select>
                                </td>
                                <td className="p-1">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option value={kit.frequency}>{kit.frequency}</option>
                                    </select>
                                </td>
                                <td className="p-1">
                                    <input
                                        type="checkbox"
                                        className="relative h-3 w-3 cursor-pointer"
                                        id={`checkbox-${index}`}
                                        defaultChecked={kit.wnd1}
                                    />
                                </td>
                                <td className="p-1">
                                    <input
                                        type="checkbox"
                                        className="relative h-3 w-3 cursor-pointer"
                                        id={`checkbox-${index}`}
                                        defaultChecked={kit.wnd2}
                                    />
                                </td>
                                <td className="p-1">
                                    <input
                                        type="checkbox"
                                        className="relative h-3 w-3 cursor-pointer"
                                        id={`checkbox-${index}`}
                                        defaultChecked={kit.wnd3}
                                    />
                                </td>
                                <td className="p-1 rounded-2xl flex justify-center text-xl text-red-600 mt-2 items-center">
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

export default OrderInformation