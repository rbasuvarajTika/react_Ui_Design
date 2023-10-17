import React from 'react'
import Table from '../table/Table'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { LuMinus, LuPlus } from 'react-icons/lu'

const Duplicate_Fax = () => {
    return (
        <div className="w-ful  relative  overflow-x-auto rounded-xl lg:px-8 md:px-4   overflow-y-scroll  h-[640px] no-scrollbar ">
            <div className="w-full  h-full flex md:flex-row flex-col justify-between items-center  gap-10 overflow-hidden">
                <div className='w-full h-full flex flex-col gap-3 '>
                    <div className='bg-[#c7dee6] max-w-[685px]  h-10 rounded-3xl md:mx-8 mx-1 px-5 flex items-center justify-around'>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Fax ID: <span className='text-[#276a8c]'>1030A3</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Fax # <span className='text-[#276a8c]'>(717) 550-1675</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Date: <span className='text-[#276a8c]'>5/9/2023</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Time: <span className='text-[]'>12:40</span></p>
                    </div>
                    <div className='text-white w-full h-[calc(100%-1rem)]   bg-[#ffff] border-2 shadow-2xl rounded-xl relative'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                            <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowLeft /></div>
                            <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                            <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer'> <LuPlus /></div>
                            <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus /></div>
                        </div>
                    </div>
                </div>

                <div className='w-full h-full flex flex-col gap-3 '>
                    <div className='bg-[#c7dee6] max-w-[685px]  h-10 rounded-3xl md:mx-8 mx-1 px-5 flex items-center justify-around'>
                        <p className='text-[#1b4a68] text-sm font-semibold flex items-center'>Fax ID:
                            <span className='text-[#276a8c]'>
                                <select className='w-24 rounded-2xl ml-2 py-1' name="" id=""></select>
                            </span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Fax # <span className='text-[#276a8c]'>(206) 342-8631</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Date: <span className='text-[#276a8c]'>5/9/2023</span></p>
                        <p className='text-[#1b4a68] xl:text-sm text-xs font-semibold'>Time: <span className='text-[]'>12:40</span></p>
                    </div>
                    <div className='text-white w-full h-[calc(100%-1rem)] bg-[#ffff] shadow-2xl border-2  rounded-xl  relative'>
                        <div className='flex justify-center gap-2 mt-1 absolute bottom-3 w-full'>
                            <div className='sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs'> <FaArrowLeft /></div>
                            <div className='sm:w-7 sm:h-7 w-6 h-6 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer sm:text-base   text-xs'> <FaArrowRight /></div>
                        </div>

                        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
                            <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer' > <LuPlus /></div>
                            <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus /></div>
                        </div>

                        <div className='absolute bottom-2 flex  w-full justify-around'>
                            <div className=' xl:w-44 sm:w-32 csm:w-32 vsm:w-20 w-20 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-xs text-[10px]'>Make Master</div>
                            <div className=' xl:w-44 sm:w-32 csm:w-32 vsm:w-20 w-20 py-2 bg-[#00aee6] rounded-lg flex justify-center md:text-xs text-[10px]'>Keep Duplicate</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center pt-3'>
                <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#35ad41] rounded-lg flex justify-center md:text-sm text-xs'>Submit</div>
            </div>
        </div>
    )
}

export default Duplicate_Fax