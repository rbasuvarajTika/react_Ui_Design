import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

const Edit_Profile =() =>{

    return (
        <section className=" h-scree  flex justify-center  bg-[#ffffff] md:px-0 px-4 ">
            <div className="bg-[#ffffff] shadow-xl border rounded-3xl max-w-[500px] max-h-[1000px] w-full h-full  mt-5 overflow-hidden overflow-y-scroll pb-5 no-scrollbar">
                <div className='pt-5 flex justify-center'>
                </div>
                <form className=''>
                    <div className=' flex  flex-col xl:items-start items-center'>
                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">First Name</label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                            name="firstName"
                                            type="text" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">Last Name: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="text"
                                            name="lastName"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">Address: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                            name="address"
                                            type="text" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">City: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="text"
                                            name="city" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                            <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">State: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                            type="text"
                                            name="state"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">Zip: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                            name="zip"
                                            type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">Phone: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                            type="text"
                                            name="phone"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center item pt-5'>
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer'
                        >Submit</div>
                    </div>
                    <div className='pt-5 flex justify-center'>
                    <label className='text-xs text-black w-55 text-start' htmlFor="">To Change Email Address , Please Contact Support</label>
                    </div>
                    <div className='pt-1 flex justify-center'>
                    <label className='text-xs text-black w-55 text-start underline font-medium whitespace-nowrap'  htmlFor="">support@tikamobile.com</label>
                    </div>
                </form>

            </div>
        </section>
    )

}
export default Edit_Profile