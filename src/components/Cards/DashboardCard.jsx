import React from "react";

const DashboardCard = ({ amount, title }) => {
  return (
    <div
      className="flex items-center h-[14vh] rounded-3xl overflow-hidden w-full max-w-[500px] max1240:w-full max1240:max-w-full border border-main border-x-[6px] border-x-main"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <div className="w-11 h-full bg-main"></div>
      <div className="w-3 h-full bg-sec"></div>
      <div className="flex flex-1 justify-center items-start flex-col pl-5 h-full">
        <div className="text-3xl font-bold font-quicksand">{amount}</div>
        <div className="text-gray-500 text-sm font-[600] font-quicksand w-full">
          {title}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
