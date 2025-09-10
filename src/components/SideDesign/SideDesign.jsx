import React from "react";

const SideDesign = () => {
  return (
    <div className="flex justify-center items-center flex-1 bg-[#F1D9E2] relative max800:absolute max800:top-1/2 max800:left-1/2 max800:transform max800:-translate-x-1/2 max800:-translate-y-1/2 max800:w-full max800:opacity-20">
      <img
        src="/bgg.jpg"
        alt="Background Image"
        className="h-screen bg-cover bg-center object-cover absolute top-0 left-0 w-full"
      />
      <div className="bg-main bg-opacity-60 w-full h-full absolute top-0 left-0"></div>
      <div className="bg-black bg-opacity-20 w-full h-full absolute top-0 left-0"></div>
      <div className="absolute top-0 left-0 h-fit w-full flex flex-col justify-center items-center">
        <div className="w-fit">
          <img src="/logo.svg" className="w-[30rem]" />
          <div
            className="text-[#E82790] text-[1.5rem] w-full flex justify-end font-semibold"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adjust values as needed
            }}
          >
            Importer of Computer Accessories
          </div>
        </div>
        <div className="flex w-full justify-center py-20">
          <div
            className="text-5xl font-inter font-bold text-[#E82790]"
            style={{
              textShadow: "0px 0px 10px 20px rgba(0, 0, 0, 0.9)", // Adjust values as needed
            }}
          >
            Customer Portal
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDesign;
