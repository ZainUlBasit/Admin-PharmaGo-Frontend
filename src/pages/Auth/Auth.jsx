import LoginComp from "../../components/Login/LoginComp";
import Register from "../../components/Register/Register";
import React, { useEffect, useState } from "react";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import MobLogoDesign from "../../components/LogoDesign/MobLogoDesign";

const Auth = () => {
  const [IsLogin, setIsLogin] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex w-[100vw] h-screen justify-start items-center max820:flex-col max820:h-auto max950:pr-0 max767:items-center fade-in">
        {windowWidth > 820 ? <LogoDesign /> : <MobLogoDesign />}
        <div className="flex justify-between flex-col items-center w-[55%] fade-in max550:w-full max1050:flex-1 max540:w-full">
          {/* button / login and register page */}
          <div className="bg-[#EFE7EC] text-[#020202] overflow-hidden rounded-[100px] font-[Quicksand] font-[700] w-fit max540:w-[90%] mb-5 mt-10">
            <button
              className={`${
                !IsLogin
                  ? "h-full py-3 max767:py-2 px-5 text-[30px]"
                  : "bg-[#465462E5] text-[#EFE7EC] h-full py-3 max767:py-2 px-5 rounded-[100px] text-[30px]"
              } max540:text-xl w-1/2`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`${
                IsLogin
                  ? " h-full py-3 max767:py-2 px-5 text-[30px]"
                  : "bg-[#465462E5] text-[#EFE7EC] h-full py-3 max767:py-2 px-5 rounded-[100px] text-[30px]"
              }  max540:text-xl w-1/2`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {IsLogin ? <LoginComp /> : <Register />}
        </div>
      </div>
    </>
  );
};

export default Auth;
