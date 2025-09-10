import React, { useState } from "react";
import AuthInput from "../Inputs/AuthInput";
import AuthInputPassword from "../Inputs/AuthInputPassword";
import { FaPlus } from "react-icons/fa";
import AuthBtn from "../Buttons/AuthBtn";
import toast from "react-hot-toast";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import AddingLoader from "../Loaders/AddingLoader";
import { SignUpApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";

const Register = () => {
  const [Name, setName] = useState("");
  const [ShopName, setShopName] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let response;
    const BodyData = {
      name: Name,
      shopName: ShopName,
      phoneNumber: MobileNumber,
      address: Address,
      password: Password,
      confirmPassword: ConfirmPassword,
      role: 2,
    };

    if (!Name || !ShopName || !MobileNumber || !Address || !Password) {
      ErrorToast("Required fields are undefined!");
      setLoading(false);
      return;
    }
    if (MobileNumber.length !== 11) {
      ErrorToast("Invalid Mobile #!");
      setLoading(false);
      return;
    }
    if (Password !== ConfirmPassword) {
      ErrorToast("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      response = await SignUpApi(BodyData);
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        // Reset all state variables upon successful signup
        setName("");
        setShopName("");
        setMobileNumber("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        navigate("/auth");
      } else {
        toast.error(response.data.error.msg);
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err?.response?.data?.error?.msg);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-[383px] max767:w-[95%] max767:mb-4 min-h-[496px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex items-center flex-col p-[2rem] rounded-md font-[Quicksand] fade-in LoginWrapper mx-10 RegisterWrapper">
        <h1 className="w-full text-[26px] font-[700] text-center RegisterWelcomeText">
          REGISTER
        </h1>
        <p className="mb-[30px] font-[300] RegisterDescText max-w-[350px] text-center mt-1">
          Sign up to start your journey.
        </p>
        {/* main wrapper */}
        <div className="w-full flex flex-col gap-y-2 items-center">
          <AuthInput
            label={"Name"}
            placeholder={"Your Name"}
            Value={Name}
            setValue={setName}
            required={false}
          />
          <AuthInput
            label={"Shop Name"}
            placeholder={"Shop XYZ"}
            Value={ShopName}
            setValue={setShopName}
            required={false}
          />
          <AuthInput
            label={"Mobile Number"}
            placeholder={"1234567890"}
            Value={MobileNumber}
            setValue={setMobileNumber}
            required={false}
          />
          <AuthInput
            label={"Address"}
            placeholder={"123 Street, City"}
            Value={Address}
            setValue={setAddress}
            required={false}
          />
          <AuthInputPassword
            label={"Password"}
            placeholder={"*************"}
            Value={Password}
            setValue={setPassword}
            required={false}
          />
          <AuthInputPassword
            label={"Confirm Password"}
            placeholder={"*************"}
            Value={ConfirmPassword}
            setValue={setConfirmPassword}
            required={false}
          />
        </div>

        {Loading ? (
          <div className="py-6">
            <AddingLoader />
          </div>
        ) : (
          <AuthBtn title={"Sign Up"} onSubmit={onSubmit} />
        )}
      </div>
    </>
  );
};

export default Register;
