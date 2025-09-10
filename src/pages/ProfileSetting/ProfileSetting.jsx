import React, { useState } from "react";
import SideBtn from "../../components/Buttons/SideBtn";
import { BiDetail } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import MyDetails from "./MyDetails";
import MyOrders from "./MyOrders";

const ProfileSetting = () => {
  const [ActiveButton, setActiveButton] = useState("MyDetails");
  const [CurrentTab, setCurrentTab] = useState("MyDetails");
  return (
    <div className="w-full flex max1120:flex-col justify-start fade-in h-[calc(100vh-110px)] mt-[110px] max1120:mt-[90px] max1120:p-2">
      {/* Left Side */}
      <div className="w-full justify-center hidden max1120:flex mt-5">
        <div className="w-[100%] flex justify-center items-center bg-[#EFE7EC] rounded-[10px] font-[700] text-[1.5rem] mt-5 mb-2 max300:w-[95%]">
          <div
            className={`w-[50%] flex justify-center items-center rounded-[10px] ${
              CurrentTab === "MyDetails"
                ? "bg-main text-white"
                : "bg-[#EFE7EC] text-[#000]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2 max480:text-[1.1rem] max300:text-[.8rem]`}
            onClick={() => {
              setCurrentTab("MyDetails");
              setActiveButton("MyDetails");
            }}
          >
            My Details
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[10px] ${
              CurrentTab === "MyOrders"
                ? "bg-main text-white"
                : "bg-[#EFE7EC] text-[#000]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2 max480:text-[1.1rem] max300:text-[.8rem]`}
            onClick={() => {
              setCurrentTab("MyOrders");
              setActiveButton("MyOrders");
            }}
          >
            My Orders
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full border-r-2 border-r-[#46546266] py-10 px-10 transition-all duration-500 ease-in-out max1120:hidden">
        <div className="flex flex-col gap-y-3">
          <SideBtn
            ActiveButton={ActiveButton}
            setActiveButton={setActiveButton}
            FilterText={"MyDetails"}
            title={"My Details"}
            Icon={BiDetail}
          />
          <SideBtn
            ActiveButton={ActiveButton}
            setActiveButton={setActiveButton}
            FilterText={"MyOrders"}
            title={"My Orders"}
            Icon={RiLockPasswordFill}
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex justify-center items-start overflow-y-auto h-[calc(100vh-110px)] max1120:h-fit mt-0">
        {ActiveButton === "MyDetails" ? (
          <MyDetails />
        ) : ActiveButton === "MyOrders" ? (
          <MyOrders />
        ) : (
          ""
        )}
      </div>

      {/* <div>{ActiveButton === "Subscription" && <Subscription />}</div> */}
    </div>
  );
};

export default ProfileSetting;
