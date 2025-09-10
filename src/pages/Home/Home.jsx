import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Category from "../../components/Category/Category";
import NewArrivalCarousel from "../../components/Carousels/NewArrivalCarousel";
import MobileCategory from "../../components/Category/MobileCategory";
import ProductCarouselWrapper from "./ProductCarouselWrapper";
import SubCategory from "../../components/Category/SubCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/Slices/ProductSlice";
import ProductCard from "../../components/Cards/ProductCard";

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.ProductState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // testing

  return (
    <div className="flex mt-[145px] max-w-screen max718:flex-col px-10 max718:px-0">
      <Category
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {/* <SubCategory /> */}
      <div className="flex flex-col overflow-auto  w-screen">
        <MobileCategory
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <div className="grid grid-cols-4 max1400:grid-cols-3 max1200:grid-cols-2 max718:grid-cols-2 max718:px-4 gap-10 place-items-center">
          {ProductState.data &&
            ProductState.data
              .filter((dt) => {
                return (
                  selectedCategories.includes(dt.cat_id._id) ||
                  selectedCategories.length === 0
                );
              })
              .map((product, index) => (
                <div className="w-full max-w-[300px]">
                  <ProductCard key={index} product={product} />
                </div>
              ))}

          {/* {selectedCategories.length > 0 && <SubCategory />}
        <ProductCarouselWrapper title="New Arrival" />
        <ProductCarouselWrapper title="Offers/Deals" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
