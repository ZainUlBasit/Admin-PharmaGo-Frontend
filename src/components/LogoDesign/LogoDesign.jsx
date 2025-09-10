import React from "react";
import "./LogoDesign.css";
import { FaWhatsapp } from "react-icons/fa";
import { PiWhatsappLogoDuotone } from "react-icons/pi";

const LogoDesign = () => {
  return (
    <div className="relative fade-in max-w-[602px">
      <img src="/AuthBg.png" className="w-fit h-[105vh]" />
      <div className="absolute bottom-24 right-[20%] h-[30vh] flex flex-col justify-between">
        <div className="w-full flex justify-center items-center">
          <img src="/DesignLogo.svg" className="w-[300px] pl-0" />
        </div>
      </div>
    </div>
  );
};

export default LogoDesign;
