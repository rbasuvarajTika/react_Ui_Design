import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useParams ,useLocation} from 'react-router-dom';
import axiosBaseURL from '../axios';

const Edit_User = () =>{


    const { userId } = useParams(); // Get the user ID from route parameters

    const location = useLocation();
    const navigate  = useNavigate();
    const selectedUser = location.state?.user || null;
    const [alignment, setAlignment] = React.useState('web');
    const [userData, setUserData] = React.useState(selectedUser || {
        userName: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        password: '',
    });


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    
            let userDataToSet = selectedUser || { // Use selectedUser if available, otherwise initialize with empty values
              userName: '',
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              address: '',
              password: '',
            };
    
            if (!selectedUser && userId) {
              // Fetch user data only when userId is available and selectedUser is not set
              const response = await axiosBaseURL.get(`/api/v1/users/user/${userId}`, config);
              if (response.status === 200) {
                alert('User Created Successfully');
                userDataToSet = response.data.data.data; // Assuming the response contains user data
               
              } else {
                // Handle errors
                alert('Failed to Update')
              }
            }
    
            setUserData(userDataToSet);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle network or other errors
          }
        };
    
        fetchUserData();
      }, [userId, selectedUser]);

      const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
      };
    
      const updateUser = async () => {
        try {
          const token = localStorage.getItem('token');
    
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          const response = await axiosBaseURL.put(
            `/api/v1/users/update/user/${userId}`,
            userData,
            config
          );
    
          if (response.status === 201 || response.status === 200) {
            // User was successfully updated
            // You can handle success here, e.g., show a success message
            alert('User Updated Successfully');
           
            navigate("/nsrxmgt/adminPage");
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
                                            <label className='text-xs text-black w-full text-start' htmlFor="">*User Id (primary email) </label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                            name="userName"
                                            type="text" 
                                            value={userData.username}
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
                                            type="text"
                                            value={userData.lastName}
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
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full  relative'>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">Role: </label>
                                            <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                        type="text" 
                                            name="role"
                                                            >
                                    <MdOutlineArrowDropDown size={20} />
                                    <option value="Admin">Admin</option>
                                    <option value="Power User">Power User</option>
                                    <option value="Reviewer ">Reviewer</option>

                                    </select>
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
                                            <label className='text-xs text-black w- text-start' htmlFor="">Enter New Password:</label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="password"
                                            name="enterNewPassword"
                                            value={userData.password}
                                            onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full '>
                                            <label className='text-xs text-black w- text-start' htmlFor="">Confirm Password:</label>
                                            <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs' 
                                            type="password"
                                            name="confirmPassword"
                                            value={userData.password}
                                            onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className=' flex items-center flex-row w-full g '>
                                        <div className=' flex  justify-start  flex-col w-full  relative'>
                                            <label className='text-xs text-black w-full text-start' htmlFor="">User Status: </label>
                                            <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 text-black py-0.5 text-xs t-1' 
                                        type="text" 
                                            name="status"
                                                            >
                                    <MdOutlineArrowDropDown size={20} />
                                    <option value="Active">Active</option>
                                    <option value="Deactivated">Deactivated</option>
                                    </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center item pt-5'>
                        <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer'
                        >Submit</div>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Edit_User