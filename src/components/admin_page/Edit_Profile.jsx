import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import axiosBaseURL from '../axios';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Edit_Profile =() =>{
 
    const [userData, setUserData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const [userEditData, setUserEditData] = useState();

    const fetchUserData = () => {
        try {
         const userId = localStorage.getItem('userId');
          const config = {
          };
          axiosBaseURL({
              method: 'GET',
              url: `/api/v1/users/usersList/userId/${userId}`,
              headers: {
               // Authorization: `Bearer ${token}`,
              },
            })
              .then((mainResponse) => {
                console.log(mainResponse.data.data[0]);
                setUserData(mainResponse.data.data[0]);
                console.log("userData",userData);
              })
              .catch((error) => {
                //setError('Error fetching main PDF. Please try again later.');
                console.error('Error fetching main Data:', error);
              });
         
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle network or other errors
        }
      };
      useEffect(() => {
        // Fetch PDF data for both main and duplicate fax when the component mounts
        fetchUserData();
      }, []);


      const updateUser = async () => {
        try {
        //  const token = localStorage.getItem('tokenTika');
          const userId = localStorage.getItem('userId');
        //    const config = {
        //    headers: {
        //     Authorization: `Bearer ${token}`,
        //   }, 
        //     };
    
          const response = await axiosBaseURL.patch(
            `/api/v1/users/updateprofile/user/${userId}`,
            userEditData,
          );
    
          if (response.status === 201 || response.status === 200) {
            // User was successfully updated
            // You can handle success here, e.g., show a success message
           // alert('User Updated Successfully');
           toast.success('User Updated Successfully');
            navigate("/nsrxmgt/admin-user-list");
          } else {
            // Handle errors, e.g., show an error message
          }
        } catch (error) {
          console.error('Error updating user:', error);
          // Handle network or other errors
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value,
        });
        setUserEditData({
            ...userEditData,
            [name]: value,
          });
      };
    return (
        <section className=" h-scree  flex justify-center  bg-[#ffffff] md:px-0 px-4 ">
            <div className="bg-[#ffffff] shadow-xl border rounded-3xl max-w-[500px] max-h-[1000px] w-full h-full  mt-5 overflow-hidden overflow-y-scroll pb-5 no-scrollbar">
                <div className='pt-5 flex justify-center'>
                        <div className=' border  h-5 rounded-xl w-40 relative'>
                            <div className='bg-orange-500 w-40 h-6 rounded-xl flex justify-center items-center absolute -top-[3px] text-xs'>Edit Profile</div>
                        </div>
                        <ToastContainer />
                </div>
                <form className=''>
                    <div className=' flex  flex-col xl:items-start items-center'>
                        <div className='px-5 pt-10'>
                            <div className='flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between '>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">First Name</label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                            name="firstName"
                                            type="text" 
                                            value={userData.firstName}
                                            onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">Last Name: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="text"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleInputChange}                                            />
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
                                            name="address1"
                                            type="text" 
                                            value={userData.address1}
                                            onChange={handleInputChange}                                            />
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
                                            onChange={handleInputChange}                                            />
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
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">State: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                            type="text"
                                            name="state"
                                            value={userData.state}
                                            onChange={handleInputChange}                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">Zip: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                            name="zip"
                                            type="text"
                                            value={userData.zip}
                                            onChange={handleInputChange}                                            />
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
                                            <label className='text-xs text-black w-28 text-start' htmlFor="">Phone: </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs'
                                            type="text"
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleInputChange}                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center item pt-5'>
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer' onClick={updateUser}
                        >Submit</div>
                    </div>
                    <div className='pt-5 flex justify-center'>
                    <label className='text-xs text-black w-55 text-start' htmlFor="">To Change Email Address , Please Contact Support</label>
                    </div>
                    <div className='pt-1 flex justify-center'>
                    <label className='text-xs text-black w-55 text-start underline font-medium whitespace-nowrap'  htmlFor="">support@tikamobile.com</label>
                    </div>
                </form>

            </div>
        </section>
    )

}
export default Edit_Profile