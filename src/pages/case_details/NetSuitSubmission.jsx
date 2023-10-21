import React, { useContext } from 'react'
import Patients from '../../components/case_details/Patients'
import OrderInformation from '../../components/case_details/OrderInformation'
import Physician from '../../components/case_details/Physician'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { DuplicateContext } from '../../context/DuplicateContext'

const NetSuitSubmission = () => {
    const { openNetSuit, setNetSuit} = useContext(DuplicateContext)

    const backToCaseFile = () => {
        setNetSuit(false)
    }

    return (
        <>
            <div className="w-ful  relative overflow-x-auto rounded-xl bg-white p-3 overflow-y-scroll max-h-[630px h-[calc(100%-4rem)] no-scrollbar">
                <div className="relative  overflow-x-auto rounded-xl    overflow-y-scroll  h-[640px] no-scrollbar ">
                    <div className='flex md:flex-row flex-col gap-5'>
                        <div className='md:w-[calc(100vw-50vw)] h-screen  flex flex-col gap-2'>

                            {/* Patient */}
                            <Patients  />

                            {/* Order Information */}
                            <OrderInformation openNetSuit={openNetSuit} />

                            {/* Physician */}
                            <Physician />
                        </div>

                        {/* <div className='  bg-white rounded-xl border- shadow-xl relative'> */}

                            <div className='flex flex-col md:w-[calc(100vw-50vw)] h-screen  p-2 gap-2'>
                                <div className='w-full  flex-col] gap-3 h-[200px] bg-white rounded-2xl pt-16   px-10 border-2 shadow-xl relative overflow-y-scroll '>
                                    <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                                        <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                                        <p className='absolute top-0 text-[#e36c09] text-sm'>Patient Details</p>
                                    </div>
                                    <div className='flex xl:flex-row flex-col justify-between  gap-5 items-center   '>
                                        <div className='flex flex-col gap-4' >
                                            <div className=' flex items-center flex-row w-full '>
                                                <label className='text-xs text-black md:w-28 w-24 text-start ' htmlFor="">Patient Name: </label>
                                                <p className='text-gray-500 text-xs' type="text" >Carl Blaskovish</p>
                                            </div>
                                            <div className=' flex items-center flex-row w-full '>
                                                <label className='text-xs text-black md:w-28 w-24 text-start ' htmlFor="">Rx Number: </label>
                                                <p className='text-gray-500 text-xs' type="text" >Carl Blaskovish</p>
                                            </div>

                                            <div className=' flex items-center flex-row w-full '>
                                                <label className='text-xs text-black md:w-28 w-24 text-start ' htmlFor="">HCP Name: </label>
                                                <p className='text-gray-500 text-xs' type="text" >Carl Blaskovish</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <div className=' flex items-center flex-row w-full '>
                                                <label className='text-xs text-black md:w-28 w-24 text-start ' htmlFor="">Patient Name: </label>
                                                <p className='text-gray-500 text-xs' type="text" >Carl Blaskovish</p>
                                            </div>

                                            <div className=' flex items-center flex-row w-full '>
                                                <label className='text-xs text-black md:w-28 w-24 text-start ' htmlFor="">Rx Number: </label>
                                                <p className='text-gray-500 text-xs' type="text" >Carl Blaskovish</p>
                                            </div>

                                            <div className=' flex items-center flex-row w-full '>
                                                <label className='text-xs text-black md:w-28 w-24 text-start ' htmlFor="">HCP Name: </label>
                                                <p className='text-gray-500 text-xs' type="text" >Carl Blaskovish</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full h-[calc(100vh-18rem) h-full bg-white rounded-2xl pt-20  border-2 shadow-xl relative overflow-y-scroll '>
                                    <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                                        <hr className="h-px border-[#e36c09] border w-32  absolute top-0 " />
                                        <p className='absolute top-0 text-[#e36c09] text-sm'>Check List</p>
                                    </div>

                                    <div className='xl:px-28 md:px-10 px-5  flex  gap-4 justify-between'>
                                        <div className=' flex flex-col gap-5'>
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    type="checkbox"
                                                    className=" elative h-3 w-3 cursor-pointer "
                                                    id="checkbox-1"
                                                    defaultChecked
                                                />
                                                <p className='text-gray-500 text-xs' type="text" >is Patient info complete</p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    type="checkbox"
                                                    className=" elative h-3 w-3 cursor-pointer "
                                                    id="checkbox-1"
                                                    defaultChecked
                                                />
                                                <p className='text-gray-500 text-xs' type="text" >is Patient info complete</p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    type="checkbox"
                                                    className=" elative h-3 w-3 cursor-pointer "
                                                    id="checkbox-1"
                                                    defaultChecked
                                                />
                                                <p className='text-gray-500 text-xs' type="text" >is Patient info complete</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    type="checkbox"
                                                    className=" elative h-3 w-3 cursor-pointer "
                                                    id="checkbox-1"
                                                    defaultChecked
                                                />
                                                <p className='text-gray-500 text-xs' type="text" >is Patient info complete</p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    type="checkbox"
                                                    className=" elative h-3 w-3 cursor-pointer "
                                                    id="checkbox-1"
                                                    defaultChecked
                                                />
                                                <p className='text-gray-500 text-xs' type="text" >is Patient info complete</p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <input
                                                    type="checkbox"
                                                    className=" elative h-3 w-3 cursor-pointer "
                                                    id="checkbox-1"
                                                    defaultChecked
                                                />
                                                <p className='text-gray-500 text-xs' type="text" >is Patient info complete</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-5'>
                                        <p className='text-xs text-black w-28 text-start pb-2   '>Comments:</p>
                                        <div className='w-full h-[calc(100vh-30rem)] bg-gray-100 rounded-2xl pt-20  border-2 shadow-xl relative overflow-y-scroll  '>

                                        </div>
                                    </div>
                                    <div className='md:px-10 px-2 pb-3 flex justify-between'>
                                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-1 bg-[#00aee6] rounded-3xl flex justify-center text-xs'>Send for Re-Faxing</div>
                                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-1 bg-[#4da12c] rounded-3xl flex justify-center text-xs'>Send for Re-Faxing</div>
                                    </div>
                                </div>
                            </div>
                            
                        {/* </div> */}


                    </div>

                    <div className='flex csm:flex-row flex-col  p-1 csm:justify-around justify-center items-center sm:gap-0 csm:gap-5 gap-3'>
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00aee6]  rounded-lg flex justify-center md:text-sm text-xs cursor-pointer' onClick={backToCaseFile}>Back To Case Details</div>

                        <div className='sm:w-44 csm:w-32  vsm:w-20 w-28 py-2 bg-[#4da12c] rounded-lg flex justify-center md:text-sm text-xs'>Save</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NetSuitSubmission