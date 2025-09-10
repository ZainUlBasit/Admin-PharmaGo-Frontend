import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideDesign from "../../components/SideDesign/SideDesign";
import { GetMyProfileApi, SignInApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { IoLogoWhatsapp } from "react-icons/io";
const NewLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Add your validation and submission logic here
    setLoading(true);
    e.preventDefault();

    const BodyData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await SignInApi(BodyData);
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        localStorage.setItem("token", response.data?.data?.payload?.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.payload.user)
        );
        localStorage.setItem("role", response.data.data.payload.user.role);
        console.log(response.data.data.payload.user.role);

        if (response.data.data.payload.user.role === 2) {
          const adminResponse = await GetMyProfileApi();
          localStorage.setItem(
            "shipping",
            JSON.stringify(adminResponse.data.data.payload.shipping)
          );
        }
        // navigate("/");
        // window.location.reload();
        setLoading(false);
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (error) {
      if (error.response?.data?.error?.msg === "Customer not approved!")
        navigate("/approval");
      ErrorToast(error.response?.data?.error?.msg);
      console.log(error);
    }
  };
  return (
    <div className="flex gap-x-2 justify-center items-center w-screen h-screen px-10">
      <div className="flex flex-col gap-y-2 justify-center items-center h-[90%] w-1/2">
        <div className="text-5xl font-roboto font-bold">Welcome To</div>
        <img src="/logo.svg" className="w-[25rem]" alt="" />
        <div className="flex flex-col">
          Customer Service Contacts
          <a
            href="https://wa.me/+923110312452"
            target="_blank"
            className="whatsapp-link flex gap-x-2 items-center"
          >
            <IoLogoWhatsapp className="text-[#09c143]" />
            Chat with us on WhatsApp---
          </a>
        </div>
      </div>
      <div className="h-fit w-1/2 border-[1px] border-gray-400 p-8">
        <div className="flex flex-col gap-y-1">
          <div className="text-4xl font-bold text-center">Customer Portal</div>
          <div className="text-sm text-center">
            Today is a new day. It's your day. You shape it. Sign in to get new
            computer accessories.
          </div>
        </div>
        <div className="w-full flex flex-col items-start py-8">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline mt-2 block text-right"
          >
            Forgot Password?
          </a>
          <button
            className="mt-4 w-full bg-[#ffde59] text-white p-2 rounded-md hover:bg-pink-600"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
