import React, { useContext, useState,useEffect  } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { data } from '../../Data/Data'
import axiosBaseURL from '../../components/axios'
import Pagination from '../../components/Pagination'
import { useNavigate } from 'react-router-dom';
import Background from '../../components/Background';
import Header_Navigation from '../../components/header/Header_Navigation'

const Rx_Tracker_List = () => {

    const navigate = useNavigate();

const [currentpage, setCurrentPage] = useState(1);
const [postsPerPage, setPostPerPage] = useState(10);
const [rxTrackerData, setRxTrackerData] = useState([]);
const [loading, setLoading] = useState(true);
const [trnRxId, settrnRxId] = useState([]);
const [selectedRxStatus, setSelectedRxStatus] = useState('');
const [searchHCP, setSearchHCP] = useState('');
const [searchAccount, setSearchAccount] = useState('');
const [searchPatient, setSearchPatient] = useState('');



 const [patientData, setPatientData] = useState({});
const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axiosBaseURL.get('/api/v1/fax/rxpatient/1');
        setPatientData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

useEffect(() => {
    
        const token = localStorage.getItem('tokenTika');
        const config = {
          headers: {
            //Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        };
        console.log("config" , config);
     axiosBaseURL.get('/api/v1/fax/rxTrackerDetailList',config, {
        
    })
    .then((response) => {
        setRxTrackerData(response.data.data); 
        console.log(response.data.data);
        console.log(response.data.data[0].trnRxId);
        settrnRxId(response.data.data[0].trnRxId);
        setLoading(false); // Set loading to false
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false
    });
}, []); // The empty array ensures the effect runs only once on component mount


const handleRxId = (trnRxId,paramFaxId,netSuitId,paramPatientId) => {
    console.log("handleRxId is called");
    navigate(`/nsrxmgt/case-details-new/${trnRxId}/${paramFaxId}/${netSuitId}/${paramPatientId}`);
}

console.log(trnRxId);
const lastPostIndex = currentpage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = rxTrackerData.slice(firstPostIndex, lastPostIndex);
const npage = Math.ceil(rxTrackerData.length / postsPerPage);


    return (
        <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
        <Header_Navigation/>
        <Background/>
        <>
            <div className="w-ful pt-5 relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
                <div className=''>
                    <div className="w-full  h-ful flex justify-between items-center p-2 ">
                        <div className="flex gap-5">
                            
                            <span className="hidden md:flex items-center gap-1 z-70 text-[#194a69] text-xs  relative">
                                Rx Status:
                                <select
                                    value={selectedRxStatus}
                                    onChange={(e) => setSelectedRxStatus(e.target.value)}
                                    className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-40 text-black py-0.5 text-xs t-1'
                                >
                                    <option value="">All</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Pending">Pending</option>
                                </select>
                                
                            </span>
                        </div>
                        <div className='lg:block hidden'>
                            <div className="flex items-center xl:gap-10 gap-4 ">
                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                <label className='text-xs text-black  text-start' htmlFor="">Search HCP:</label>
                                    <input
                                       value={searchHCP}
                                       onChange={(e) => setSearchHCP(e.target.value)}
                                       className="border  px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500"
                                    />
                                    
                                </span>

                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                <label className='text-xs text-black  text-start' htmlFor="">Search Account:</label>
                                    <input
                                       value={searchAccount}
                                       onChange={(e) => setSearchAccount(e.target.value)}
                                       className="border  px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500"
                                    />
                                </span>
                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                <label className='text-xs text-black  text-start' htmlFor="">Search Patient:</label>
                                    <input
                                       value={searchPatient}
                                       onChange={(e) => setSearchPatient(e.target.value)}
                                       className="border  px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500"
                                    />
                                </span>
                                <Pagination
                                        totalPosts={data.length}
                                        postsPerPage={postsPerPage}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentpage}
                                        lastPostIndex={lastPostIndex}
                                        npage={npage}
                                    />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[600px]  h-[500px]   no-scrollbar ">
                    <table className="w-full text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-sm text-[#2b5b7a] font-bold bg-[#a3d3ffa4] rounded-2xl ">
                                <th className="px-6 py-3 ">Rx ID</th>
                                <th className="px-6 py-3 ">Case ID</th>
                                <th className="px-6 py-3">Process Status</th>
                                <th className="px-6 py-3">Fulfillment <p>Status</p></th>
                                <th className="px-6 py-3">NetSuite <p>ID</p></th>
                                <th className="px-6 py-3">Fax <p>ID</p></th>
                                <th className="px-6 py-3">Patient Name </th>
                                <th className="px-6 py-3">Patient <p>ID</p></th>
                                <th className="px-6 py-3">HCP</th>
                                <th className="px-6 py-3 ">Account</th>
                                <th className="px-6 py-3 ">Payer</th>
                                <th className="px-6 py-3 ">Payer<p>Type</p></th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.filter((item) => {
                                    if (selectedRxStatus === '' || item.processStatus === selectedRxStatus) {
                                        return true;
                                    }
                                    return false;
                                })
                                .filter((item) => {
                                    if (searchHCP === '' || item.hcpName.toLowerCase().includes(searchHCP.toLowerCase())) {
                                        return true;
                                    }
                                    return false;
                                })
                                .filter((item) => {
                                    if (searchAccount === '' || (item.accountName && item.accountName.toLowerCase().includes(searchAccount.toLowerCase()))) {
                                        return true;
                                    }
                                    return false;
                                })
                                .filter((item) => {
                                    if (searchPatient === '' || (item.patientName && item.patientName.toLowerCase().includes(searchPatient.toLowerCase()))) {
                                        return true;
                                    }
                                    return false;
                                })
                                .map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "" : "bg-[#f6f6f6]  "
                                        } bg-white text-black/70 text-xs`}
                                >
                                    <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                                    <div className="cursor-pointer" onClick={() => handleRxId(item.trnRxId,item.faxId,item.netsuiteRxId,item.patientId)}>
                                   {item.trnRxId}
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">{item.caseId}</td>
                                    <td className="px-6 py-4">{item.processStatus}</td>
                                    <td className="px-6 py-4">{item.rxFulfilmentStatus}</td>
                                    <td className="px-6 py-4">{item.netsuiteRxId}</td>
                                    <td className="px-6 py-4">{item.faxId}</td>
                                    <td className="px-6 py-4">{item.patientName}</td>
                                    <td className="px-6 py-4">{item.patientId}</td>
                                    <td className="px-6 py-4">{item.hcpName}</td>
                                    <td className="px-6 py-4">{item.accountName}</td>
                                    <td className="px-6 py-4">{item.primaryPayerName}</td>
                                    <td className="px-6 py-4">{item.payerType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
        </div>
    )
}

export default Rx_Tracker_List