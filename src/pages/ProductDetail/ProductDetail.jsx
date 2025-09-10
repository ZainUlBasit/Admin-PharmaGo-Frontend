import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "../../store/Slices/ProductSlice";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { AddToCartApi } from "../../ApiRequests";
import PriceBtn from "../../components/Buttons/PriceBtn";

const user = JSON.parse(localStorage.getItem("user"));

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProductState = useSelector((state) => state.ProductState);
  const product = ProductState?.data?.find((product) => product._id === id);
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
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

  const [currentIndex, setcurrentIndex] = useState(0);

  let videoId = ProductState?.data
    ?.find((product) => product._id === id)
    ?.video.split("/")
    .pop()
    .split("=")[0]
    .split("?")[0];

  useEffect(() => {
    if (!ProductState.data || ProductState.data.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, ProductState.data]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center mt-[125px]">
        <FaArrowLeft
          className="text-2xl cursor-pointer mb-4"
          onClick={() => navigate(-1)}
        />
        <p className="text-xl font-bold text-red-500">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-[125px]">
      <div className="max-w-[500px] w-full px-10">
        <FaArrowLeft
          className="text-2xl cursor-pointer"
          id="back-btn"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="flex md:flex-row max990:flex-col-reverse max990:items-center w-full p-4 gap-x-10 justify-between items-start max-w-[1500px]">
          <div className="flex-1 max-w-[500px] p-4">
            <h1 className="text-2xl font-bold text-main">{product.name}</h1>
            <PriceBtn price={product.price} />
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Specifications:</h2>
              <div
                className="text-black w-[100%] p-0 ql-editor flex flex-col items-start whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: product.desc,
                }}
              />
              {/* {product.specifications.map((spec, index) => (
                  <li key={index} className="text-gray-700">
                    {spec}
                  </li>
                ))} */}
            </div>
            <div className="flex justify-between items-center w-[300px] px-1 mt-2 gap-x-2">
              <div className="flex items-center justify-between border border-main rounded-lg px-4 py-2 w-1/2 h-[4.5vh]">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="text-main text-xl"
                >
                  -
                </button>
                <span className="mx-2 font-roboto text-main text-[.9rem]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="text-main text-xl"
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
          </div>
          <div className="w-fit max-w-[817px] min990:w-full">
            <div className="flex flex-col w-full">
              {currentIndex < product.images.length ? (
                <img
                  src={product.images[currentIndex]}
                  alt={product.title}
                  className="min990:min-w-[500px] min990:min-h-[500px] min990:w-[500px] min990:h-[500px] object-center fade-in"
                />
              ) : (
                <div
                  className="min990:min-w-[500px] min990:min-h-[500px]
                  min990:w-[500px] min990:h-[500px] object-center fade-in"
                >
                  <iframe
                    className="w-[100%] h-[100%]"
                    src={`${product.video}?autoplay=1&controls=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="flex gap-x-2 px-2 py-2 overflow-x-auto">
                {product.images &&
                  product.images.map((dt, index) => {
                    return (
                      <img
                        src={dt}
                        alt={product.title}
                        className={`w-20 h-20 object-cover transition-all ease-in-out duration-300 ${
                          currentIndex === index &&
                          "border-[1px] border-gray-500 rounded-lg p-1"
                        }`}
                        onClick={() => {
                          setcurrentIndex(index);
                        }}
                      />
                    );
                  })}

                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube video thumbnail"
                  className={`w-20 h-20 object-cover transition-all ease-in-out duration-300 ${
                    currentIndex === 5 &&
                    "border-[1px] border-gray-500 rounded-lg p-1"
                  }`}
                  onClick={() => {
                    setcurrentIndex(5);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
