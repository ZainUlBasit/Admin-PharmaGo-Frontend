import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MainLoader from "./components/Loaders/MainLoader";
import { IoLogoWhatsapp } from "react-icons/io";
import { GetMyProfileApi } from "./ApiRequests";

const Layout = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      const adminResponse = await GetMyProfileApi();
      localStorage.setItem(
        "shipping",
        JSON.stringify(adminResponse.data.data.payload.shipping)
      );
    };
    fetchData();
    // Listen for 'storage' events (changes from other tabs/windows)
    window.addEventListener("storage", fetchData);
    window.addEventListener("userUpdatedInLocalStorage", fetchData);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storage", fetchData);
      window.removeEventListener("userUpdatedInLocalStorage", fetchData);
    };
  }, []);

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center">
      <MainLoader />
    </div>
  ) : (
    <div className="w-[100vw] overflow-hidden relative h-screen overflow-y-auto">
      <div
        className="fixed bottom-5 right-5 z-50 flex justify-center items-center"
        id="whatsappicon"
      >
        <a
          href="https://wa.me/+923159166758"
          className="hover:underline flex items-center gap-2"
        >
          <IoLogoWhatsapp className="text-7xl transform scale-90 transition-transform hover:scale-100 text-[#3fb62e] cursor-pointer" />
        </a>
      </div>
      {currentPath !== "/login" &&
        currentPath !== "/register" &&
        currentPath !== "/approval" && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
