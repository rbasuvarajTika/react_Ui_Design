import React, { useContext } from 'react'
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { DuplicateContext } from '../../context/DuplicateContext';

const FaxId_Form = ( {close_Form} ) => {

  const navigate = useNavigate();
  const {setOpenDuplicate, openDuplicate, showForms, setShoeForms} = useContext(DuplicateContext) 

  const handleOpen_Duplicate = () => {
    setOpenDuplicate(true)
    setShoeForms(false)
  }



  
  return (
    <div className="fixed top-10 lg:left-48 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto ">
      <div className="relative  bg-[#ffffff] rounded-2xl shadow-md shadow-gray-300  h-[calc(100vh-5rem)] w-full max-w-2xl md:pt-6 pb-10 py-3 md:pl-10 pl-5 md:pr-14 pr-10 mt-53">
        <div className=' border-2 border-black h-[calc(100%-10px)]  '>
        </div>
        <div className='relative'>
          <p className='text-[#717171] text-sm absolute top-2'>Page:1</p>
        </div>

        <div className='flex justify-center gap-2 mt-1'>
          <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowLeft /></div>
          <div className='w-7 h-7 rounded-full bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer'> <FaArrowRight /></div>
        </div>

        <div className='flex flex-col gap-2 absolute top-1/2 md:right-4 right-2'>
          <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow shadow-[#00aee6] cursor-pointer'onClick={handleOpen_Duplicate} > <LuPlus /></div>
          <div className=' rounded-lg w-7 h-7 bg-[#00aee6] flex justify-center items-center shadow-[#00aee6] cursor-pointer' > <LuMinus /></div>
        </div>

        <div className='text-blue-400 text-2xl absolute top-2 right-2 cursor-pointer' onClick={close_Form}>
          <AiFillCloseCircle />
        </div>

      </div>
    </div>
  )
}

export default FaxId_Form