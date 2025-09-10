import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/Slices/CartSlice";
import { ChangeCartItemQtyApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
const user = JSON.parse(localStorage.getItem("user"));

const LikedItems = () => {
  const navigate = useNavigate();

  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

  const formattedDate = futureDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let totalAmount = 0;

  const CartState = useSelector((state) => state.CartState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart(user?.cust_id?._id));
  }, []);
  useEffect(() => {
    if (CartState.data) {
      console.log(CartState.data?.items);
      // totalAmount =
      //   CartState.data?.items.reduce((total, item) => total + item.price, 0) ||
      //   0;
    }
  }, [CartState.data]);

  const dec_qty = async (itemId) => {
    try {
      //   const { name, cat_id, subcat_id, desc, images, video, cost, price, colors } =
      const response = await ChangeCartItemQtyApi(CartState.data._id, {
        itemId,
        qty: 1,
        type: 2,
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        dispatch(fetchCart(user?.cust_id?._id));
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("err", err);
    }
  };
  const inc_qty = async (itemId) => {
    try {
      //   const { name, cat_id, subcat_id, desc, images, video, cost, price, colors } =
      const response = await ChangeCartItemQtyApi(CartState.data._id, {
        itemId,
        qty: 1,
        type: 1,
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        dispatch(fetchCart(user?.cust_id?._id));
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("err", err);
    }
  };

  return (
    <div
      className="flex mt-[125px] flex-col gap-y-3 pt-3 w-[70%] max1050:w-[80%] max400:w-[90%]"
      id="cart"
    >
      {CartState.data && CartState.data?.items?.length !== 0 && (
        <h1 className="text-2xl font-bold py-2 font-roboto">Cart</h1>
      )}
      {CartState.data && CartState.data?.items?.length !== 0 ? (
        <div className="flex gap-x-10 justify-between items-start w-full max1050:flex-col">
          {/* cart items */}
          <div className="flex flex-col gap-y-2 flex-1 w-full">
            {CartState.data &&
              CartState.data?.items?.map((item) => (
                <div className="flex w-full gap-x-2" key={item.id}>
                  <img
                    src="/Headphone.svg"
                    alt=""
                    className="w-[7rem] h-[10rem]"
                  />
                  <div className="flex justify-between items-center border-b py-4 w-full px-3">
                    <div className="flex flex-col justify-between w-full gap-y-1">
                      <h2 className="font-semibold font-roboto">{item.name}</h2>
                      <div className="flex w-full justify-between items-center">
                        <div className="font-roboto flex gap-x-2">
                          <div className="text-[#A2A3B1] font-roboto">
                            Color:
                          </div>
                          <div className="">{item.color}</div>
                        </div>
                        <span className="font-roboto whitespace-nowrap">
                          PKR {(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center py-2">
                        <div className="flex items-center justify-between border text-xl gap-x-2 px-2 py-1 w-[100px]">
                          <button
                            className=""
                            onClick={() => {
                              dec_qty(item._id);
                            }}
                          >
                            -
                          </button>
                          <span className="text-[.8rem]">{item.qty}</span>
                          <button
                            className=""
                            onClick={() => {
                              inc_qty(item._id);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button className="text-red-500 ml-4 font-roboto">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Order Summary */}
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
                <div className="">Discount</div>
                <div className="">Rs 0</div>
              </div>
              <div className="flex justify-between gap-x-8">
                <div className="">Shipping</div>
                <div className="">Free</div>
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
                        .toFixed(2)
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
              onClick={() => {
                navigate("/checkout/select-address");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-10">
          <div className="flex flex-col items-center relative gap-y-3 w-fit">
            <img src="/empty-cart.jpg" className="max-h-[400px] w-fit" />
            <div className="absolute -top-2 right-0 bg-main p-2 text-white rounded-full w-10 h-10 flex justify-center items-center border-4 font-roboto border-black max420:w-7 max420:h-7 max480:-top-1 max365:-top-2 max365:-right-2">
              0
            </div>
            <div className="w-full text-center text-4xl font-bold text-main">
              Your Cart is Empty!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedItems;
