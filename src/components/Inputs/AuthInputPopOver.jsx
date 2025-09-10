import React from "react";
import { BsChevronDown } from "react-icons/bs";

const AuthInputPopOver = ({ placeholder, Value, onClick }) => {
  return (
    <div className="relative w-full font-inter" onClick={onClick}>
      <div className="py-3 px-3 pr-10 border bg-[#F5F5F5] text-black border-gray-300 rounded-[7.94px] w-full outline-none cursor-pointer">
        {Value === "" ? placeholder : Value}
      </div>
      <BsChevronDown className="flex absolute right-3 top-[.85rem]" />
    </div>
  );
};

export default AuthInputPopOver;
