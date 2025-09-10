import React from "react";

const SearchWrapper = ({ children }) => {
  return (
    <div className="flex justify-between items-center px-2 text-white font-[Quicksand] absolute -top-9 left-[-1px] w-[calc(100%+2px)] bg-main rounded-t-md border-[1px] border-[#b6953a] border-x-2 border-t-2">
      {children}
    </div>
  );
};

export default SearchWrapper;
