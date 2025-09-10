import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderNavs from "../../components/OrderNav/OrderNavs";

const PlaceOrder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Navigate to home page after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex mt-[125px] flex-col gap-y-3 pt-3 w-[70%]" id="cart">
        <OrderNavs />
        <div className="flex gap-x-10 justify-center items-center w-full">
          <div className="flex flex-col max-w-[400px] max330:w-full items-center justify-center gap-y-2 w-full">
            <img src="/PlaceOrder.svg" className="max-w-[400px] w-full" />
            <div className="max-w-[400px] flex-wrap text-[#444444] flex flex-col gap-y-3">
              <div className="font-bold text-[2rem] font-roboto max-w-[400px] flex-wrap text-center max600:text-[1.5rem] max420:text-[1.2rem] max330:text-[.9rem] max330:w-full">
                Order Placed Successfully!
              </div>
              <div className="font-thin text-[1rem] font-roboto max-w-[400px] flex-wrap text-center px-4 max330:px-1 max600:text-[.8rem] max420:text-[.7rem]">
                Thankyou for placing order, It will be shipped to you in few
                days.
              </div>
              <hr className="w-full" />
              <div className="font-thin w-full flex justify-center items-center text-[1rem] font-roboto max-w-[400px] flex-wrap max600:text-[.8rem] max420:text-[.7rem]">
                Stay Happy, Keep placing Orders!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
