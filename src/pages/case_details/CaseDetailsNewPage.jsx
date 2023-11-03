import React from 'react'
import CaseDetailsAll from '../../components/case_details/CaseDetailsAll';
import Header_Navigation from '../../components/header/Header_Navigation'
import Background from "../../components/Background";

const CaseDetailsNewPage = () => {
  return (
    <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
    <Header_Navigation/>
    <Background/>
    <CaseDetailsAll />
    </div>
  )
}

export default CaseDetailsNewPage