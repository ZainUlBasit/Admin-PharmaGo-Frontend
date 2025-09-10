import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProductImageCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <StyledWrapper
      productStatus={product.status}
      onClick={() => {
        navigate("/product-detail/" + product._id);
      }}
    >
      <div className="container">
        <div className="card_box">
          <img
            src={product.images[0]}
            alt=""
            className="w-full h-[260px] max570:h-[220px] object-cover overflow-hidden max1200:h-[280px] rounded-xl"
          />
          <span />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card_box {
    width: 100%;
    height: 250px;
    border-radius: 20px;
    border-width: 2px;
    background: linear-gradient(
      170deg,
      rgba(58, 56, 56, 0.623) 0%,
      rgb(31, 31, 31) 100%
    );
    position: relative;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.55);
    cursor: pointer;
    transition: all 0.3s;
  }

  .card_box span {
    position: absolute;
    overflow: hidden;
    width: 150px;
    height: 150px;
    top: -10px;
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 605px) {
    .card_box span {
      width: 110px;
      height: 110px;
    }
    .card_box span::before {
      font-size: 0.7rem;
    }
  }

  .card_box span::before {
    content: ${({ productStatus }) => {
      if (productStatus === 1) return '"In Stock"';
      if (productStatus === 2) return '"No Stock"';
      return '"Out of Stock"'; // Default for status 0 or any other
    }};
    position: absolute;
    width: 150%;
    height: 40px;
    background-image: ${({ productStatus }) => {
      if (productStatus === 1)
        return "linear-gradient(45deg, #4CAF50 0%, #8BC34A 51%, #4CAF50 100%)"; /* Green */
      if (productStatus === 2)
        return "linear-gradient(45deg, #F44336 0%, #FF5722 51%, #F44336 100%)"; /* Red */
      return "linear-gradient(45deg, #757575 0%, #9E9E9E 51%, #757575 100%)"; /* Grey for Out of Stock */
    }};
    transform: rotate(-45deg) translateY(-20px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
  }

  .card_box span::after {
    content: "";
    position: absolute;
    width: 10px;
    bottom: 0;
    left: 0;
    height: 10px;
    z-index: -1;
    box-shadow: ${({ productStatus }) => {
      if (productStatus === 1) return "140px -140px #388E3C"; /* Darker Green */
      if (productStatus === 2) return "140px -140px #D32F2F"; /* Darker Red */
      return "140px -140px #616161"; /* Darker Grey */
    }};
    background-image: ${({ productStatus }) => {
      if (productStatus === 1)
        return "linear-gradient(45deg, #4CAF50 0%, #8BC34A 51%, #4CAF50 100%)"; /* Green */
      if (productStatus === 2)
        return "linear-gradient(45deg, #F44336 0%, #FF5722 51%, #F44336 100%)"; /* Red */
      return "linear-gradient(45deg, #757575 0%, #9E9E9E 51%, #757575 100%)"; /* Grey */
    }};
  }
`;

export default ProductImageCard;
