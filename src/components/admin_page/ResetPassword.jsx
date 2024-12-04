import React, { useState, useEffect } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosBaseURL from "../axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header_Navigation_ResetPass from "../header/Header_Navigation_ResetPass";
import Background from "../Background";

const ResetPassword = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [userEditData, setUserEditData] = useState();

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userName = localStorage.getItem("userName");

        const userId = localStorage.getItem("userId");
        const response = await axiosBaseURL.get(
          `/api/v1/users/usersList/userId/${userId}`
        );
        const userDetails = response.data;
        console.log("Fetched User Details:", userDetails);
        if (userDetails && userDetails.firstName) {
          setUserData((prev) => ({
            ...prev,
            firstName: userDetails.firstName,
          }));
        }
        setUser(userName || "");
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  const updateUser = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const resetPassword = {
        userId: userId,
        newPassword: userData.password,
        confirmPassword: userData.confirmPassword,
      };

      const response = await axiosBaseURL.put(
        `/api/v1/users/update/user/password`,
        resetPassword
      );

      if (response.status === 201 || response.status === 200) {
        setUser(userName);
        toast.success("Password Updated Successfully");
      } else {
        // Handle errors, e.g., show an error message
        toast.error("Failed to update passwod");
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
    <>
      <div className=" px-2 pb-5 text-white  bg-[#1B4A68] min-h-fit w-screen relative z-50 h-screen">
        <Background />
        <Header_Navigation_ResetPass />

        <section className=" max-h-fit  flex justify-center  md:px-0 px-4 py-3 ">
          <div className="bg-[#ffffff] shadow-xl border rounded-3xl max-w-[500px] xl:max-w-[750px] xl:max-h-[1500px] max-h-[1000px] w-full h-30 xl:mt-15 mt-5 overflow-hidden overflow-y-scroll pb-5 no-scrollbar">
            <div className="pt-5 flex justify-center">
              <div className="h-5 rounded-xl w-40 relative">
                <div className="text-xs text-black w-55 text-start flex-block">
                  <h1>
                    Welcome{" "}
                    {userData.firstName ? (
                      <span className="underline hidden cursor-pointer md:block z-50">
                        {userData.firstName} {userData.middleName}{" "}
                        {userData.lastName}
                      </span>
                    ) : (
                      user
                    )}
                  </h1>
                </div>
              </div>

              <ToastContainer />
            </div>
            <form className="">
              <div className=" flex  flex-col  items-center">
                <div className="px-5 pt-10">
                  <div className="flex w-full xl:flex-row flex-col  xl:gap-5 gap-1 justify-between ">
                    <div className="flex flex-col">
                      <div className=" flex items-center flex-row w-full g ">
                        <div className=" flex  justify-start  flex-col w-full ">
                          <label
                            className="text-xs m-1 text-black w-full text-start"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className="bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 mb-4 text-black py-0.5 text-xs t-1"
                            name="password"
                            type="password"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className=" flex items-center flex-row w-full g ">
                        <div className=" flex  justify-start  flex-col w-full ">
                          <label
                            className="text-xs m-1 text-black w-28 text-start"
                            htmlFor="confirm password"
                          >
                            Confirm Password:{" "}
                          </label>
                          <input
                            className="bg-[#f2f2f2] rounded-2xl border border-gray-300 w-56 mb-6 text-black py-0.5 text-xs"
                            type="password"
                            name="confirmPassword"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-1 flex justify-center"></div>
              <div className="flex justify-center item pt-5">
                <div
                  className="sm:w-44 csm:w-32 vsm:w-20 w-28 py-2 bg-[#00ab06] rounded-xl flex justify-center md:text-sm text-xs cursor-pointer"
                  onClick={updateUser}
                >
                  Submit
                </div>
              </div>
              <div className="pt-5 flex justify-center text-center">
                <label className="text-xs text-black w-55  " htmlFor="">
                  To Change Email Address , Please Contact Support
                </label>
              </div>
              <div className="pt-1 flex justify-center">
                <label
                  className="text-xs text-black w-55  underline font-medium whitespace-nowrap"
                  htmlFor=""
                >
                  support@tikamobile.com
                </label>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
export default ResetPassword;
