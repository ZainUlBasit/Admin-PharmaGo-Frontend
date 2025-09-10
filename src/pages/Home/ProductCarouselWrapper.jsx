import React from "react";
import NewArrivalCarousel from "../../components/Carousels/NewArrivalCarousel";

const ProductCarouselWrapper = ({ title }) => {
  console.log(title);

  return (
    <div
      className="flex w-full h-fit px-4 items-start justify-center max530:items-center max530:!w-full max780:w-full"
      // className="flex max900:w-[calc(100%-100px)]  max718:flex-1 max780:w-[calc(100%-50px)] max530:items-center max530:!w-full justify-center items-start px-4 w-full h-fit"
    >
      <NewArrivalCarousel title={title} />
    </div>
  );
};

export default ProductCarouselWrapper;
