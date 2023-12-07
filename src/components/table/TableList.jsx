import { useContext, useEffect, useState } from "react";
import { data } from "../../Data/Data";
import Pagination from "../Pagination";
import FaxId_Form from "./FaxId_Form";
import { IoMdArrowDropdown } from "react-icons/io";
import { DuplicateContext } from "../../context/DuplicateContext";
import Duplicate_Fax from "../fax/Duplicate_Fax";
import { ToastContainer, toast } from "react-toast";
import axiosBaseURL from "../axios";
import fax from "../../assets/pdf/fax.pdf";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FaxId_Form_New from "./FaxId_Form_New";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const TableList = ({}) => {
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [showForm, setShoeForm] = useState(false);
  const [search, setSearch] = useState("");
  const { setOpenDuplicate, openDuplicate, showForms, setShoeForms } =
    useContext(DuplicateContext);
  const [faxData, setFaxData] = useState([]);
  const [sendFaxId, setSendFaxId] = useState(null);
  const [sendNoOfRxs, setSendNoOfRxs] = useState(null);

  const [sendDate, setSendDate] = useState(null);
  const [sendFaxNumber, setSendFaxNumber] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedOcrStatus, setSelectedOcrStatus] = useState("All Status"); // State for selected ocrStatus
  const [selectedFaxStatus, setSelectedFaxStatus] = useState("All Status");

  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [loading, setLoading] = useState(true);
  const [faxStatusOptions, setFaxStatusOptions] = useState([]);
  const [ocrStatusOptions, setOcrStatusOptions] = useState([]);


  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = faxData.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(faxData.length / postsPerPage);
  const navigate = useNavigate();

  const open_form = ({ showForm }) => {
    setShoeForms(true);
    console.log(!showForm);
  };

  const close_Form = () => {
    setShoeForms(false);

    toast.error("Please enter password");
  };

  useEffect(() => {
    try {
      axiosBaseURL
        .get("/api/v1/fax/faxList", {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          // console.log(res?.data.data.data);
          setFaxData(res?.data.data.data);
          setSendDate(res?.data.data.data[0].faxDate);
          setSendFaxNumber(res?.data.data.data[0].faxNumber);
          setSortedData(res?.data.data.data);
          setSendNoOfRxs(res?.data.data.data[0].noOfRxs);
          setLoading(false);
          console.log(sendDate);
          console.log(faxData);
          console.log(sendFaxNumber);
          console.log(" in TableLIst", sendNoOfRxs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFaxStatus = (status, faxId, noOfRxs, trnFaxId) => {
    setSendFaxId(faxId);
    setSendNoOfRxs(noOfRxs);

    if (status === "Duplicate") {
      setSendFaxId(faxId);

      //setOpenDuplicate(true)
      navigate(`/nsrxmgt/duplicate-fax/${faxId}`);
      console.log(!showForm);
    } else if (status === "Main" || "New") {
      navigate(`/nsrxmgt/fax-list-page/${faxId}/${noOfRxs}/${trnFaxId}`);
      console.log("Handling fax status click");
      console.log("Fax ID:", faxId, "Number of Rxs:", noOfRxs);
      // setShoeForms(true)
      setShoeForms(false);
    }
  };
  const handleOcrStatusChange = (event) => {
    setSelectedOcrStatus(event.target.value);
  };
  const handleFaxStatusChange = (event) => {
    setSelectedFaxStatus(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosBaseURL.get("/api/v1/fax/faxStatus");
        // Assuming the response data is an array of options
        setFaxStatusOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosBaseURL.get("/api/v1/fax/ocrStatus");
        // Assuming the response data is an array of options
        setOcrStatusOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (columnName) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const newData = [...sortedData];

    newData.sort((a, b) => {
      const columnA = a[columnName];
      const columnB = b[columnName];

      // Adjust the comparison logic based on the column type
      if (typeof columnA === "string") {
        // For string comparison
        return newSortOrder === "asc"
          ? columnA.localeCompare(columnB)
          : columnB.localeCompare(columnA);
      } else {
        // For numeric comparison
        return newSortOrder === "asc" ? columnA - columnB : columnB - columnA;
      }
    });

    setSortedData(newData);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-ful pt-5 relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
        {
          <>
            <div className="w-full h-ful flex justify-between items-center p-2 ">
              <div className="flex gap-5">
                <span className="hidden md:flex items-center gap-1 z-70 text-[#194a69] text-xs  relative">
                  OCR Status:
                  <select
                    className="bg-[#f2f2f2] rounded-2xl border border-gray-300 w-40 text-black py-0.5 text-xs t-1"
                    type="text"
                    value={selectedOcrStatus}
                    onChange={handleOcrStatusChange}
                  >
                    <option value="All Status">All Status</option>
                    {ocrStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className="flex gap-5">
                <span className="hidden md:flex items-center gap-1 z-70 text-[#194a69] text-xs  relative">
                  Fax Status:
                  <select
                    className="bg-[#f2f2f2] rounded-2xl border border-gray-300 w-40 text-black text-cen py-0.5 text-xs t-1"
                    type="text"
                    value={selectedFaxStatus}
                    onChange={handleFaxStatusChange}
                  >
                    <option value="All Status">All Status</option>
                    {faxStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className="flex gap-5">
                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative">
                  <label className="text-xs text-black  text-start" htmlFor="">
                    Search Fax ID:
                  </label>
                  <input
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="border  px-4 shadow-lg rounded-xl py-1 placeholder:text-black text-gray-500"
                  />
                </span>

                <span className="hidden md:flex items-center gap-1 z-50 text-[#194a69] text-sm  relative"></span>
                <Pagination
                  totalPosts={faxData.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentpage}
                  lastPostIndex={lastPostIndex}
                  npage={npage}
                />
              </div>
            </div>
            <div></div>
            <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[600px]  h-[500px]   no-scrollbar ">
              <table className="w-full text-sm text-center table-auto  ">
                <thead className="">
                  <tr className="text-sm text-[#2b5b7a] font-bold bg-[#a3d3ffa4] rounded-2xl ">
                    <th className="px-6 py-3 ">
                      Fax ID{" "}
                      <div
                        onClick={() => handleSort("faxId")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>{" "}
                    </th>

                    <th className="px-6 py-3">
                      Case ID
                      <div
                        onClick={() => handleSort("caseId")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      Fax Status{" "}
                      <div
                        onClick={() => handleSort("faxStatus")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      No of Rx{" "}
                      <div
                        onClick={() => handleSort("noOfRxs")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      ACTION REQUIRED{" "}
                      <div
                        onClick={() => handleSort("verifiedFlag")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      Main Fax ID{" "}
                      <div
                        onClick={() => handleSort("dupeFaxId")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      Fax Date{" "}
                      <div
                        onClick={() => handleSort("faxDate")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3">
                      Fax Time{" "}
                      <div
                        onClick={() => handleSort("faxDateTime")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 ">
                      Sender Fax #{" "}
                      <div
                        onClick={() => handleSort("faxNumber")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 ">
                      OCR Status{" "}
                      <div
                        onClick={() => handleSort("ocrStatus")}
                        className="cursor-pointer"
                      >
                        {sortOrder === "asc" ? (
                          <AiOutlineCaretUp
                            className="cursor-pointer"
                            size={13}
                          />
                        ) : (
                          <AiOutlineCaretDown
                            className="cursor-pointer"
                            size={13}
                          />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData
                    .filter((item) => {
                      const matchesSearch =
                        search === "" || item.faxId.includes(search);
                      const matchesOcrStatus =
                        selectedOcrStatus === "All Status" ||
                        item.ocrStatus === selectedOcrStatus;
                      const matchesFaxStatus =
                        selectedFaxStatus === "All Status" ||
                        item.faxStatus === selectedFaxStatus;
                      return (
                        matchesSearch && matchesOcrStatus && matchesFaxStatus
                      );
                    })
                    .slice(firstPostIndex, lastPostIndex)
                    .map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "" : "bg-[#f2f3f5] "
                        } bg-white text-black/70 text-xs`}
                      >
                        <td className="px-6 py-4 text-[#2683c2] underline font-medium whitespace-nowrap">
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              handleFaxStatus(
                                item.faxStatus,
                                item.faxId,
                                item.noOfRxs,
                                item.trnFaxId
                              )
                            }
                          >
                            {item.faxId}
                          </div>
                        </td>
                        <td className="px-6 py-4">{item.caseId}</td>
                        <td className="px-6 py-4 cursor-pointer">
                          {item.faxStatus}
                        </td>
                        <td className="px-6 py-4 cursor-pointer">
                          {item.noOfRxs}
                        </td>
                        <td className="px-6 py-4">{item.verifiedFlag}</td>
                        <td className="px-6 py-4">{item.dupeFaxId}</td>
                        <td className="px-6 py-4">{item.faxDate}</td>
                        <td className="px-6 py-4">{item.faxDateTime}</td>
                        <td className="px-6 py-4">{item.faxNumber}</td>
                        <td className="px-6 py-4">{item.ocrStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        }

        {showForms && (
          <FaxId_Form_New
            close_Form={close_Form}
            setShoeForm={setShoeForms}
            sendFaxId={sendFaxId}
          />
        )}
      </div>
    </>
  );
};

export default TableList;
