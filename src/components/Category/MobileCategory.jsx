import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/Slices/CategorySlice";

export const categories = [
  { name: "Mouse", count: 10 },
  { name: "Keyboard", count: 15 },
  { name: "Speaker", count: 20 },
  { name: "Cables", count: 5 },
  { name: "Joystick", count: 17 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
  { name: "Mouse", count: 8 },
];

const MobileCategory = ({ selectedCategories, setSelectedCategories }) => {
  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.CategoryState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-white mt-1 gap-x-3 px-2 max-w-screen overflow-x-auto h-fit py-2 hidden max718:flex">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex items-center mb-2 px-2 py-1 rounded-lg h-full whitespace-nowrap ${
            selectedCategories.includes(category._id) && "bg-main !text-white"
          }`}
          style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        >
          <input
            type="checkbox"
            id={category.name}
            checked={selectedCategories.includes(category._id)}
            onChange={() => handleCheckboxChange(category._id)}
            className="mr-2 appearance-none cursor-pointer"
          />
          <label
            htmlFor={category.name}
            className={`text-gray-700
          ${
            selectedCategories.includes(category._id) && "bg-main !text-white"
          }`}
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MobileCategory;
