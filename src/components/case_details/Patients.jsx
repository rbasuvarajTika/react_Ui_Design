import React from 'react'

const Patients = () => {
  return (
    <>
      <div className='w-full h-[calc(100vh-23rem)] bg-white rounded-2xl   border-2 shadow-xl relative overflow-y-scroll '>
        <div className='w-full flex justify-center shadow-2xlw- shadow-[#e36c09]   '>
          <hr className=" border-[#e36c09] border w-32  absolute top-0 " />
          <p className='absolute top-0 text-[#e36c09] text-sm'>Patient</p>
        </div>
        <div className='py-7'>
          <div className='flex flex-col justify-between sm:items-star items-cente h-full   md:px-16 px-2 '>
            <div className='flex flex-col '>
              <div className='flex gap-10'>
                <div className=' flex flex-col  items-cente w-full '>
                  <label className='text-xs text-black w-28 text-start  ' htmlFor="">Patient Name:(First Name) </label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 xl:w-full md:w-56 w-36 text-black py-1 text-xs ' type="text" />
                </div>

                <div className=' flex flex-col  items-cente w-full '>
                  <label className='text-xs text-black w-28 text-start  ' htmlFor="">(Middle Name) </label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 xl:w-full md:w-56 w-36 text-black py-1 text-xs' type="text" />
                </div>

                <div className=' flex flex-col  items-cente w-full '>
                  <label className='text-xs text-black w-28 text-start  ' htmlFor="">(Last Name) </label>
                  <input className='bg-gray-200 rounded-2xl border border-gray-300 xl:w-full md:w-56 w-36 text-black py-1 text-xs' type="text" />
                </div>
              </div>



              <div className='flex xl:flex-row flex-col w-full xl:gap-5 gap-1 justify-between '>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Cell Phone: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs' type="text" />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Date of Birth: </label>
                      <input className='bg-gray-200 rounded-2xl border py-[3px] px-2 text-black border-gray-300 md:w-56 w-36 text-xs' type="date" />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Ship to Address: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs' type="text" />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Last 4 of SSN: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs' type="text" />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                <div className='flex flex-col'>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">City: </label>
                      <input className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-1 text-xs' type="text" />
                    </div>
                  </div>
                </div>



                <div className='flex '>
                  <div className='flex flex-col  '>
                    <div className=' flex items-center flex-row w-full g '>
                      <div className=' flex  justify-start  flex-col w-full '>
                        <label className='text-xs text-black w-20 text-start' htmlFor="">State: </label>
                        <input className='bg-gray-200 rounded-2xl border border-gray-300 w-16 text-black py-1 text-xs' type="text" />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col '>
                    <div className=' flex items-center flex-row w-full g '>
                      <div className=' flex  justify-start  flex-col w-full '>
                        <label className='text-xs text-black w-28 text-start' htmlFor="">Zip: </label>
                        <input className='bg-gray-200 rounded-2xl border border-gray-300 w-16 text-black py-1 text-xs' type="text" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className='px-1 w-auto my-1 border border-gray-300' />

            <div className='flex  xl:flex-row flex-col justify-between md:pr-0 pr-10'>

              <div>
                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Place of Service: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5' name="" id="">
                      </select>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Order Information: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5' name="" id="">
                      </select>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Does patient still have an active wound?:
                      </label>
                      <span className='font-serif text-[10px] text-black'>(for refill orders Only)</span>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5' name="" id="">
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              <div className='relative'>
                <div class="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gray-600"></div>
              </div>

              <div>
                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Sales Rep Name: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5' name="" id="">
                      </select>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Sales Rep Cell: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5' name="" id="">
                      </select>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col '>
                  <div className=' flex items-center flex-row w-full g '>
                    <div className=' flex  justify-start  flex-col w-full '>
                      <label className='text-xs text-black w-28 text-start' htmlFor="">Distributer: </label>
                      <select className='bg-gray-200 rounded-2xl border border-gray-300 md:w-56 w-36 text-black py-0.5' name="" id="">
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>



      </div>
    </>
  )
}

export default Patients