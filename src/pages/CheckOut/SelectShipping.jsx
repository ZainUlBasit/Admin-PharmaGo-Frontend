import React, { useEffect, useState } from "react";
import AddressSelector from "../../components/Select/AddressSelector";
import { FaPlus } from "react-icons/fa";
import AddAddressModal from "../../components/Modals/AddAddressModal";
import { useNavigate } from "react-router-dom";
import ShippingSelector from "../../components/Select/ShippingSelector";
import OrderNavs from "../../components/OrderNav/OrderNavs";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/Slices/CartSlice";
import { AddShippingToOrderApi } from "../../ApiRequests";
const user = JSON.parse(localStorage.getItem("user"));

const SelectShipping = () => {
  const navigate = useNavigate();

  const [SelectedShipping, setSelectedShipping] = useState("");

  const items = [
    {
      id: 1,
      name: "Skullcandy - Crusher anc 2 wireless headphones",
      color: "Black",
      price: 299.99,
    },
    {
      id: 2,
      name: "APPLE AirPods Pro MagSafe Case",
      color: "White",
      price: 399.99,
    },
    { id: 3, name: "RODE PodMic", color: "Black", price: 199.99 },
  ];

  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

  const formattedDate = futureDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const CartState = useSelector((state) => state.CartState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart(user?.cust_id?._id));
    setSelectedShipping(CartState.data?.shipping);
  }, []);

  const totalAmount = items.reduce((total, item) => total + item.price, 0);
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="flex mt-[125px] flex-col gap-y-3 pt-3 w-[70%] max990:w-[80%] max400:w-[90%]"
        id="cart"
      >
        <OrderNavs />
        <div className="flex gap-x-10 justify-between items-start w-full flex-wrap">
          <div className="flex flex-col gap-y-2 flex-1 max820:w-full">
            <ShippingSelector
              SelectedShipping={SelectedShipping}
              setSelectedShipping={setSelectedShipping}
              ShippingOptions={[
                "Asia Cargo",
                "Tm Cargo",
                "TCS",
                "M&P",
                "Other",
              ]}
            />
          </div>
          <div className="border-[1px] flex flex-col gap-y-2 shadow-lg p-8 max365:p-4 max-w-[400px] min-w-[280px] max1050:max-w-full max1050:w-full">
            <h2 className="font-bold mb-4 mt-1 font-roboto">Order Summary</h2>
            <div className="flex flex-col gap-y-4 font-roboto text-[.9rem]">
              <div className="flex justify-between gap-x-8">
                <div className="">Amount</div>
                <div className="">
                  Rs{" "}
                  {CartState.data &&
                  Array.isArray(CartState.data.items) &&
                  CartState.data.items.length !== 0
                    ? CartState.data.items
                        .reduce(
                          (total, item) => total + item.price * item.qty,
                          0
                        )
                        .toFixed(2)
                    : 0}
                </div>
              </div>
              <div className="flex justify-between gap-x-8">
                <div className="">Shipping</div>
                <div className="">
                  {Number(localStorage.getItem("shipping")) === 0
                    ? "Free"
                    : `${Number(localStorage.getItem("shipping"))} PKR`}
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-y-4 font-roboto text-[.9rem]">
              <div className="flex justify-between gap-x-8">
                <span>Total Amount</span>
                <span>
                  PKR{" "}
                  {CartState.data &&
                  Array.isArray(CartState.data.items) &&
                  CartState.data.items.length !== 0
                    ? CartState.data.items
                        .reduce(
                          (total, item) => total + item.price * item.qty,
                          0
                        )
                        .toFixed(2) + Number(localStorage.getItem("shipping"))
                    : 0}
                </span>
              </div>
              <div className="flex justify-between gap-x-8">
                <span>Estimated Delivery by</span>
                <span>{formattedDate}</span>
              </div>
            </div>
            <button
              className="mt-4 bg-[#ffde59] hover:bg-pink-600 hover:rounded-[.3rem] transition-all ease-in-out duration-700 text-white py-2 px-4 font-roboto text-[.9rem]"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await AddShippingToOrderApi(
                    CartState.data._id,
                    {
                      shipping: SelectedShipping,
                      shipping_fee: Number(localStorage.getItem("shipping")),
                    }
                  );
                  if (response.data.success) {
                    SuccessToast(response.data.data.msg);
                    // Update cart data after successful shipping addition
                    dispatch(fetchCart(user?.cust_id?._id));
                    navigate("/checkout/place-order");
                  } else {
                    ErrorToast(response.data.error.msg);
                  }
                } catch (err) {
                  ErrorToast(err?.response?.data?.message);
                  console.log("err", err);
                }
              }}
            >
              Complete and Save Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectShipping;
