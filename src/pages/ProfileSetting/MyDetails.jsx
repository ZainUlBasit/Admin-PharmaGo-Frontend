import React, { useEffect, useState } from "react";
import CustomInput from "../../components/Inputs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import AuthBtn from "../../components/Buttons/AuthBtn";
import { ChangeProfilePicApi, UpdateCustomerApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { IoDocumentAttach } from "react-icons/io5";
const user_id = JSON.parse(localStorage.getItem("user"))?.cust_id?._id;

const MyDetails = () => {
  const CustomerState = useSelector((state) => state.CustomerState);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(
    "https://placehold.co/112" // Default placeholder
  );
  const [profilePicFile, setProfilePicFile] = useState(null); // File for backend

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers(user_id));
  }, []);
  useEffect(() => {
    if (CustomerState?.data) {
      setName(CustomerState?.data?.name);
      const addressArray = CustomerState?.data?.address;
      if (Array.isArray(addressArray) && addressArray.length > 0) {
        setAddress(addressArray[0]);
      }
      setPhoneNumber(CustomerState?.data?.phoneNumber);
      setShopName(CustomerState?.data?.shopName);
      setProfilePicPreview(CustomerState?.data?.profile_pic);
    }
  }, [CustomerState]);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicPreview(imageUrl); // For preview
      setProfilePicFile(file); // For backend submission
    }
  };
  const handleSave = async () => {
    if (profilePicFile) {
      const formData = new FormData();
      formData.append("image", profilePicFile);

      // Make an API call to upload the file
      try {
        const response = await ChangeProfilePicApi(user_id, formData);
        if (response.data.success) {
          SuccessToast(response.data.data.msg);
          dispatch(fetchCustomers(user_id));
        }
      } catch (err) {
        console.log(err);
        ErrorToast("Error occured while updating!");
      }
    }
  };
  return (
    <div className="w-full py-0">
      {/* Header Section */}
      <div className="h-36 bg-gradient-to-l from-sec to-main border-b-[6px] border-b-sec"></div>

      {/* Profile Section */}
      <div className="relative -mt-16 text-center">
        <div className="w-36 h-36 ml-10 relative">
          <img
            src={profilePicPreview}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-[6px] border-sec"
          />
          <label
            htmlFor="add-image"
            className="flex items-center gap-x-1 font-quicksand font-semibold text-main hover:text-sec cursor-pointer transition-all ease-in-out duration-500 absolute bottom-1/4 transform translate-y-1/4 -right-36"
          >
            <IoDocumentAttach className="text-2xl" />
            Add Profile Pic
          </label>
          <input
            type="file"
            id="add-image"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-2 text-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Save Profile Picture
        </button>
      </div>
      <div className="text-main px-4 text-2xl py-6 font-roboto">
        Edit Your Profile
      </div>
      <div className="grid grid-cols-1 py-2 px-4 gap-y-5">
        <div className="">
          <CustomInput
            LabelName={"Full Name"}
            placeholder={"Enter Your Name"}
            className="rounded-[10px]"
            value={name}
            setValue={setName}
          />
        </div>
        <div className="">
          <CustomInput
            LabelName={"Shop Name"}
            placeholder={"Enter Your Shop Name"}
            className="rounded-[10px]"
            value={shopName}
            setValue={setShopName}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <CustomInput
              LabelName={"Contact No"}
              placeholder={"Enter Contact No."}
              className="rounded-[10px]"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </div>
          <div className="">
            <CustomInput
              LabelName={"Address"}
              placeholder={"Enter Your Address"}
              className="rounded-[10px]"
              value={address}
              setValue={setAddress}
            />
          </div>
        </div>

        <div className="">
          <CustomInput
            LabelName={"Change Password"}
            placeholder={"**********"}
            className="rounded-[10px]"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="w-full flex justify-center px-4">
          <AuthBtn
            title={"Update"}
            onSubmit={async () => {
              setLoading(true);
              try {
                const response = await UpdateCustomerApi(user_id, {
                  name,
                  phoneNumber,
                  shopName,
                  address,
                  password,
                });
                if (response.data.success) {
                  SuccessToast(response.data.data.msg);
                  dispatch(fetchCustomers(user_id));
                }
              } catch (err) {
                console.log(err);
                ErrorToast("Error occured while updating!");
              }
              setLoading(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
