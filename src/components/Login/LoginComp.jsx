import React, { useEffect, useRef, useState } from "react";
import AuthInput from "../Inputs/AuthInput";
import AuthInputPassword from "../Inputs/AuthInputPassword";
import AuthBtn from "../Buttons/AuthBtn";
import { Link, useNavigate } from "react-router-dom";
import AddingLoader from "../Loaders/AddingLoader";
import { useDispatch } from "react-redux";
import "./LoginComp.css";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import { GetMyProfileApi, SignInApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";

const LoginComp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [CurrentUser, setCurrentUser] = useState({});
  const [Token, setToken] = useState("");
  const [CompanyData, setCompanyData] = useState({});
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [OtpSend, setOtpSend] = useState(false);
  const [OTPLoading, setOTPLoading] = useState(false);

  const [otp, setOTP] = useState(["", "", "", ""]); // Initialize with empty strings
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Refs for each input field
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure the input is a single digit
    if (/^[0-9a-zA-Z]$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus the next input field (if available)
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  useEffect(() => {
    // Check if the response_type is set in localStorage
    const loggedIn = localStorage.getItem("logged-in");

    // If it's set, navigate to the home page
    if (loggedIn) {
      navigate("/home");
    }
  }, [localStorage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;
    let response_type;
    if (Email.length !== 11) {
      ErrorToast("Invalid Mobile #!");
      setLoading(false);
      return;
    }
    try {
      response = await SignInApi({
        phoneNumber: Email.toLowerCase(),
        password: Password,
      });
      console.log(response.data);
      console.log(response.data.success);
      response_type = response.data.success;
      if (response_type) {
        localStorage.setItem("role", response.data.data.payload.user.role);
        SuccessToast(response.data.data.msg);
        if (response.data?.data?.msg === "Successfully Logged In!") {
          localStorage.setItem("role", response.data.data.payload.user.role);
          localStorage.setItem("token", response.data?.data?.payload?.token);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.data.payload.user)
          );
          if (response.data.data.payload.user.role === 2) {
            const adminResponse = await GetMyProfileApi();
            localStorage.setItem(
              "shipping",
              JSON.stringify(adminResponse.data.data.payload.shipping)
            );
          }
          navigate("/");
          window.location.reload();
        }
      } else {
        const current_status = response.response?.status || response.status;
        if (current_status === 200) {
          ErrorToast(response.data.error.msg);
        } else if (current_status === 401) {
          ErrorToast(response.response?.data?.error?.msg);
        }
      }
    } catch (err) {
      response = err;
      response_type = response.data?.success || false;
      console.log(err);
      ErrorToast(response.response?.data?.error?.msg);
    }
    // console.log(response_type);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const verifyOtp = async (e) => {
    setOTPLoading(true);
    const fullOtp = otp[0] + otp[1] + otp[2] + otp[3];
    if (fullOtp.length < 4) {
      WarningToast("Invalid Otp!");
    } else {
      const enteredOtp = otp[0] + otp[1] + otp[2] + otp[3];
      let response;
      try {
        response = await VerifySinginOtpApi({
          mobile_number: Email,
          otp: enteredOtp,
        });
        console.log(response);
        onSubmit(e);
      } catch (err) {
        console.log(err);
      }
      console.log("yes", response);
      // const response = await VerifyAdminOtpApi({
      //   accountId: AccountId,
      //   otp: fullOtp,
      // });
      // if (response.data.success) {
      //   localStorage.setItem(
      //     "user-data",
      //     JSON.stringify(response.data.data.payload.user)
      //   );
      //   localStorage.setItem("token", response.data.data.payload.token);
      //   localStorage.setItem("logged-in", true);

      //   console.log(response.data.data.payload.user);
      //   SuccessToast(response.data.data.msg);
      //   window.location.reload();
      //   navigate("/admin/dashboard");
      // }
      // }
      setOTPLoading(false);
    }
  };

  return (
    <>
      <div className="w-[383px] max767:w-[95%] max767:mb-4 min-h-[496px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex items-center flex-col rounded-md pt-[40px] font-[Quicksand] fade-in LoginWrapper mx-10">
        <h1 className="w-full text-[1.8rem] font-[700] text-center WelcomeText">
          {!OtpSend ? "WELCOME BACK!" : "VERIFY YOUR ACCOUNT"}
        </h1>
        <p className="mb-[80px] font-[300] DescText text-center px-5">
          {!OtpSend
            ? "Use Credentials to access your account"
            : "Your account in not verified. Kindly, verify your number by entering the OTP"}
        </p>

        <form onKeyDown={handleKeyDown} className="flex flex-col gap-y-[2px]">
          <AuthInput
            label={"Mobile-Number"}
            placeholder={"1234567890"}
            Value={Email}
            setValue={setEmail}
            required={false}
            Type={"text"}
          />
          <div className="mb-1 LoginBet"></div>
          <AuthInputPassword
            label={"Password"}
            placeholder={"*************"}
            Value={Password}
            setValue={setPassword}
            required={false}
          />
        </form>

        <div className="mb-1"></div>
        <div className="w-[297px] flex justify-end mt-[-10px] mb-[60px] ForgetWrapper">
          {/* <div>
            <label>
              <input
                type="checkbox"
                className="mr-1"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div> */}
          <Link to={"/forgot-password"} className="underline ForgetTextLogin">
            Forget Password?
          </Link>
        </div>
        {Loading ? (
          <AddingLoader />
        ) : (
          !OtpSend && <AuthBtn title={"Sign In"} onSubmit={onSubmit} />
        )}

        <div className={`max-w-[300px] ${!OtpSend && "hidden"}`}>
          <div className="pb-4 px-7 rounded-lg flex flex-col items-center justify-center w-full  font-[Quicksand]">
            <p className="mb-[10px] font-[400] text-center w-full font-montserrat text-custom-bg">
              Enter the OTP sent to {Email}
            </p>

            {/* OTP Inputs */}
            <div className="flex">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  maxLength="1"
                  ref={inputRefs[index]}
                  className="border border-gray-300 rounded-md w-12 h-12 text-center m-2"
                />
              ))}
            </div>
            {OTPLoading ? (
              <div className="my-4">
                <AddingLightLoader />
              </div>
            ) : (
              <div
                className="w-[200px] py-3 bg-custom-bg hover:bg-custom-bg-hover text-aliceblue transition-all ease-in-out duration-500 text-xl font-bold font-montserrat text-center rounded-[10px] cursor-pointer my-2"
                // onClick={verifyOtp}
              >
                <AuthBtn title={"Verify"} onSubmit={verifyOtp} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComp;
