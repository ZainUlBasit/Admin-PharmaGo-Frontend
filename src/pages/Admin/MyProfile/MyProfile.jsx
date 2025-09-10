import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../../store/Slices/MyProfileSlice";
import { UpdateMyProfileApi } from "../../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../../utils/ShowToast";
import { MdUpdate } from "react-icons/md";

const userId = JSON.parse(localStorage.getItem("user"))?._id || "";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Destructure data, loading, and error state from MyProfileState
  const {
    data: profileData,
    loading,
    isError,
  } = useSelector((state) => state.MyProfileState);

  // State variables for input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  useEffect(() => {
    // Dispatch the action to fetch user profile data
    dispatch(fetchMyProfile(userId));
  }, [dispatch]);

  useEffect(() => {
    // Update state variables when profileData is loaded or changes
    if (profileData) {
      setName(profileData.name || "");
      setPhone(profileData.phoneNumber || "");
      setShippingFee(profileData.shipping);
      // Passwords are not typically pre-filled for security reasons
      setPassword("");
      setConfirmPassword("");
    }
  }, [profileData]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        ErrorToast("Password and Confirm Password do not match");
        return;
      }
      const response = await UpdateMyProfileApi(userId, {
        name,
        phoneNumber: phone,
        password,
        shipping: Number(shippingFee),
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        dispatch(fetchMyProfile(userId));
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.payload)
        );
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (error) {
      ErrorToast("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="flex-1">
      <Header
        title={"My Profile"}
        desc={"Manage and keep track of your profile."}
      />

      <div className="flex flex-col bg-white my-4 p-6 rounded-lg border-2 border-sec shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-main">
          Personal Information
        </h1>
        {loading && <p className="text-gray-600">Loading profile data...</p>}
        {isError && (
          <p className="text-red-500">
            Error loading profile data. Please try again.
          </p>
        )}
        {!loading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name" className="text-sm font-medium text-main">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-sec rounded-md bg-gray-50 focus:outline-none"
              />
            </div>
            {/* Phone Number Input */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-main"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 border border-sec rounded-md bg-gray-50 focus:outline-none"
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-main"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-sec rounded-md bg-gray-50 focus:outline-none"
              />
            </div>
            {/* Shipping Address Input (replaces original 'address' input) */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="shippingFee"
                className="text-sm font-medium text-main"
              >
                Shipping Fee
              </label>
              <input
                type="number" // Or "number" if appropriate, but "text" is fine for display
                id="shippingFee"
                min={0}
                value={shippingFee}
                onChange={(e) => setShippingFee(e.target.value)}
                className="p-2 border border-sec rounded-md bg-gray-50 focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleUpdateProfile}
              >
                <MdUpdate className="inline-block mr-2" /> Update Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
