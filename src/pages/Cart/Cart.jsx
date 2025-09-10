import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/Slices/CartSlice";
import { ChangeCartItemQtyApi, RemoveItemFromCartApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
const user = JSON.parse(localStorage.getItem("user"));
const shippingFee =
  Number(user?.role) === 1
    ? Number(user?.shipping)
    : Number(user?.role) === 2
    ? Number(localStorage.getItem("shipping"))
    : 999;

const Cart = () => {
  const navigate = useNavigate();
  const [localCartItems, setLocalCartItems] = useState([]);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const debounceRefs = useRef({});

  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 7));

  const formattedDate = futureDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const CartState = useSelector((state) => state.CartState);
  const dispatch = useDispatch();

  // Check the cart when the component mounts
  const checkCart = async () => {
    await dispatch(fetchCart(user?.cust_id?._id));
  };

  useEffect(() => {
    checkCart();

    // Cleanup function to clear pending debounced calls
    return () => {
      Object.values(debounceRefs.current).forEach((timeoutId) => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    };
  }, [dispatch]);

  // Initialize local cart items when cart data changes
  useEffect(() => {
    if (CartState.data?.items) {
      setLocalCartItems([...CartState.data.items]);
    }
  }, [CartState.data?.items]);

  // Debounced API call function
  const debouncedUpdateQty = useCallback(
    (itemId, qty) => {
      // Clear existing timeout for this item
      if (debounceRefs.current[itemId]) {
        clearTimeout(debounceRefs.current[itemId]);
      }

      // Set new timeout
      debounceRefs.current[itemId] = setTimeout(async () => {
        try {
          setUpdatingItems((prev) => new Set(prev).add(itemId));

          const response = await ChangeCartItemQtyApi(CartState.data._id, {
            itemId,
            qty,
            type: 3,
          });

          if (response.data.success) {
            // Update local state with server response if needed
            dispatch(fetchCart(user?.cust_id?._id));
          } else {
            // Rollback on error
            ErrorToast(response.data.error.msg);
            dispatch(fetchCart(user?.cust_id?._id));
          }
        } catch (err) {
          // Rollback on error
          ErrorToast(
            err?.response?.data?.message || "Failed to update quantity"
          );
          dispatch(fetchCart(user?.cust_id?._id));
        } finally {
          setUpdatingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(itemId);
            return newSet;
          });
        }
      }, 500); // 500ms delay
    },
    [CartState?.data?._id, dispatch]
  );

  // Optimistic update function
  const updateQtyOptimistically = (itemId, newQty) => {
    if (newQty < 1) return;

    setLocalCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, qty: newQty } : item
      )
    );

    // Trigger debounced API call
    debouncedUpdateQty(itemId, newQty);
  };

  // Handle quantity input change
  const handleQtyInputChange = (itemId, value) => {
    const newQty = Math.max(1, parseInt(value) || 1);
    updateQtyOptimistically(itemId, newQty);
  };

  // Handle increment/decrement
  const handleQtyChange = (itemId, currentQty, change) => {
    const newQty = Math.max(1, currentQty + change);
    updateQtyOptimistically(itemId, newQty);
  };

  // Calculate totals from local state
  const calculateTotals = () => {
    if (!localCartItems.length) return { amount: 0, total: 0 };

    const amount = localCartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    return { amount: amount.toFixed(2), total: amount.toFixed(2) };
  };

  const { amount, total } = calculateTotals();

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="flex mt-[125px] flex-col gap-y-3 pt-3 w-[70%] max1050:w-[80%] max400:w-[90%]"
        id="cart"
      >
        {localCartItems && localCartItems.length !== 0 && (
          <h1 className="text-2xl font-bold py-2 font-roboto">Cart</h1>
        )}
        {localCartItems && localCartItems.length !== 0 ? (
          <div className="flex gap-x-10 justify-between items-start w-full max1050:flex-col border-2 border-sec rounded-xl p-4">
            {/* cart items */}
            <div className="flex flex-col gap-y-2 flex-1 w-full">
              {localCartItems.map((item) => (
                <div
                  className="flex w-full gap-x-2 border-2 border-main rounded-l-xl overflow-hidden overflow-x-auto max570:flex-col"
                  key={item.id}
                >
                  <img
                    src={item.image || "/Headphone.svg"}
                    alt=""
                    className="w-[10rem] h-[10rem] max570:w-full max570:h-[8rem] border-r-2 border-r-main object-cover"
                  />
                  <div className="flex justify-between items-center border-b py-4 w-full px-3">
                    <div className="flex flex-col justify-between w-full gap-y-1">
                      <h2 className="font-semibold font-roboto max480:text-[.8rem]">
                        {item.name}
                      </h2>
                      <div className="flex w-full justify-between items-center">
                        <div className="font-roboto flex gap-x-2">
                          <div className="">{item.color}</div>
                        </div>
                        <span className="font-roboto whitespace-nowrap">
                          PKR {(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center py-2 max570 :justify-center">
                        <div className="border-main border-2 text-white flex items-center justify-center p-[1px] rounded-[5px]">
                          <button
                            className="w-8 h-8 disabled:opacity-50 text-2xl bg-main rounded-[5px]"
                            disabled={updatingItems.has(item._id)}
                            onClick={() =>
                              handleQtyChange(item._id, item.qty, -1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            min="1"
                            disabled={updatingItems.has(item._id)}
                            className="w-14 border text-center text-main disabled:opacity-50 disabled:bg-[#96adc557] font-quicksand font-bold outline-none border-none font-main text-xl"
                            onChange={(e) =>
                              handleQtyInputChange(item._id, e.target.value)
                            }
                          />
                          <button
                            className="w-8 h-8 disabled:opacity-50 text-2xl bg-main rounded-[5px]"
                            disabled={updatingItems.has(item._id)}
                            onClick={() =>
                              handleQtyChange(item._id, item.qty, 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="text-red-500 ml-4 font-roboto disabled:opacity-50"
                          disabled={updatingItems.has(item._id)}
                          onClick={() => {
                            RemoveItemFromCartApi(CartState.data._id, {
                              itemId: item._id,
                            }).then((res) => {
                              if (res.data.success) {
                                SuccessToast(res.data.data.msg);
                                dispatch(fetchCart(user?.cust_id?._id));
                              } else {
                                ErrorToast(res.data.error.msg);
                              }
                            });
                          }}
                        >
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
                  <div className="">Rs {amount}</div>
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
                    PKR {total + Number(localStorage.getItem("shipping"))}
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
    </div>
  );
};

export default Cart;
