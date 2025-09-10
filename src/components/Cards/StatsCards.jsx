import React from "react";

const StatsCards = ({ title, statsData }) => {
  return (
    <div className="flex flex-col bg-white px-6 py-4 rounded-2xl shadow-md gap-y-2 my-3 border-[3px] border-sec">
      <div className="text-xl font-JakartaSans font-bold">{title}</div>
      <div
        className={`grid bg-white rounded-2xl ${
          title === "Order Overview"
            ? "max780:grid-cols-2  max670:grid-cols-1"
            : ""
        } ${
          statsData.length === 1
            ? "grid-cols-1"
            : statsData.length === 2
            ? "grid-cols-2"
            : statsData.length === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        }`}
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-start  px-5 ${
              statsData.length - 1 !== index
                ? "border-r-[1px] border-r-gray-300 max670:border-r-0  px-2"
                : ""
            }`}
          >
            <h4
              className={`text-[1rem] font-Inter font-medium ${stat.textColor}`}
            >
              {stat.title}
            </h4>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <span className="text-gray-400 text-xs mt-1">
                  {stat.subtitle}
                </span>
              </div>
              {stat?.subtitle2 && (
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold mt-1">{stat.value2}</p>
                  <span className="text-gray-400 text-xs mt-1">
                    {stat.subtitle2}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
