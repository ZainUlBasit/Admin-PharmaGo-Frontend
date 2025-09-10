import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import CustomInput from "../Inputs/CustomInput";
import { IoExit } from "react-icons/io5";

const LogoutModal = ({ open, setOpen }) => {
  const onSubmit = async (e) => {
    try {
      localStorage.clear(); // Clears all keys and values in localStorage
      window.location.reload(); // Reloads the page
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("err", err);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="flex flex-col px-0 py-4">
        <div className="flex w-full justify-center items-center font-bold text-4xl border-b-[3px] border-b-[#0e2480] py-4 pb-6">
          <div className="text-3xl text-black">Logout</div>
        </div>
        <div className="flex flex-col justify-center items-center py-6 px-10">
          <div className="flex flex-col gap-y-4 py-0 pb-6 items-center justify-center">
            <IoExit className="text-main text-[8rem]" />
            <div className="font-[300] text-black text-xl">
              Are you sure want to logout?
            </div>
          </div>
          <div className="flex gap-x-5 pt-4">
            <button
              className="border-[2px] border-main text-main font-bold hover:text-white hover:bg-main transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="border-[2px] border-main bg-main text-white font-bold hover:text-white hover:bg-main hover:bg-opacity-85 transition-all ease-in-out duration-500 px-3 py-2 rounded-lg w-[150px]"
              onClick={onSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LogoutModal;
