import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import CustomInput from "../Inputs/CustomInput";
import CustomTextarea from "../Inputs/CustomTextarea";
import { fetchCustomersAddress } from "../../store/Slices/CustomerAddressSlice";
import { useDispatch } from "react-redux";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { AddCustomerAddressApi } from "../../ApiRequests";
const user = JSON.parse(localStorage.getItem("user"));

const AddAddressModal = ({ open, setOpen }) => {
  const [Loading, setLoading] = useState(false);
  const [Address, setAddress] = useState("");
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AddCustomerAddressApi({
        address: Address,
        customer_id: user?.cust_id?._id,
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        dispatch(fetchCustomersAddress(user?.cust_id?._id));
        setOpen(false);
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("err", err);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="flex flex-col px-8 py-0 max480:px-0 w-full ">
        <div className="flex w-full justify-center items-center font-bold text-4xl border-b-[3px] border-b-[#0e2480] py-4 pb-6 ">
          <div className="text-3xl text-black max365:text-xl">
            Add New Address
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-6 max480:w-full">
          <div className="flex gap-x-4 py-0 pb-6 max480:w-full">
            <div className="flex flex-col gap-y-4 max480:w-full">
              <div className="w-[400px] max540:w-[300px] max480:w-full max365:w-full">
                <CustomTextarea
                  LabelName="Address"
                  className="w-[400px] max540:w-[300px] max480:w-full max365:w-full"
                  placeholder="Enter Address"
                  value={Address}
                  setValue={setAddress}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-5 pt-4 max300:flex-col max300:w-full gap-y-2">
            <button
              className="border-[2px] border-[green] text-[green] font-bold hover:text-white hover:bg-[green] transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px] max400:w-[100px] max300:w-full"
              onClick={onSubmit}
            >
              Add
            </button>
            <button
              className="border-[2px] border-[red] text-[red] font-bold hover:text-white hover:bg-[red] transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px] max400:w-[100px] max300:w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddAddressModal;
