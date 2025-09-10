import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import CustomInput from "../Inputs/CustomInput";
import { ChangePasswordApi, UpdateCategoryApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import { useDispatch } from "react-redux";

const ChangePasswordModal = ({ open, setOpen, customer_id }) => {
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ChangePasswordApi(customer_id, {
        password: Password,
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
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
      <div className="flex flex-col px-8 py-4">
        <div className="flex w-full justify-center items-center font-bold text-4xl border-b-[3px] border-b-[#0e2480] py-4 pb-6">
          <div className="text-3xl text-black">Change Password</div>
        </div>
        <div className="flex flex-col justify-center items-center py-6">
          <div className="flex gap-x-4 py-0 pb-6">
            <div className="flex flex-col gap-y-4">
              <div className="w-[400px]">
                <CustomInput
                  LabelName="Password"
                  placeholder="Password"
                  value={Password}
                  setValue={setPassword}
                  type={"password"}
                />
              </div>
            </div>
          </div>
          {Loading ? (
            <div className="flex gap-x-5 pt-4"></div>
          ) : (
            <div className="flex gap-x-5 pt-4">
              <button
                className="border-[2px] border-[green] text-[green] font-bold hover:text-white hover:bg-[green] transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px]"
                onClick={onSubmit}
              >
                Update
              </button>
              <button
                className="border-[2px] border-[red] text-[red] font-bold hover:text-white hover:bg-[red] transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ChangePasswordModal;
