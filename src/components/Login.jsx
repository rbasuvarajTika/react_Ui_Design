import Background from "./Background"
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpeg"
import { useState } from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toast'

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async (e) => {
        e.preventDefault()
        // navigate("/table")


        if (validateField()) {
            let userDetails = { userName, password };
            console.log("kjbhbkhbhvbj");
            try {
                setLoading(true)
                await axios.post('https://dev.tika.mobi:8443/next-service/api/v1/auth/signin',
                    JSON.stringify({ userName, password }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                    }
                    
                ).then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("tokenTika", res.data.token)
                        navigate("/table")
                        console.log(res);
                    }
                    setLoading(false)
                    toast.error("Please enter password", {
                        // backgroundColor: '',
                    })
                })

            } catch (error) {
                console.log(error);
                setLoading(false)
                toast.error("Entered UserId or Password is not correct")

            }
        } else {
            console.log("LLLLLLLLLLLLLLLL");   
        }
    }

    const validateField = () => {
        let result = true;
        if (userName === "" || userName === null) {
            result = false;
            toast.error("Please enter username")
        }

        if (password === "" || password === null) {
            result = false;
            toast.error("Please enter password", {
                backgroundColor: '',
            })
        }
        return result
    }



    return (
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
                    <h1 className="text-4xl text-white text-center py-5">Login</h1>
                    <form className="flex flex-col items-center gap-5">

                        <span>
                            <label htmlFor="userId" className="text-white text-sm pl-2">User ID:</label>
                            <input
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                type="text"
                                className="ml-5 rounded-full px-2  focus:outline-none "
                            />
                        </span>

                        <span>
                            <label htmlFor="password" className="text-white text-sm">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                value={password}
                                className="ml-5 rounded-full px-2 focus:outline-none"
                            />
                        </span>
                        <span className="w-full flex items-center justify-end">
                            <input type="checkbox" className="rounded-3xl mr-1" />
                            <label htmlFor="rememberMe" className="text-white text-[9px] font-light font-sans italic">Remember Me</label>
                            <a href="#" className="ml-2 text-white text-[9px] font-sans italic" >
                                Forgot UserID/<span onClick={() => navigate("/forgot")}>Password</span>
                            </a>
                        </span>
                        <button className="relative self-end rounded-full text-xs px-12 py-1 button-85 bg-white border-2 text-black" onClick={login}>
                            {
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
                            }
                        </button>
                    </form>
                </div>
            </div>
            <Background />
            <ToastContainer />
        </div>
    )
}

export default Login