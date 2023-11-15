import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axiosBaseURL from '../axios';
import SearchableDropdown from "../drop_down_search/SearchableDropdown";
import { animals } from '../../Data/animals';
import { roles } from '../../Data/roles';
import "../drop_down_search/style.css";

const Create_New_User = () => {
const navigate = useNavigate();
const [loading, setLoading] = useState(false)
const [phoneError, setPhoneError] = useState('');
const [zipError, setZipError] = useState('');
const [stateError, setStateError] = useState('');
const [requiredFieldError, setRequiredFieldError] = useState('');
const [requiredEmailError, setRequiredEmailError] = useState('');
const [roleError, setRoleError] = useState('');
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
role:'',
userStatusFlag:'Active',
});


//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

const createUser = async () => {
userData.role=role;
if (userData.userName.trim() === '') {
setRequiredFieldError('User Id is required');
return; // Do not proceed with user creation
} else {
setRequiredFieldError('');
}

if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.userName)) {
setRequiredEmailError('Valid Email Id is Required');
return; // Do not proceed with user creation
} else {
setRequiredEmailError('');
}

if(userData.firstName.trim() === ''){
setRequiredFirstName('First Name is required')
return; // Do not proceed with user creation
}else{
setRequiredFirstName('')
}

if(userData.lastName.trim() === ''){
setRequiredLastName('Last Name is required')
return; // Do not proceed with user creation
}else{
setRequiredLastName('')
}


if(userData.password.trim() === ''){
setPasswordError('Password is required')
return; // Do not proceed with user creation
}else{
setPasswordError('')
}

if(userData.role.trim() === ''){
setRoleError('Role is required')
return; // Do not proceed with user creation
}else{
setRoleError('')
}


    // if (userData.state.length !== 2) {
    //     setStateError('State Length Should be 2');
    //     return;
    // } else {
    //     setStateError(''); // Clear the error message
    // }

if (userData.password.length < 6) {
setPasswordError('Password must be at least 6 characters');
return;
} else {
setPasswordError(''); // Clear the error message
}

setLoading(true)
// Get the token from local storage
const token = localStorage.getItem('tokenTika');

// Include the token in the request headers
const config = {
headers: {
Authorization: `Bearer ${token}`,
},
};
userData.email=userData.userName;
userData.role=role;
try {
await axiosBaseURL.post("/api/v1/users/create/user",userData, config, {
    headers: { "Content-Type": "application/json" }
})
    .then((res) => {
        setLoading(false)
        if (res.data === 'User created successfully') {
            setLoading(false)
            toast.success("User Created Successfully");
            setUserData({
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
                role:'',
                userStatusFlag:'Active',
            });
            // Handle success here, e.g., show a success message
        } 
        if(res.data.success === false){
        toast.error("Email Already Exists")
        }
        console.log(res);
    })
} catch (error) {
setLoading(false)
console.log(error);
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
} else if (name === 'userName') {
// Check if "userName" is left blank

if (value.trim() !== '') {
    if(!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)) {
        console.log("Email Validation")
        setRequiredEmailError('Valid Email Id is Required');
    }else{
        setRequiredEmailError('')
    }
}
if (value.trim() === '') {
    console.log("Username Trim Validation")
    setRequiredFieldError('User Id is required');
} else {
    setRequiredFieldError(''); 
}

updatedUserData[name] = value;
}else if (name === 'firstName') {
// Check if "userName" is left blank

if (value.trim() === '') {
    setRequiredFirstName('First Name is required')

} else {
    setRequiredFirstName('')
}

updatedUserData[name] = value;
}else if (name === 'lastName') {
// Check if "userName" is left blank
if (value.trim() === '') {

    setRequiredLastName('Last Name is required')
} else {
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
}else if (name === 'state') {

if (value.length === 2) {
    setStateError(''); // No error
    updatedUserData[name] = value; // Update with cleaned numeric value
} else {
    setStateError('State Code Length Should be 2');
    updatedUserData[name] = value; // Update with cleaned numeric value
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

const [value, setValue] = useState("Select Role...");
const [role, setRole] = useState("Select Role...");

return (
<section className=" h-scree  flex justify-center  bg-[#ffffff] md:px-0 px-4 ">

<div className="bg-[#ffffff] shadow-xl border rounded-3xl max-w-[800px] max-h-[450px] w-full h-full  mt-5 overflow-hidden overflow-y-scroll pb-5 no-scrollbar">
    <div className='pt-5 flex justify-center'>
        <div className=' border  h-5 rounded-xl w-40 relative'>
            <div className='bg-orange-500 w-20 h-6 rounded-xl flex justify-center items-center absolute -top-[3px] text-xs'>Standard</div>
            <p className='text-gray-400 absolute right-7 flex justify-center items-cente text-xs'>SMAL</p>
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
                                <label className='text-xs text-black w-full text-start' htmlFor="">*User Id (primary email) </label>
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56  text-black py-1 text-xs t-1' 
                                name="userName"
                                type="text" 
                                value={userData.userName}
                                onChange={handleInputChange}
                                />
                                <p className="text-red-500 text-xs">{requiredFieldError}</p>
                                <p className="text-red-500 text-xs">{requiredEmailError}</p>

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className=' flex items-center flex-row w-full g '>
                            <div className=' flex  justify-start  flex-col w-full '>
                                <label className='text-xs text-black w-28 text-start' htmlFor="">*First Name: </label>
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs' 
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
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs' 
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
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs t-1' 
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
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs' 
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
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs'
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
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs t-1' 
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
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs'
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
                                <label className='text-xs text-black w- text-start' htmlFor="">* Standard Login Password:</label>
                                <input className='bg-[#f2f2f2] rounded-[5px] border border-gray-300 w-56 text-black py-1 text-xs' 
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
                                <label className='text-xs text-black w-full text-start' htmlFor="">* Role: </label>
                                    <SearchableDropdown
                                            options={roles}
                                            label="role"
                                            id="id"
                                            selectedVal={role}
                                            handleChange={(val) => setRole(val)}
                                        />
                                <p className="text-red-500 text-xs">{roleError}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className='flex justify-center item pt-5'>
            <div className='sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer'
            onClick={createUser}
            
            > {
                loading ?
                    <>

                        <div role="status">
                            <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>

                    </>
                    :
                    <>
                    <p>Submit</p>
                    </>
            }</div>
        </div>
    </form>
</div>
</section>
)
}

export default Create_New_User