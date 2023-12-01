import React from 'react'
import CaseDetailsAll from '../../components/case_details/CaseDetailsAll';
import Header_Navigation from '../../components/header/Header_Navigation'
import Background from "../../components/Background";
import Header_Navigation_Case from '../../components/header/Header_Navigation_Case';

const CaseDetailsNewPage = () => {
  return (
    <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
    <Header_Navigation_Case/>
    <Background/>
    <CaseDetailsAll />
    </div>
  )
}

export default CaseDetailsNewPage