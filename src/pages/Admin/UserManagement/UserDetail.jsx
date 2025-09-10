import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../store/Slices/CustomerSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UserDetail = () => {
  const { id } = useParams(); // Customer ID from the URL params
  const CustomerState = useSelector((state) => state.CustomerState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomers(id)); // Fetch customer details by ID
  }, [dispatch, id]);

  const customer = CustomerState?.data;

  return (
    <div className="flex-1 flex flex-col justify-start">
      {/* Header */}
      <div className="flex w-full justify-between items-center py-0 pb-2 flex-wrap h-[10vh]">
        <div className="text-2xl font-semibold flex items-center gap-x-2">
          <FaArrowLeft
            className="hover:scale-[1.3] transition-all ease-in-out duration-500 border-2 border-white hover:bg-main text-2xl flex items-center justify-center h-10 w-10 p-1 hover:text-white hover:rounded-full cursor-pointer"
            onClick={() => navigate(-1)} // Navigate back
          />
          User Detail
        </div>
      </div>

      <div className="w-full font-sans">
        {/* Background Header Section */}
        <div className="h-36 bg-gradient-to-l from-sec to-main border-b-[6px] border-b-sec"></div>

        {/* Profile Picture Section */}
        <div className="relative -mt-16 text-center">
          <div className="w-36 h-36 ml-10 relative">
            <img
              src={customer?.profile_pic || "https://placehold.co/112"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-[6px] border-sec"
            />
          </div>
        </div>

        {/* Customer Details Section */}
        <div className="w-full pb-8">
          <div className="text-main px-4 text-2xl py-6 font-roboto">
            Profile Details
          </div>
          <div className="grid grid-cols-1 py-2 px-4 gap-y-5">
            <div className="text-lg">
              <strong>Full Name:</strong> {customer?.name || "N/A"}
            </div>
            <div className="text-lg">
              <strong>Shop Name:</strong> {customer?.shopName || "N/A"}
            </div>
            <div className="text-lg">
              <strong>Contact No:</strong> {customer?.phoneNumber || "N/A"}
            </div>
            <div className="text-lg">
              <strong>Address:</strong>{" "}
              {Array.isArray(customer?.address) && customer?.address.length > 0
                ? customer.address[0]
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
