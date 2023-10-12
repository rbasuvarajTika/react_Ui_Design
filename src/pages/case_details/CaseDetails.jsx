import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'

const CaseDetails = () => {
  return (
    <div className="w-ful  relative overflow-x-auto rounded-xl bg-white p-3
      overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
      <div className="relative  overflow-x-auto rounded-xl    overflow-y-scroll  h-[640px] no-scrollbar ">
        <div className='flex md:flex-row flex-col gap-5'>
          <div className='w-full h-screen  flex flex-col gap-2'>
             <div className='w-full h-[calc(100vh-23rem)] bg-white rounded-2xl  border-2 shadow-xl relative'>
              <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                 <hr className="h-px border-[#e36c09] border w-32  absolut "/>
                 <p className='absolute top-0 text-[#e36c09] text-sm'>Patients</p>
              </div>
            
             </div>
             <div className='w-full h-[calc(100vh-23rem)] bg-white rounded-2xl  border-2 shadow-xl relative'>
             <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                 <hr className="h-px border-[#e36c09] border w-32  absolut "/>
                 <p className='absolute top-0 text-[#e36c09] text-sm'>Order Information</p>
              </div>
             </div>
             <div className='w-full h-[calc(100vh-27rem)] bg-white rounded-2xl  border-2 shadow-xl relative'>
             <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                 <hr className="h-px border-[#e36c09] border w-32  absolut "/>
                 <p className='absolute top-0 text-[#e36c09] text-sm'>Physician</p>
              </div>
             </div>
          </div>
         
          <div className='w-full h-screen  bg-white rounded-xl border-2 shadow-xl relative'>
            <div className='flex justify-center w-full gap-2 mt-1 absolute  bottom-2'>
                <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowLeft /></div>
                <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowRight  /></div>
            </div>

            <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
          <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer' > <LuPlus /></div>
          <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus  /></div>
        </div>
        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                 <hr className="h-px border-[#e36c09] border w-32  absolut "/>
                 <p className='absolute top-0 text-[#e36c09] text-sm'>Fax</p>
              </div>
          </div>

        </div>
      <div className='flex csm:flex-row flex-col  p-1 csm:justify-evenly justify-center items-center sm:gap-0 csm:gap-5 gap-3'>
        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#e60000] rounded-lg flex justify-center md:text-base text-xs'>Discard</div>
        <div className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-lg flex justify-center md:text-base text-xs'>Save</div>
        <div className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-base text-xs'>Ready for Review</div>
      </div>
      </div>

    </div>
  )
}

export default CaseDetails