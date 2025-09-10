import React, { useEffect, useState } from "react";
import { StyledWrapperItem } from "./SideMenu.Styled";
import second from "../../assets/images/second.png";
import first from "../../assets/images/first.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiUsers } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SideMenuItem = ({
  title,
  Icon,
  onClick,
  SubItems,
  setCurrentMenu,
  CurrentMenu,
  Active,
  Link,
}) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const navigate = useNavigate();
  const location = useLocation();

  // Access pathname from location object
  const { pathname } = location;

  useEffect(() => {
    if (SubItems) {
      SubItems.map((data) => {
        if (data.Link === pathname) {
          setCurrentMenu(title);
        }
      });
    } else {
      if (Link === pathname) setCurrentMenu(title);
    }
  }, []);

  return (
    <StyledWrapperItem className="flex flex-col items-center">
      <motion.div
        className="flex flex-col w-[250px] mt-4"
        variants={container}
        initial="hidden"
        animate="visible"
        onClick={() => {
          if (title === "Logout") {
            // showSuccessAlert("Logout Successfully", "");
            onClick();
          }
        }}
      >
        <motion.div
          variants={item}
          className={`select-none flex w-full justify-between items-center py-3 ${
            CurrentMenu === title || Active
              ? "text-white bg-main"
              : "text-black"
          } px-5 rounded-lg transition-all ease-in-out duration-700`}
          onClick={() => {
            if (CurrentMenu === title) setCurrentMenu("");
            else setCurrentMenu(title);
            if (!SubItems) navigate(Link);
          }}
        >
          <div className="flex items-center gap-x-3">
            <Icon className="text-2xl" />

            <span className="font-quicksand font-semibold whitespace-nowrap">
              {title}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </StyledWrapperItem>
  );
};

export default SideMenuItem;
