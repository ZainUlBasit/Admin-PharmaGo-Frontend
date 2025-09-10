import React, { useState } from "react";
import "./SubCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/Slices/CategorySlice";
import { fetchSubCategories } from "../../store/Slices/SubCategorySlice";

export const categories = [
  { name: "Mouse" },
  { name: "Keyboard" },
  { name: "Speaker" },
  { name: "Cables" },
  { name: "Joystick" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
  { name: "Mouse" },
];

const SubCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const dispatch = useDispatch();
  const SubCatState = useSelector((state) => state.SubCategoryState);

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, []);

  return (
    <div className="bg-white mt-[200px] flex gap-x-3 px-2 py-2 max-w-screen overflow-x-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center mb-2 px-2 py-1 rounded-lg h-full whitespace-nowrap bg-[#fcd9ec]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        >
          <input
            type="checkbox"
            id={category.name}
            checked={selectedCategories.includes(category.name)}
            onChange={() => handleCheckboxChange(category.name)}
            className="mr-0 appearance-none cursor-pointer"
          />
          <label
            htmlFor={category.name}
            className="text-gray-700 px-2 font-roboto"
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
