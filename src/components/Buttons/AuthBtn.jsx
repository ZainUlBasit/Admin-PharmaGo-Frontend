import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthBtn.css";

const AuthBtn = ({ title, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`mt-[20px] min-w-[197px] h-fit py-2.5 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out AuthBtn`}
      onClick={onSubmit}
    >
      {title}
    </button>
  );
};

export default AuthBtn;
