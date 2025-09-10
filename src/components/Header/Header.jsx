import React from "react";
import HeaderTitle from "./HeaderTitle";

const Header = ({ title, desc, children }) => {
  return (
    <div className="flex justify-between items-center flex-wrap font-quicksand px-3 pt-4">
      <HeaderTitle title={title} description={desc} />
      <div className="flex items-center justify-center gap-x-2">{children}</div>
    </div>
  );
};

export default Header;
