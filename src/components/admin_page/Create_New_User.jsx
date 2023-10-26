    import React, { useState, useEffect } from 'react';
    import { MdOutlineArrowDropDown } from 'react-icons/md';
    import { useNavigate } from "react-router-dom";

    import axiosBaseURL from '../axios';
    import axios from 'axios';
    const Create_New_User = () => {
        const navigate = useNavigate();
        const [phoneError, setPhoneError] = useState('');
        const [zipError, setZipError] = useState('');
        const [requiredFieldError, setRequiredFieldError] = useState('');
        const [requiredFirstName, setRequiredFirstName] = useState('');
       const [requiredLastName, setRequiredLastName] = useState('');
       
        const [passwordError, setPasswordError] = useState('');


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
            userStatusFlag:'Active',
        });
        
        
        //   const handleChange = (event, newAlignment) => {
        //     setAlignment(newAlignment);
        //   };
        
        const createUser = async () => {
            if (userData.userName.trim() === '' || userData.firstName.trim() === '' || userData.lastName.trim() === '') {
                setRequiredFieldError('Please fill in the required fields.');
                setRequiredFirstName('Please fill in the required fields.')
                setRequiredLastName('Please fill in the required fields.')
                return; // Do not proceed with user creation
            } else {
                setRequiredFieldError(''); 
                setRequiredFirstName('')
                setRequiredLastName('')
            
            }
    
            // Validate other fields (e.g., zip, phone, password)
            if (userData.zip.length !== 5) {
                setZipError('Zip Code must be exactly 5 digits');
                return;
            } else {
                setZipError(''); // Clear the error message
            }
    
            if (userData.phone.length !== 10) {
                setPhoneError('Phone number must be exactly 10 digits');
                return;
            } else {
                setPhoneError(''); // Clear the error message
            }
    
            if (userData.password.length < 6) {
                setPasswordError('Password must be at least 6 characters');
                return;
            } else {
                setPasswordError(''); // Clear the error message
            }
    
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
            const response = await axiosBaseURL.post('/api/v1/users/create/user', userData, config);
        
            if (response.status === 201 || response.status === 200) {
                alert('User Created Successfully');
                navigate("/nsrxmgt/table");
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
        
            if (name === 'zip') {
                // ZIP code validation
                const numericValues = value.replace(/\D/g, ''); // Remove non-digit characters
                const truncatedValues = numericValues.slice(0,5);
                if (numericValues.length === 5) {
                    setZipError(''); // No error
                    updatedUserData[name] = truncatedValues; // Update with cleaned numeric value
                } else {
                    setZipError('Zip Code Should be 5 digits');
                    updatedUserData[name] = truncatedValues; // Update with cleaned numeric value
                }
            } else if (name === 'phone') {
                // Phone number validation
                const numericValue = value.replace(/\D/g, ''); // Remove non-digit characters
                const truncatedValue = numericValue.slice(0, 10);
                if (numericValue.length === 10) {
                    setPhoneError(''); // No error
                    updatedUserData[name] = truncatedValue; // Update with cleaned numeric value
                } else {
                    setPhoneError('Phone number Should be 10 digits');
                    updatedUserData[name] = truncatedValue; // Update with cleaned numeric value
                }
            } else if (name === 'userName'||name === 'firstName'||name === 'lastName') {
                // Check if "userName" is left blank
                if (value.trim() === '') {
                    setRequiredFieldError('User Id is required');
                    setRequiredFirstName('First Name is required')
                    setRequiredLastName('Last Name is required')
                } else {
                    setRequiredFieldError(''); 
                    setRequiredFirstName('')
                    setRequiredLastName('')
                }
        
                updatedUserData[name] = value;
            } else if (name === 'password') {
                // Password validation
                if (value.length >= 6) {
                    setPasswordError(''); // No error
                    updatedUserData[name] = value;
                } else {
                    setPasswordError('Password must be at least 6 characters');
                    updatedUserData[name] = value;
                }
            } else {
                updatedUserData[name] = value;
            }
        
            
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
                                                <label className='text-xs text-black w-full text-start' htmlFor="">*User Id (primary email) </label>
                                                <input className='bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56  text-black py-0.5 text-xs t-1' 
                                                name="userName"
                                                type="text" 
                                                value={userData.userName}
                                                onChange={handleInputChange}

                                                />
                                                <p className="text-red-500 text-xs">{requiredFieldError}</p>

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
                                                <p className="text-red-500 text-xs">{requiredFirstName}</p>

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
                                                <p className="text-red-500 text-xs">{requiredLastName}</p>

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
                                                
                                    <p className='text-red-500 text-xs'>{zipError}</p>
                                
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
                                                {phoneError && (
                                    <p className='text-red-500 text-xs'>{phoneError}</p>
                                )}
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
                                                 <p className="text-red-500 text-xs">{passwordError}</p>
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
                                                <select className='bg-[#f2f2f2] rounded-2xl border border-gray-300w-56 text-black py-0.5 text-xs t-1' 
                                            type="text" 
                                                name="role"
                                                value={userData.role}
                                                onChange={handleInputChange}
                                                                >
                                        <MdOutlineArrowDropDown size={20} />
                                        <option value={userData.role}>{userData.role}</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Power User">Power User</option>
                                        <option value="Reviewer ">Reviewer</option>

                                        </select>
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