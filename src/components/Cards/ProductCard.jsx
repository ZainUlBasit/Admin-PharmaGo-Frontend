import React, { useState, useCallback, useRef } from "react";
import NavigateToScreen from "../../utils/NavigateToScreen";
import { useNavigate } from "react-router-dom";
import { AddToCartApi } from "../../ApiRequests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import ProductImageCard from "./ProductImageCard";
import PriceBtn from "../Buttons/PriceBtn";
const user = JSON.parse(localStorage.getItem("user"));

const ProductCard = ({ product }) => {
  console.log(product.name);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const navigate = useNavigate();

  // Debounced quantity update function
  const debouncedQuantityUpdate = useCallback((newQuantity) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setQuantity(Math.max(1, newQuantity));
    }, 300);
  }, []);

  // Optimistic quantity update
  const updateQuantityOptimistically = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    debouncedQuantityUpdate(newQuantity);
  };

  // Handle quantity input change
  const handleQuantityInputChange = (value) => {
    const newQty = Math.max(1, parseInt(value) || 1);
    updateQuantityOptimistically(newQty);
  };

  // Handle increment/decrement
  const handleQuantityChange = (change) => {
    const newQty = Math.max(1, quantity + change);
    updateQuantityOptimistically(newQty);
  };

  const onSubmit = async (e) => {
    console.log(product);

    e.preventDefault();
    setLoading(true);

    const BodyData = {
      customer: user?.cust_id?._id,
      item: product,
      qty: quantity,
      price: product.price,
      cost: product.cost,
    };
    console.log(BodyData);

    try {
      const response = await AddToCartApi(BodyData);
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
      } else {
        ErrorToast(response.data.error.msg);
      }
    } catch (error) {
      if (error.response?.data?.error?.msg === "Item already in cart.") {
        ErrorToast(error.response.data.error.msg);
      } else {
        ErrorToast("Failed to add item to cart");
      }
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start w-full justify-start max300:min-w-[200px] max300:w-[200px] mb-4">
      <div className="relative w-full h-fit">
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-main text-white text-xs rounded px-2 py-1">
            NEW
          </span>
        )}
        <div className="flex relative">
          <div className="w-full h-[260px] max570:h-[220px] object-cover overflow-hidden max1200:h-[280px] rounded-xl">
            <ProductImageCard product={product} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-1 mt-2 gap-x-2 max570:flex-col max570:gap-y-1">
        <div className="flex items-center justify-between border border-main rounded-lg px-4 py-2 w-1/2 h-[4.5vh] max570:w-full">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={loading}
            className="text-main text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            disabled={loading}
            className="mx-2 font-quicksand text-main text-[1.1rem] font-bold w-12 text-center border-none outline-none disabled:opacity-50 disabled:bg-transparent"
            onChange={(e) => handleQuantityInputChange(e.target.value)}
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={loading}
            className="text-main text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        <button
          className="bg-[#ffde59] hover:bg-[#ffde59]/80 transition-all ease-in-out duration-300 cursor-pointer text-black rounded-lg text-[.9rem] h-[4.5vh] w-1/2 max570:w-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to cart"}
        </button>
      </div>
      <div className="mt-2 px-2 flex justify-start flex-col items-start w-full">
        <h3 className="text-[.85rem] font-semibold text-[#7A645B] font-roboto w-full text-left overflow-hidden text-ellipsis line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-end w-full">
          <PriceBtn price={product.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
