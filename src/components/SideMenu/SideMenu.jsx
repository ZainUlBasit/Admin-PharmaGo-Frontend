import React, { useEffect, useState } from "react";
import Avatar from "../../assets/images/Avatar.png";
import { MdCategory, MdExitToApp } from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import SideMenuItem from "./SideMenuItem";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchMyProfile } from "../../store/Slices/MyProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const SideMenuData = [
  {
    title: "Dashboard",
    Icon: TbReorder,
    Link: "/admin",
  },
  {
    title: "Cities Management",
    Icon: FaUser,
    Link: "/admin/cities",
  },
  {
    title: "Category Management",
    Icon: MdCategory,
    Link: "/admin/category",
  },
  {
    title: "Product Management",
    Icon: AiFillProduct,
    Link: "/admin/products",
  },
  {
    title: "Order Management",
    Icon: FaCartShopping,
    Link: "/admin/orders",
  },
  {
    title: "My Profile",
    Icon: FaUser,
    Link: "/admin/my-profile",
  },
];

const userId = JSON.parse(localStorage.getItem("user"))?._id || "";

const SideMenu = () => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const [CurrentMenu, setCurrentMenu] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Initialize user state with a function to prevent re-running JSON.parse on every render
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Destructure data, loading, and error state from MyProfileState
  const {
    data: profileData,
    loading,
    isError,
  } = useSelector((state) => state.MyProfileState);

  useEffect(() => {
    // Dispatch the action to fetch user profile data
    dispatch(fetchMyProfile(userId));
  }, [dispatch]);

  useEffect(() => {
    const updateUserData = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Update user data initially when the component mounts
    updateUserData();

    // Listen for 'storage' events (changes from other tabs/windows)
    window.addEventListener("storage", updateUserData);

    // Listen for a custom event for changes within the same tab/window.
    // This requires the component that updates localStorage.user to dispatch this event.
    // Example: After updating user in localStorage, call `window.dispatchEvent(new Event('userUpdatedInLocalStorage'));`
    window.addEventListener("userUpdatedInLocalStorage", updateUserData);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storage", updateUserData);
      window.removeEventListener("userUpdatedInLocalStorage", updateUserData);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div
      className="flex flex-col min-h-full py-5 pb-0  w-[300px] rounded-r-[28px] overflow-hidden bg-white border-r-4 border-r-sec max950:hidden"
      style={{
        boxShadow:
          "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
      }}
    >
      <motion.div
        variants={item}
        className="top flex items-center justify-between w-full px-10 border-b-2 border-b-gray-300 pb-5"
      >
        <div className="flex items-center gap-x-4">
          <img src={Avatar} className="w-[50px]" alt="image not found!" />
          <div className="flex flex-col text-black">
            <div className="text-black select-none font-quicksand font-bold text-[1.4rem]">
              Admin
            </div>
            <div className="text-black select-none font-quicksand font-bold text-[.8rem] !uppercase !font-500 whitespace-nowrap">
              {profileData?.name || "Admin"}
            </div>
          </div>
        </div>

        {/* <MdNotificationsActive /> */}
      </motion.div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          {SideMenuData.map((dt) => {
            return (
              <SideMenuItem
                title={dt.title}
                Icon={dt.Icon}
                onClick={() => {
                  setCurrentMenu(dt.title);
                }}
                SubItems={dt.SubItems}
                CurrentMenu={CurrentMenu}
                setCurrentMenu={setCurrentMenu}
                Link={dt.Link ? dt.Link : false}
              />
            );
          })}
        </div>
        <div className="flex flex-col">
          <SideMenuItem
            title={"Logout"}
            Icon={MdExitToApp}
            onClick={() => {
              setCurrentMenu("");
              console.log("test");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("role");
              window.location.reload();
            }}
            CurrentMenu={CurrentMenu}
            setCurrentMenu={setCurrentMenu}
            className="self-end"
            Active={true}
            Link={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
