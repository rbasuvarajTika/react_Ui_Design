import React from 'react'
import Duplicate_Fax from '../../components/fax/Duplicate_Fax'
import Header_Navigation from '../../components/header/Header_Navigation'
import Background from "../../components/Background";

const Duplicate_Fax_Page = () => {
  return (
    <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
    <Header_Navigation/>
    <Background/>
    <Duplicate_Fax />
    </div>
  )
}

export default Duplicate_Fax_Page