import React from "react";
import "./SideBtn.css";

const SideBtn = ({
  ActiveButton,
  setActiveButton,
  FilterText,
  title,
  Icon,
  onClick,
}) => {
  return (
    <div
      className={`flex transition-all duration-500 ease-in-out gap-x-4 items-center min-w-[250px] px-8 py-3 SideButtonWrapper cursor-pointer rounded-full  ${
        ActiveButton === FilterText
          ? "bg-main text-white "
          : " text-[#333333] bg-white"
      }`}
      onClick={onClick ? onClick : () => setActiveButton(FilterText)}
    >
      <Icon className="text-[1.5rem] SideButtonIcon font-[700] font-roboto" />
      <span className="text-[1.3rem] SideButtonText font-[700] font-roboto">
        {title}
      </span>
    </div>
  );
};

export default SideBtn;
