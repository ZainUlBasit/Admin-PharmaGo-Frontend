import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { CarouselWrapper } from "./CarouselWrapper";
import styled from "styled-components";
import ProductCard from "../Cards/ProductCard";

const StyledTitleText = styled.div.attrs({
  className:
    "font-[600] text-[1.3em] text-black font-montserrat text-left w-full pt-4 px-2",
})`
  text-shadow: #e82790 1px 0 2px;
  @media screen and (max-width: 780px) {
    margin-top: 10px;
    font-size: 2rem; /* 14px */
  }
  @media screen and (max-width: 580px) {
    margin-top: 10px;
    font-size: 1.8rem; /* 14px */
  }
  @media screen and (max-width: 480px) {
    margin-top: 10px;
    font-size: 1.5rem; /* 14px */
  }
`;

const NewArrivalCarousel = ({ title }) => {
  // console.log(title);

  const products = [
    {
      title: "Skullcandy - Crusher anc 2 wireless headphones",
      price: 299.99,
      image: "/Headphone.svg",
      isNew: true,
    },
    {
      title: "Logitech - G Pro Wireless Gaming Mouse",
      price: 199.99,
      image: "/Headphone.svg",
      isNew: false,
    },
    {
      title: "Razer - BlackWidow V3 Mechanical Gaming Keyboard",
      price: 149.99,
      image: "/Headphone.svg",
      isNew: true,
    },
    {
      title: "Samsung - Galaxy Buds Pro",
      price: 249.99,
      image: "/Headphone.svg",
      isNew: false,
    },
    {
      title: "Anker - PowerCore 10000mAh Portable Charger",
      price: 39.99,
      image: "/Headphone.svg",
      isNew: true,
    },
  ];

  // Define custom arrow components with react-icons
  const PrevArrow = (props) => (
    <div {...props} className="slick-prev">
      <FiChevronLeft size={30} color="black" className="!-m-5 !-mx-2" />
    </div>
  );

  const NextArrow = (props) => (
    <div {...props} className="slick-next">
      <FiChevronRight size={30} color="black" className="!-m-5 !-mx-3 !" />
    </div>
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CarouselWrapper className="gap-y-3 flex flex-col !w-full">
      <StyledTitleText>{title}</StyledTitleText>
      <div className="w-[100%] flex-1 max718:px-3 max540:!w-[350px]">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={windowWidth < 500 ? 1 : 4}
          slidesToScroll={1}
          autoplay={true}
          draggable={true}
          centerMode={windowWidth < 500 ? false : false}
          centerPadding={windowWidth < 400 ? "0%" : "0%"}
          arrows={false}
          responsive={[
            { breakpoint: 540, settings: { slidesToShow: 1 } },
            { breakpoint: 718, settings: { slidesToShow: 2 } },
            { breakpoint: 1060, settings: { slidesToShow: 2 } },
            { breakpoint: 1300, settings: { slidesToShow: 3 } },
          ]}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Slider>
      </div>
    </CarouselWrapper>
  );
};

export default NewArrivalCarousel;
