import React from "react";

const HeaderTitle = ({ title, description }) => {
  return (
    <div className="mb-6 min-w-[250px]">
      <h1 className="text-3xl font-bold text-main">{title}</h1>
      <p className="pl-1 text-sm text-sec">{description}</p>
    </div>
  );
};

export default HeaderTitle;
