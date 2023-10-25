import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

import axiosBaseURL from '../axios';
import axios from 'axios';
const Create_New_User = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        address: '',
        city:'',
        state:'',
        zip:'',
        phone: '',
        password: '', 
        type:'Standard',
        role:'Admin',
      });
    
    
    //   const handleChange = (event, newAlignment) => {
    //     setAlignment(newAlignment);
    //   };
    
    const createUser = async () => {
        try {
          // Get the token from local storage
          const token = localStorage.getItem('tokenTika');
      
          // Include the token in the request headers
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          userData.email=userData.userName;
          const response = await axios.post('https://dev.tika.mobi:8443/next-service/api/v1/users/create/user', userData, config);
      
          if (response.status === 201 || response.status === 200) {
            alert('User Created Successfully');
            navigate("/nsrxmgt/adminpage");
            // Handle success here, e.g., show a success message
          } else if (response.status === 409) {
            alert('User Already Exists');
          } else {
            // Handle other errors, e.g., show an error message
          }
        } catch (error) {
          console.error('Error creating user:', error);
          // Handle network or other errors
        }
      };
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        // Use the spread operator to create a copy of the current userData
        const updatedUserData = { ...userData };
      
        // Set the value for the changed field
        updatedUserData[name] = value;
      
        // Set default values of null for fields that are not in the form
        const fieldsNotInForm = [
          'middleName', 'email', 'confirmPassword', 'otherPassword', 'passwordUpdatedDate',
          'image', 'salesForce', 'createdUser', 'createdDate', 'updatedUser', 'updateDate'
        ];
      
        for (const field of fieldsNotInForm) {
          if (!updatedUserData.hasOwnProperty(field)) {
            updatedUserData[field] = null;
          }
        }
      
        // Update the state with the modified userData
        setUserData(updatedUserData);
      };
      
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
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                             name="userName"
                                            type="text" 
                                            value={userData.userName}
                                            onChange={handleInputChange}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">*First Name: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="text"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={handleInputChange}

                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">*Last Name </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleInputChange}
                                            type="text" 
                                                                                    
                                            />
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
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                            name="address"
                                            type="text" 
                                            value={userData.address}

                                            onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">City: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="text"
                                            name="city"
                                            value={userData.city}
                                            onChange={handleInputChange}    
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">State: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                             type="text"
                                             name="state"
                                             value={userData.state}
                                             onChange={handleInputChange}
                                             />
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
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                            name="zip"
                                            type="text"
                                            value={userData.zip}
                                            onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">Phone: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                             type="text"
                                             name="phone"
                                             value={userData.phone}
                                             onChange={handleInputChange}
                                             />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w- text-start' htmlFor="">Standard Login Password:</label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="password"
                                            name="password"
                                            value={userData.password}
                                            onChange={handleInputChange}
                                            />
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
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300w-56 text-black py-0.5 text-xs t-1'
                                             type="text" 
                                             name="role"
                                             value={userData.role}
                                             onChange={handleInputChange}
                                             />
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
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer'
                        onClick={createUser}
                        
                        >Submit</div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Create_New_User