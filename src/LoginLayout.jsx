import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MainLoader from "./components/Loaders/MainLoader";

const LoginLayout = () => {
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
      {/* Loading */}
      <MainLoader />
    </div>
  ) : (
    <div className="w-[100vw] overflow-hidden">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
