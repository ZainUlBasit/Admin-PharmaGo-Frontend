import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { SignUpApi } from "../../ApiRequests";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    shopName: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // Add your validation and submission logic here
    setLoading(true);
    e.preventDefault();
    let response;
    const BodyData = {
      name: formData.name,
      email: formData.email,
      shopName: formData.shopName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: 2,
    };
    if (
      !formData.name ||
      !formData.email ||
      !formData.shopName ||
      !formData.phoneNumber ||
      !formData.address
    ) {
      ErrorToast("All fields are required!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      ErrorToast("Passwords do not match!");
      return;
    }

    try {
      const response = await SignUpApi(BodyData);
      if (response.data.success) {
        console.log(response.data.data.msg);
        SuccessToast(response.data.data.msg);
        // Reset all state variables upon successful signup
        setFormData({
          name: "",
          email: "",
          shopName: "",
          phoneNumber: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
        setLoading(false);
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative max800:bg-[#F1D9E2] max800:justify-center max800:items-center">
      <div className="flex flex-col items-center justify-center w-1/2 max-w-[500px] max800:w-[90%] p-8 px-12 max600:px-3 bg-transparent shadow-lg max800:shadow-none z-10 fade-in">
        <h1 className="text-3xl font-bold mb-4">Get Started!</h1>
        <p className="text-gray-600 mb-6">
          Today is a new day. It's your day. You shape it. Sign up to start your
          journey.
        </p>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Example John doe"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
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
            Shop Name
          </label>
          <input
            type="text"
            name="shopName"
            placeholder="Example Shop ABC"
            value={formData.shopName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Example 0333-1234567"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Example House 1 Street 1 Town ABC"
            value={formData.address}
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
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="At least 8 characters"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-main text-white p-2 rounded-md hover:bg-[rgb(90,74,227,0.9)]"
          >
            Sign up
          </button>
        </div>
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-[#ffde59] hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
      <div className="flex justify-center items-center flex-1 bg-[#F1D9E2] relative max800:absolute max800:top-1/2 max800:left-1/2 max800:transform max800:-translate-x-1/2 max800:-translate-y-1/2 max800:w-full max800:opacity-20">
        <img
          src="/BgSideImage.svg"
          alt="Background Image"
          className="h-screen bg-cover bg-center object-contain"
        />
      </div>
    </div>
  );
};

export default Register;
