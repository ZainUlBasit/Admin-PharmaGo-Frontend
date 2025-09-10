import React from "react";

const Approval = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 relative max800:bg-[#F1D9E2] max800:justify-center max800:items-center">
      <div
        className="flex flex-col items-start justify-center w-1/2 max-w-[500px] max800:w-[90%] p-8 px-12 max600:px-3 bg-transparent shadow-lg max800:shadow-none z-10"
        id="left-side"
      >
        <h1 className="text-3xl font-bold mb-4">Account Pending Approval</h1>
        <p className="text-gray-600 mb-6">
          <div className="">Thank you for signing up!</div>
          <div className="">Your account will be approved in 24 hours.</div>
        </p>
        <div className="h-[.10rem] w-[90%] bg-gray-400 mb-6"></div>
        <p className="text-gray-600 mb-6">
          Your account is under review by our team. Once approved, you’ll
          receive a confirmation email, and you can start exploring and shopping
          for the best computer accessories.
        </p>
        <p className="text-gray-600 mb-6">
          If you have any questions, feel free to contact us at (0315-9166758).
        </p>
      </div>
      <div className="flex justify-center items-center flex-1 bg-[#F1D9E2] relative max800:absolute max800:top-1/2 max800:left-1/2 max800:transform max800:-translate-x-1/2 max800:-translate-y-1/2 max800:w-full max800:opacity-20">
        <img
          src="/BgSideImage.svg"
          alt="Background Image"
          className="h-screen bg-cover bg-center object-contain"
        />
      </div>
    </div>
  );
};

export default Approval;
