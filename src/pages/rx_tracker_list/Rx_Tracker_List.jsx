import React, { useContext, useState,useEffect  } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { data } from '../../Data/Data'
import axiosBaseURL from '../../components/axios'
import Pagination from '../../components/Pagination'

const Rx_Tracker_List = () => {


const [currentpage, setCurrentPage] = useState(1);
const [postsPerPage, setPostPerPage] = useState(10);
const [rxTrackerData, setRxTrackerData] = useState([]);
const [loading, setLoading] = useState(true);
 const [patientData, setPatientData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/v1/fax/rxpatient/1');
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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        };
        console.log("config" , config);
     axiosBaseURL.get('/api/v1/fax/rxTrackerDetailList',config, {
        
    })
    .then((response) => {
        setRxTrackerData(response.data.data); 
        console.log(response.data.data);// Set the fetched data in the state
        setLoading(false); // Set loading to false
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false
    });
}, []); // The empty array ensures the effect runs only once on component mount

const lastPostIndex = currentpage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = rxTrackerData.slice(firstPostIndex, lastPostIndex);
const npage = Math.ceil(rxTrackerData.length / postsPerPage);
    return (
        <>
            <div className="w-ful pt-5 relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
                <div className=''>
                    <div className="w-full  h-ful flex justify-between items-center p-2 ">
                        <div className="flex gap-5">
                            <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                Verified:
                                <input
                                    // onChange={(e) => setSearch(e.target.value)}
                                    className="w rounded-full outline-none px-2 py-1.5 text-black border border-black bg-gray-100 "
                                />
                                <div className="absolute right-2 text-gray-500">
                                    <IoMdArrowDropdown size={20} />
                                </div>
                            </span>

                            <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                Rx Status:
                                <input
                                    // onChange={(e) => setSearch(e.target.value)}
                                    className="w rounded-full outline-none px-2 py-1.5 text-black border border-black bg-gray-100 "
                                />
                                <div className="absolute right-2 text-gray-500">
                                    <IoMdArrowDropdown size={20} />
                                </div>
                            </span>
                        </div>
                        <div className='lg:block hidden'>
                            <div className="flex items-center xl:gap-10 gap-4 ">
                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                    Search HCP:
                                    <input
                                        // onChange={(e) => setSearch(e.target.value)}
                                        className="w rounded-full outline-none px-2 py-1.5 text-black border border-black bg-gray-100 "
                                    />
                                    <div className="absolute right-2 text-gray-500">
                                        <IoMdArrowDropdown size={20} />
                                    </div>
                                </span>

                                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                                    Search Account:
                                    <input
                                        // onChange={(e) => setSearch(e.target.value)}
                                        className="w rounded-full outline-none px-2 py-1.5 text-black border border-black bg-gray-100 "
                                    />
                                    <div className="absolute right-2 text-gray-500">
                                        <IoMdArrowDropdown size={20} />
                                    </div>
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
                                <th className="px-6 py-3">Process Status</th>
                                <th className="px-6 py-3">FulFillMent <p>Status</p></th>
                                <th className="px-6 py-3">NetSuit <p>ID</p></th>
                                <th className="px-6 py-3">Fax <p>ID</p></th>
                                <th className="px-6 py-3">Patient <p>ID</p></th>
                                <th className="px-6 py-3">HCP</th>
                                <th className="px-6 py-3 ">Account</th>
                                <th className="px-6 py-3 ">Payer</th>
                                <th className="px-6 py-3 ">Payer<p>Type</p></th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "" : "bg-[#f6f6f6]  "
                                        } bg-white text-black/70 text-xs`}
                                >
                                    <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                                        <div className="cursor-pointer" >
                                            {item.trnRxId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.process}</td>
                                    <td className="px-6 py-4">{item.process}</td>
                                    <td className="px-6 py-4">{item.Verified}</td>
                                    <td className="px-6 py-4">{item.faxId}</td>
                                    <td className="px-6 py-4">{item.patientId}</td>
                                    <td className="px-6 py-4">{item.hcpName}</td>
                                    <td className="px-6 py-4">{item.accountName}</td>
                                    <td className="px-6 py-4">{item.payer}</td>
                                    <td className="px-6 py-4">{item.payerName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Rx_Tracker_List