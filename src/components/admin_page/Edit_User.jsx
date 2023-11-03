import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useParams ,useLocation} from 'react-router-dom';
import axiosBaseURL from '../axios';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Edit_User = () =>{


    const { userId } = useParams(); // Get the user ID from route parameters

    const location = useLocation();
    const navigate  = useNavigate();
    const [userData, setUserData] = useState(null);
    const [space, setSpacData] = useState("  ");
    
    const fetchUserData = (userId) => {
          try {
            const token = localStorage.getItem('token');
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
            fetchUserData(userId);
          }, []);
    
      const updateUser = async () => {
        if(editValidation){
        try {
          const token = localStorage.getItem('token');
    
          const config = {
            /* headers: {
              Authorization: `Bearer ${token}`,
            }, */
          };
    
          const response = await axiosBaseURL.put(
            `/api/v1/users/update/user/${userId}`,
            userData,
            config
          );
    
          if (response.status === 201 || response.status === 200) {
            // User was successfully updated
            // You can handle success here, e.g., show a success message
            toast.success("User Updated Successfully");
          } else {
            // Handle errors, e.g., show an error message
          }
        } catch (error) {
          console.error('Error updating user:', error);
          // Handle network or other errors
        }
        }else{

            toast.error("Please Validate all Fields");
        }
      };

      const [phoneError, setPhoneError] = useState('');
      const [zipError, setZipError] = useState('');
      const [stateError, setStateError] = useState('');
      const [editValidation, setEditValidation] = useState(true);
      useEffect(() => {
        // Fetch PDF data for both main and duplicate fax when the component mounts
        setEditValidation(true);
      }, []);
      const handleInputChange = (e) => {
        setEditValidation(true);
        const { name, value } = e.target;
        if (name === 'zip') {
            // ZIP code validation
            const numericValues = value.replace(/\D/g, ''); // Remove non-digit characters
            const truncatedValues = numericValues.slice(0,5);
            if (numericValues.length === 5) {
                setEditValidation(true);
                setZipError(''); // No error
                setUserData({
                    ...userData,
                    [name]: truncatedValues,
                  }); // Update with cleaned numeric value
            } else {
                setEditValidation(false);
                setZipError('Zip Code Should be 5 digits');
                setUserData({
                    ...userData,
                    [name]: truncatedValues,
                  }); // Update with cleaned numeric value
            }
        } else if (name === 'phone') {
            // Phone number validation
            const numericValue = value.replace(/\D/g, ''); // Remove non-digit characters
            const truncatedValue = numericValue.slice(0, 10);
            if (numericValue.length === 10) {
                setEditValidation(true);
                setPhoneError(''); // No error
                setUserData({
                    ...userData,
                    [name]: truncatedValue,
                  });// Update with cleaned numeric value
            } else {
                
                setEditValidation(false);
                setPhoneError('Phone number Should be 10 digits');
                setUserData({
                    ...userData,
                    [name]: truncatedValue,
                  });// Update with cleaned numeric value
            }
        } else if (name === 'state') {
        
                if (value.length === 2) {
                    setEditValidation(true);
                    setStateError(''); // No error
                    setUserData({
                        ...userData,
                        [name]: value,
                      }); // Update with cleaned numeric value
                } else {
                    setEditValidation(false);
                    setStateError('State Code Length Should be 2');
                    setUserData({
                        ...userData,
                        [name]: value,
                      });// Update with cleaned numeric value
                }
            } else {
            setUserData({
                ...userData,
                [name]: value,
              });
        }
       
      };
    return (
       
        <section className=" h-scree  flex justify-center  bg-[#ffffff] md:px-0 px-4 ">
            <ToastContainer />
            {userData ? (
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
                                            <input className='gap-1 bg-[#919194] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                            name="username"
                                            type="text" 
                                            value={space+userData.username}
                                            onChange={handleInputChange}
                                            readOnly
    
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
                                              <p className="text-red-500 text-xs">{stateError}</p>
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
                                             <p className="text-red-500 text-xs">{zipError}</p>
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
                                            <p className="text-red-500 text-xs">{phoneError}</p>
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
                                            value={userData.role}  >
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
                                            name="password"
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
                                            name="confirm password"
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
                                            value={userData.userStatusFlag}
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
                        onClick={updateUser}>Submit</div>
                    </div>
                       
                </form>
               
            </div>
            ) : (
            <div className="bg-[#ffffff] max-w-[100px] max-h-[1000px] w-full h-full  mt-5 overflow-hidden overflow-y-scroll pb-5 no-scrollbar">
            <div role="status center">
            <svg aria-hidden="true" class="w-25 h-20 mr-20 text-gray-200 text-center animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
            </div>
            </div>
              )}
        </section>
    )
}
export default Edit_User