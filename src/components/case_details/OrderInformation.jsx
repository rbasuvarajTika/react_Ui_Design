import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { MdAddBox } from 'react-icons/md'

const OrderInformation = ({ openNetSuit }) => {
    return (
        <div className='w-full h-[300px] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll'>
            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
                <hr className="h-px border-[#e36c09] border w-32  absolut " />
                <p className='absolute top-0 text-[#e36c09] text-sm'>Order Information</p>
            </div>
            <div>
                {
                    openNetSuit ? "" :
                        <div className='absolute md:top-1 top-6  right-3 rounded-xl bg-[#00aee6] w-28 py-1'>
                            <div className=' flex justify-around px-1'>
                                <div className='flex  relative'>
                                    <MdAddBox className='text-lg' />
                                    <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                                </div>

                                <p className='text-white text-xs'>ADD</p>
                            </div>

                        </div>
                }


                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll    no-scrollbar md:mt-8 mt-14">
                    <table className="w-f text-sm text-center table-auto  ">
                        <thead className="">
                            <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                                <th className="px-2 py-3 ">Wound <span>(WND)#</span></th>
                                <th className="px-2 py-3">Location</th>
                                <th className="px-2 py-3">Length <span>(cm)</span></th>
                                <th className="px-2 py-3">Width <span>(cm)</span></th>
                                <th className="px-2 py-3">Depth <span>(cm)</span></th>
                                <th className="px-2 py-3">Wound <span>Stage</span></th>
                                <th className="px-2 py-3">Drainage</th>
                                <th className="px-2 py-3 ">Debrided</th>
                                <th className="px-2 py-3 ">ICD-10 <span>Code</span></th>
                                <th className="px-2 py-3 ">Debridement <span>Date</span></th>
                                <th className="px-2 py-3 ">Debridement <span>Type</span></th>
                                <th className="px-2 py-3 ">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className=' bg-white text-black/70 text-xs'>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">Right</option>
                                    </select>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1.2</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1.0</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1.5</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">iv</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">Med</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">Yes</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">07/17/2023</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">Superficial</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                            </tr>

                            <tr className=' bg-gray-200 text-black/70 text-xs'>
                                <td className=" p-1 ">
                                    <p className='bg-gray-300 rounded-2xl py-1 px-'>1</p>
                                </td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">Right</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <p className='bg-gray-300 rounded-2xl py-1 px-'>1</p>
                                </td>
                                <td className=" ">
                                    <p className='bg-gray-300 rounded-2xl py-1 px-'>1</p>
                                </td>
                                <td className=" ">
                                    <p className='bg-gray-300 rounded-2xl py-1 px-'>1</p>
                                </td>
                                <td className="p-1">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-2'>
                                            <option className='' value="">ii</option>
                                        </select>
                                    </p>
                                </td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">Low</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">No</option>
                                    </select>
                                </td>
                                <td className="px-6 ">A6021</td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">07/17/2023</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">Superficial</option>
                                    </select>
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                            </tr>



                            <tr className=' bg-white text-black/70 text-xs'>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                        <option className='' value="">Right</option>
                                    </select>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1.2</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1.0</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1.5</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">iv</option>
                                        </select>
                                    </p>
                                </td>

                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">Med</option>
                                        </select>
                                    </p>
                                </td>

                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">Yes</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py-1 px-'>1</p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl py- px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">07/17/2023</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <p className='bg-gray-200 rounded-3xl px-'>
                                        <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-1'>
                                            <option className='' value="">Superficial</option>
                                        </select>
                                    </p>
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {
                    openNetSuit ? ""
                    :
                    <div className='absolute -bottom  right-3 rounded-xl bg-[#00aee6] w-28 py-1'>
                    <div className=' flex justify-around px-1'>
                        <div className='flex  relative'>
                            <MdAddBox className='text-lg' />
                            <div class="absolute w-[1px] -right-1 h-full bg-gray-100"></div>
                        </div>
                        <p className='text-white text-xs'>ADD</p>
                    </div>
                </div>
                }
                

                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll   no-scrollbar mt-8">
                    <table className="w-f text-sm text-center table-auto  w-full ">
                        <thead className="">
                            <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                                <th className="px-2 py-3 ">Kit Number</th>
                                <th className="px-2 py-3">Frequency</th>
                                <th className="px-2 py-3">(WND)1</th>
                                <th className="px-2 py-3">(WND)2</th>
                                <th className="px-2 py-3">(WND)3</th>
                                <th className="px-2 py-3 ">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className=' bg-white text-black/70 text-xs'>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option className='' value="">WK-D002BK</option>
                                    </select>
                                </td>

                                <td className="    p-1 rounded-2xl ">
                                    <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option className='' value="">15 Day Supply</option>
                                    </select>
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className="    p-1 rounded-2xl ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>



                            </tr>

                            <tr className=' bg-gray-200 text-black/70 text-xs'>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option className='' value="">WK-D002BK</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option className='' value="">30 Day Supply</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className=" ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className=" ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                            </tr>

                            <tr className=' bg-gray-200 text-black/70 text-xs'>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option className='' value="">WK-D002BK</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <select className='bg-gray-300 text-gray-600 rounded-3xl py-1 px-7'>
                                        <option className='' value="">30 Day Supply</option>
                                    </select>
                                </td>
                                <td className=" ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className=" ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className=" ">
                                    <input
                                        type="checkbox"
                                        className=" elative h-3 w-3 cursor-pointer "
                                        id="checkbox-1"
                                        defaultChecked
                                    />
                                </td>
                                <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                                    <AiFillCloseSquare />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default OrderInformation