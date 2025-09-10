import React from "react";
import "./SearchBox.css";
import { FiSearch } from "react-icons/fi";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <div class="input-wrapper">
      <button class="icon">
        <FiSearch className="text-[1.3rem] icon-item" />
      </button>
      <input
        className="input outline-none w-full font-[Quicksand]"
        placeholder={placeholder}
        name="text"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
