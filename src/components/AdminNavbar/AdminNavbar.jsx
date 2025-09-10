import React, { useState, useEffect } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa"; // Importing icons from react-icons
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { MdCategory } from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
// import { sideMenuItems } from "../SIdeMenu/AdminSideMenu";

const userData = JSON.parse(localStorage.getItem("user")) || {};
const { role } = userData;

const sideMenuItems = [
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

const AdminNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPathname, setCurrentPathname] = useState(""); // State to store current pathname
  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  useEffect(() => {
    setCurrentPathname(location.pathname); // Set current pathname on mount
  }, [location]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("branch");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const handleNavigation = (link) => {
    navigate(link);
    setIsDrawerOpen(false);
  };

  const currentItem = sideMenuItems.find((dt) => dt.link === currentPathname);
  const heading = currentItem ? currentItem.title : "Menu"; // Fallback to "Menu" if not found

  return (
    <div className="hidden max950:flex absolute left-0 top-0 w-full p-4">
      <div className="bg-main rounded-full w-full flex justify-between items-center p-4 px-6">
        <IconButton
          onClick={toggleDrawer(true)}
          className="!text-white hover:bg-mainHover"
        >
          <FaBars className="text-2xl" /> {/* Hamburger menu icon */}
        </IconButton>
        <div className="font-bold text-white text-2xl">{heading}</div>
        <IconButton
          onClick={handleLogout}
          className="!text-white hover:bg-mainHover"
        >
          <FaSignOutAlt className="text-2xl" /> {/* Logout icon */}
        </IconButton>
      </div>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "#96ADC5",
            color: "white",
          },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">
              <div className="flex items-center bg-sec">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-14  mr-2 cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                /> 
                <div className="text-[2rem] font-bold text-main font-inter">Pharma Go</div>
              </div>
            </h2>
          </div>
          <List className="flex-1 bg-main">
            {sideMenuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleNavigation(item.Link)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  padding: "12px 16px",
                  cursor: "pointer",
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                  <item.Icon className="text-2xl" />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    },
                    color: "white",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminNavbar;
