import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideDesign from "../../components/SideDesign/SideDesign";
import { SignInApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";

const Login = () => {
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

        if (response.data.data.payload.user.role === 1) {
          const adminResponse = await GetMyProfileApi();
          localStorage.setItem(
            "shipping",
            JSON.stringify(adminResponse.data.data.payload.shipping)
          );
        } else if (response.data.data.payload.user.role === 2) {
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
    <div className="flex min-h-screen bg-gray-100 relative max800:bg-[#F1D9E2] max800:justify-center max800:items-center">
      <div className="flex flex-col items-center justify-center w-1/2 max-w-[500px] max800:w-[90%] p-8 px-12 max600:px-3 bg-transparent shadow-lg max800:shadow-none z-10 fade-in">
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-600 mb-6">
          Today is a new day. It's your day. You shape it. Sign in to get new
          computer accessories.
        </p>
        <div className="w-full">
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
            className="mt-4 w-full bg-main text-white p-2 rounded-md hover:bg-[rgb(90,74,227,0.9)]"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </div>
        <p className="mt-4 text-gray-600">
          Don't you have an account?{" "}
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="text-[#ffde59] hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
      <SideDesign />
    </div>
  );
};

export default Login;
