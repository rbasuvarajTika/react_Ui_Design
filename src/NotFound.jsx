import React from "react";
import { TfiFaceSad } from "react-icons/tfi";

const NotFound = () => (
  <div className="bg-[#1B4A68] w-screen h-screen flex items-center justify-center ">
    <div className="text-center ">
      <TfiFaceSad className="text-white text-6xl mb-4" />

      <h1 className="text-4xl text-white">404 Not Found</h1>
      <p className="text-white mt-2">The requested page does not exist.</p>
      <button className="mt-2" onClick=" ">
        Home
      </button>
    </div>
  </div>
);

export default NotFound;
