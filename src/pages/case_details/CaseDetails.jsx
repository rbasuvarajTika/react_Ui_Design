import React, { useContext, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'
import Patients from '../../components/case_details/Patients'
import { AiFillCloseSquare } from 'react-icons/ai';
import { MdAddBox } from 'react-icons/md';
import OrderInformation from '../../components/case_details/OrderInformation';
import Physician from '../../components/case_details/Physician';
import NetSuitSubmission from './NetSuitSubmission';
import { DuplicateContext } from '../../context/DuplicateContext';

const CaseDetails = () => {
  // const [openNetSuit, setNetSuit] = useState(false)
  const { openNetSuit, setNetSuit} = useContext(DuplicateContext)
  const [patientData, setPatientData] = useState({});


  const handleSavePatientData = (data) => {
    setPatientData(data);
    console.log('Patient Data Received:', data); // Log received data
  };


  const handle_netSuitSubmission = () => {
    setNetSuit(true)
  }


  return (
    <>
      {
        !openNetSuit ?
          <>
            <div className="w-ful  relative overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
              <div className="relative  overflow-x-auto rounded-xl    overflow-y-scroll  h-[640px] no-scrollbar ">
                <div className='flex md:flex-row flex-col gap-5'>
                  <div className='w-full h-screen  flex flex-col gap-2'>

                    {/* Patient */}
                    <Patients savePatientData={handleSavePatientData} />




                    {/* Order Information */}
                    <OrderInformation />


                    {/* Physician */}
                    <Physician />
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
                  <div className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-base text-xs cursor-pointer' onClick={handle_netSuitSubmission}>Ready for Review</div>
                </div>
              </div>


            </div>
          </>
          :
          <>
            <NetSuitSubmission openNetSuit={openNetSuit}/>
          </>
      }



    </>

  )
}

export default CaseDetails