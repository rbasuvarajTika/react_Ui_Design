import React from 'react'
import { MdOutlineArrowDropDown } from 'react-icons/md';

const Create_New_User = () => {


    return (
        <section className=" h-scree  flex justify-center  bg-[#ffffff] md:px-0 px-4 ">
            <div className="bg-[#ffffff] shadow-xl border rounded-3xl max-w-[800px] max-h-[450px] w-full h-full  mt-5 overflow-hidden overflow-y-scroll pb-5 no-scrollbar">
                <div className='pt-5 flex justify-center'>
                    <div className=' border  h-5 rounded-xl w-40 relative'>
                        <div className='bg-orange-500 w-20 h-6 rounded-xl flex justify-center items-center absolute -top-[3px] text-xs'>Standard</div>
                        <p className='text-gray-400 absolute right-7 flex justify-center items-cente text-xs'>SMAL</p>
                    </div>
                </div>


                <form className=''>
                    <div className=' flex  flex-col xl:items-start items-center'>


                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">User Id (primary email) </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">*First Name: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">*Last Name </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' type="text" />
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
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">City: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">State: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' type="text" />
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
                                            <label className='text-xs text-black w-full text-start' htmlFor="">Zip: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">Phone: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w- text-start' htmlFor="">Standard Login Password:</label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' type="passwod" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full  relative'>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">Role: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300w-56 text-black py-0.5 text-xs t-1' type="text" />
                                            <div className='absolute  text-black top-4 right-1'>
                                                <MdOutlineArrowDropDown size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center item pt-5'>
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer' >Submit</div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Create_New_User