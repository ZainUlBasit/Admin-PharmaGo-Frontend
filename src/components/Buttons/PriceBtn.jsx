import React from "react";
import styled from "styled-components";

const PriceBtn = ({ price }) => {
  return (
    <StyledWrapper>
      <button className="button">
        <div className="button-overlay" />
        <span>{price} PKR</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    font-size: 19px;
    border-radius: 12px;
    background: white;
    color: rgb(218, 218, 218);
    border: none;
    padding: 2px;
    font-weight: 800;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .button span {
    border-radius: 10px;
    padding: 0px 10px;
    padding-right: 1.2em;
    text-shadow: 0px 0px 20px white;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s;
    background-image: linear-gradient(
      to right,
      #000000,
      #ffeb3b,
      #333333,
      #ffd700,
      #000000
    );
    -webkit-background-clip: text;
    color: transparent;
    background-size: 300%;
    background-position: -100%;
    animation: animatedText 3s infinite alternate-reverse;
  }

  .button-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;

    filter: opacity(10%) contrast(105%);
    -webkit-filter: opacity(10%) contrast(105%);
  }

  @keyframes animatedText {
    to {
      background-position: 100%;
    }
  }
`;

export default PriceBtn;
