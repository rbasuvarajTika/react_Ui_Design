import React from 'react'
//import Home from '../home/Home'
//import FaxData from '../../components/faxProject/FaxData'
import { BiSolidImageAlt } from 'react-icons/bi';
import { HiDocumentText } from 'react-icons/hi';
import { IoMdTime } from 'react-icons/io';

const Fax_show_project = () => {
    return (
        // <Home>
            <div className="relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll xl:h-[calc(100%-4rem) md:h-[650px]  h-[500px]   no-scrollbar ">
                <div className='flex w-full bg-gray-200'>
                    {/*  */}
                    <section className='  slg:w-[35%] w-[100%] border-b h-[601px] bg-red500'>
                        <div className='flex justify-between border border-b-2  w-full  '>
                            <div className='h-16 w-full bg-[#e1e1e1] hover:bg-[#f5f5f5] flex flex-col pt-2 items-center cursor-pointer'>
                                <BiSolidImageAlt className='text-[#4c5666]' size={20} />
                                <p className=' text-sm text-[#4c5666]'>Thumbnails</p>
                            </div>
                            <div className='h-16 w-full bg-[#e1e1e1] hover:bg-[#f5f5f5] flex flex-col pt-2 items-center cursor-pointer'>
                                <HiDocumentText className='text-[#4c5666]' size={20} />
                                <p className=' text-sm text-[#4c5666]'>Document Details</p>
                            </div>
                            <div className='h-16 w-full bg-[#e1e1e1] hover:bg-[#f5f5f5] flex flex-col pt-2 items-center cursor-pointer'>
                                <IoMdTime className='text-[#4c5666]' size={20} />
                                <p className=' text-sm text-[#4c5666]'>Timeline</p>
                            </div>
                           
                        </div>
                        <div className='bg-[#ffffff] h-[calc(100%-4.1rem)] w-full border-b'></div>
                    </section>

                    {/*  */}
                    <section className='bg-green500 h-full w-[65%] px-6 pt-6 slg:block hidden'>
                        <div>
                        <div className=' w-full bg-[#ffffff]  flex flex-col pt-2 items-center cursor-pointer h-[576px]'>
                                <p className=' text-sm text-[#4c5666]'>Thumbnails</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        // </Home>
    )
}

export default Fax_show_project