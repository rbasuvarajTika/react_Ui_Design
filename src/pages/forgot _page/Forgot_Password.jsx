import Background from "../../components/Background"
import { useNavigate } from "react-router-dom";
import axiosBaseURL from '../../components/axios'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toast'

const Forgot_Password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send a POST request to your API with the email data
          const response = await axiosBaseURL.post('/api/v1/notification/emails/forgotpassword', {
            email: email,
            resetLink:'https://dev.tika.mobi/nsrxmgt/forgot'
          });
    
          if (response.data.message == 'Email Sent Successfully') {
            toast.success("Email Sent Successfully");
            setEmail("");
          } else {
            toast.error("Please enter Valid Email");
          }
        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          toast.error("Please enter Valid Email");
          console.error('Error sending confirmation email:', error);
        }
      };

  return (
   <>
     <div className='bg-[#1B4A68] w-screen h-screen flex items-center justify-center relative z-20'>
            <h1 className="absolute top-8 left-12 text-lg text-white flex  z-20">Tika <span className=" ml-1 leading-[12px]"><h1 className="mt-2">Mobile</h1><p className="text-[8px] italic tracking-tighter">The inteligent CRN</p></span></h1>
            <h1 className="absolute right-4 top-20 md:top-8 text-white text-3xl z-20 ">NE<span className="w-full h-full relative">X <p className="absolute left-1.5 top-0.5 text-2xl text-[#276A8C] z-20">X</p></span>T SCIENCE</h1>
            <div className="border-style absolute bg-orange-400 left-10 top-8 w-10 h-10 z-10"></div>
            <div className="bg-[rgb(43,108,142)] border-[#235979] min-w-[300px] min-h-[348px]  border-[10px]  rounded-3xl flex flex-col items-center p-2 md:p-10 z-[999] lg:min-w-1/4 lg:min-h-1/2">
                <span className="leading-[10px]">
                    <h1 className="text-3xl  text-[#FE7D00] leading-[25px]">Tika<span className="text-[#06AEE5]">Rx</span></h1>
                    <p className="text-[9px] text-white ml-1">Rx Management system</p>
                </span>
                <div className="">
                    <h1 className="text-xl text-white text-center py-5"></h1>
                    <form className="flex flex-col items-center  gap-5" onSubmit={handleSubmit}>
                        <span className="flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-2">
                            <label htmlFor="userId" className="text-white text-sm ">Enter User Id :</label>
                            <input
                                onChange={handleEmailChange}
                                name="userId"
                                type="email"
                                value={email}
                                required
                                className="md:ml-5 rounded-full px-2  focus:outline-none "
                            />
                        </span>
                        <div className="flex gap-5">
                             <button className="relative mt-5 self-en rounded-full text-xs px-12 py-1 button-85 bg-white border-2 text-black" onClick={() => navigate("/nsrxmgt")}>Back</button>
                             <button type="submit" className="relative mt-5 self-end rounded-full text-xs px-12 py-1 button-85 bg-white border-2 text-black" >Submit</button>
                        </div>
                       
                    </form>
                </div>
            </div>
            <Background />
            <ToastContainer />
        </div>
   </>
  )
}

export default Forgot_Password