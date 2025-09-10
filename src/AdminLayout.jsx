import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SideMenu from "./components/SideMenu/SideMenu";
import MainLoader from "./components/Loaders/MainLoader";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  let isMount = false;
  useEffect(() => {
    if (!isMount) {
      setInterval(() => {
        isMount = true;
        setLoading(false);
      }, 1000);
    }
  }, []);

  return loading ? (
    // <Loader />
    <div className="w-full h-screen flex items-center justify-center">
      <MainLoader />
    </div>
  ) : (
    <div className="w-[100vw] flex bg-[#fafafb] h-screen overflow-hidden max850:flex-col max850:relative">
      {currentPath !== "/login" &&
        currentPath !== "/register" &&
        currentPath !== "/approval" && <SideMenu />}
      <AdminNavbar />

      <div className="h-screen flex-1 flex flex-col px-6 pt-4 overflow-y-auto max-950:pt-[65px] max850:mt-[10vh] scrollable max950:pt-[105px]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
