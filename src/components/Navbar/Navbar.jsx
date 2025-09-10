import React, { useState } from "react";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import SearchBox from "../Inputs/SearchBox";
import { SlLocationPin } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [OpenModal, setOpenModal] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 flex flex-col items-center justify-between bg-white shadow-md z-20">
      <div className="h-fit w-full flex justify-end items-center bg-main py-2 px-3">
        <a
          href="https://maps.app.goo.gl/d3dgRw1EhuHpAtKB9"
          className="hover:underline gap-2 text-left font-quicksand flex items-center text-[.9rem] text-white gap-x-1"
        >
          <SlLocationPin className="text-xl" />
          <div className="text-[1rem] font-quicksand">Our Store</div>
        </a>
      </div>
      <div className="flex items-center justify-between p-4 bg-sec w-full">
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-14  mr-2 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="flex-grow mx-4">
          <SearchBox />
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="p-2"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <IoMdCart className="text-xl text-black" />
          </button>
          <button className="p-2">
            <FaRegHeart className="text-xl text-black" />
          </button>
          <button className="p-2">
            <FaRegUser
              className="text-xl text-black"
              onClick={() => {
                navigate("/profile");
              }}
            />
          </button>
          <button className="p-2">
            <IoExit
              className="text-xl text-black"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </button>
          {OpenModal && <LogoutModal open={OpenModal} setOpen={setOpenModal} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
