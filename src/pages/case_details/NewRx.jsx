import React from 'react'
import CaseDetailsAll from '../../components/case_details/CaseDetailsAll';
import Header_Navigation from '../../components/header/Header_Navigation'
import Background from "../../components/Background";
import Header_Navigation_Case from '../../components/header/Header_Navigation_Case';
import NewRxCaseDetails from '../../components/case_details/NewRxCaseDetails';
import Header_Navigation_New_Case from '../../components/header/Header_Navigation_New_Case';

const NewRx = () => {
  return (
    <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
    <Header_Navigation_New_Case/>
    <Background/>
    <NewRxCaseDetails/>
    </div>
  )
}

export default NewRx