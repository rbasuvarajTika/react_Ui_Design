import React from 'react'
import Table from '../table/Table'

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
                    <div className='text-black w-full h-[calc(100%-1rem)]   bg-[#ffff] border-2 shadow-2xl rounded-xl '></div>
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
                    <div className='text-black w-full h-[calc(100%-1rem)] bg-[#ffff] shadow-2xl border-2  rounded-xl  '></div>
                </div>

            </div>
        </div>
    )
}

export default Duplicate_Fax