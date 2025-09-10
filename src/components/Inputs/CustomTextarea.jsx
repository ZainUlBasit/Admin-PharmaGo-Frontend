import React from "react";

const CustomTextarea = ({
  LabelName,
  className,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="flex flex-col gap-y-1 font-roboto w-full">
      <label htmlFor="" className="text-black">
        {LabelName}
      </label>
      <textarea
        type="text"
        className={`bg-[#F5F5F5] text-black font-roboto border border-gray-300 rounded-[7.94px] py-3 px-3 outline-none w-full ${className} text-[1rem]`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default CustomTextarea;
