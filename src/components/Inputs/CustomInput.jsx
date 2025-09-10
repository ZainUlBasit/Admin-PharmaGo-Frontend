import React from "react";

const CustomInput = ({
  LabelName,
  className,
  placeholder,
  value,
  setValue,
  disabled,
  type,
}) => {
  return (
    <div className="flex flex-col gap-y-1 font-roboto w-full">
      <label htmlFor="" className="text-black">
        {LabelName}
      </label>
      <input
        type={type ? type : "text"}
        className={`bg-[#F5F5F5] text-black font-roboto border border-gray-300 rounded-[7.94px] py-3 px-3 outline-none w-full ${className} text-[1rem]`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled ? true : false}
      />
    </div>
  );
};

export default CustomInput;
