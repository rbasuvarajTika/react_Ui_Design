import React from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'

const Physician = () => {
  return (
    <div className='w-full h-[calc(100vh-27rem)] bg-white rounded-2xl  border-2 shadow-xl relative overflow-y-scroll flex md:flex-row flex-col items-center gap-5'>

            <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09] absolute top-0  '>
                <hr className="h-px border-[#e36c09] border w-32  absolut " />
                <p className='absolute top-0 text-[#e36c09] text-sm'>Physicain</p>
            </div>
              <div >
                <div className=" relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll   no-scrollbar">
                  <table className="w-f text-sm text-center table-auto   ">
                    <thead className="">
                      <tr className="text-xs text-[#ffffff] font-bold bg-[#246180] rounded-2xl  ">
                        <th className="px-2 py-3 ">Signed</th>
                        <th className="px-2 py-3">Provider Name</th>
                        <th className="px-2 py-3">NPI</th>
                        <th className="px-2 py-3 ">Delete</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className=' bg-white text-black/70 text-xs'>
                        <td className="    p-1 rounded-2xl ">
                          <input
                            type="checkbox"
                            className=" elative h-3 w-3 cursor-pointer  "
                            id="checkbox-1"
                            defaultChecked
                          />
                        </td>

                        <td className="    p-1 rounded-2xl ">
                          <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-7'>
                            <option className='' value="">Dr.Scott HIdzinki</option>
                          </select>
                        </td>
                        <td className="    p-1 rounded-2xl ">
                          <p className='bg-gray-200 rounded-3xl py-1 px-5'>1387457896</p>
                        </td>

                        <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                          <AiFillCloseSquare />
                        </td>
                      </tr>
                      <tr className=' bg-white text-black/70 text-xs'>
                        <td className="    p-1 rounded-2xl ">
                          <input
                            type="checkbox"
                            className=" elative h-3 w-3 cursor-pointer "
                            id="checkbox-1"
                            defaultChecked
                          />
                        </td>
                        <td className="    p-1 rounded-2xl ">
                          <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-7'>
                            <option className='' value="">Dr.Joseph C. Banis</option>
                          </select>
                        </td>
                        <td className="    p-1 rounded-2xl ">
                          <p className='bg-gray-200 rounded-3xl py-1 px-5'>1387457896</p>
                        </td>
                        <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                          <AiFillCloseSquare />
                        </td>
                      </tr>

                      <tr className=' bg-white text-black/70 text-xs'>
                        <td className="    p-1 rounded-2xl ">
                          <input
                            type="checkbox"
                            className=" elative h-3 w-3 cursor-pointer "
                            id="checkbox-1"
                            defaultChecked
                          />
                        </td>
                        <td className="    p-1 rounded-2xl ">
                          <select className='bg-gray-200 text-gray-600 rounded-3xl py-1 px-7'>
                            <option className='' value="">Dr. Angele Prescott</option>
                          </select>
                        </td>
                        <td className="    p-1 rounded-2xl ">
                          <p className='bg-gray-200 rounded-3xl py-1 px-5'>1387457896</p>
                        </td>

                        <td className="p-1 rounded-2xl  flex justify-center text-xl text-red-600 mt-2 items-center">
                          <AiFillCloseSquare />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className='fle flex-col  hidde md:pt-10 pt-5'>
                <div className='flex items-center'>
                  <label className='text-black text-xs' htmlFor="">Office Name:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-3 text-black py-1 text-xs' type="text" />
                </div>

                <div className='flex items-center pt-1'>
                  <label className='text-black text-xs' htmlFor="">Cell Phone:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-5 text-black py-1 text-xs' type="text" />
                </div>

                <div className='flex items-center pt-1'>
                  <label className='text-black text-xs' htmlFor="">Email:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-11 text-black py-1 text-xs' type="text" />
                </div>

                <div className='flex items-center pt-1'>
                  <label className='text-black text-xs' htmlFor="">City:</label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-56 ml-[51px] text-black py-1 text-xs' type="text" />
                </div>

                <div className='flex csm:gap-10 gap-9 pt-1'>
                  <div>
                    <label className='text-black text-xs' htmlFor="">State:</label>
                    <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-20 w-14 ml-12 text-black py-1 text-xs' type="text" />
                  </div>

                  <div>
                    <label className='text-black text-xs' htmlFor="">Zip:</label>
                    <input className='bg-gray-200 rounded-2xl border border-gray-300 csm:w-20 w-14 text-black py-1 text-xs' type="text" />
                  </div>
                </div>

              </div>
            </div>
  )
}

export default Physician