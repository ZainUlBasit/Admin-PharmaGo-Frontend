import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderNavs = () => {
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);

    setCurrentPath(location.pathname);
  }, []);

  return (
    <nav className="flex items-center space-x-2 text-gray-500 font-roboto select-none max365:text-[.8rem]">
      <span
        className={
          currentPath === "/checkout/select-address" && "text-black font-bold"
        }
      >
        Address
      </span>
      <span>&gt;</span>
      <span
        className={
          currentPath === "/checkout/select-shipping" && "text-black font-bold"
        }
      >
        Shipping
      </span>
      <span>&gt;</span>
      <span
        className={
          currentPath === "/checkout/place-order" && "text-black font-bold"
        }
      >
        Place Order
      </span>
    </nav>
  );
};

export default OrderNavs;
