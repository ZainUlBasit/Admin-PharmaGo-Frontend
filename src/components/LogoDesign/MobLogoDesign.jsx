import React from "react";

const MobLogoDesign = () => {
  return (
    <div className="relative w-full">
      <img src="/LogoBackG.svg" className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center max480:h-[80%]">
        <img
          src="/DesignLogo.svg"
          className="w-[280px] max570:w-[200px] max480:w-[180px] max330:w-[120px] max300:w-[100px] max820:w-[250px]"
        />
      </div>
    </div>
  );
};

export default MobLogoDesign;
