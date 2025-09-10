import React from "react";
import styled from "styled-components";

const ShippingSelector = ({
  SelectedShipping,
  setSelectedShipping,
  ShippingOptions = [],
}) => {
  const handleAddressChange = (address) => {
    setSelectedShipping(address); // Set the selected address
  };
  return (
    <StyledWrapper>
      <div className="radio-button-container">
        {(Array.isArray(ShippingOptions) ? ShippingOptions : []).map(
          (adr, index) => (
            <div className="radio-button" key={index}>
              <input
                type="radio"
                className="radio-button__input"
                id={`radio${index}`}
                name="radio-group"
                value={adr}
                checked={SelectedShipping === adr} // Check if this address is selected
                onChange={() => handleAddressChange(adr)} // Update selected address
              />
              <label className="radio-button__label" htmlFor={`radio${index}`}>
                <span className="radio-button__custom" />
                <div className="font-[500] font-roboto text-[1rem]">{adr}</div>
              </label>
            </div>
          )
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-button-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px 0px;
    width: 100%;
  }

  .radio-button {
    display: inline-block;
    position: relative;
    cursor: pointer;
    border: 2px solid #d1d1d8;
    border-bottom: 0px solid #d1d1d8;
    &:last-child {
      border-bottom: 2px solid #d1d1d8;
    }
    width: 100%;
    padding: 10px 12px;
  }

  .radio-button__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .radio-button__label {
    display: inline-block;
    padding-left: 30px;
    position: relative;
    font-size: 15px;
    color: #000000;
    font-weight: 600;
    cursor: pointer;
    text-transform: capitalize;
    transition: all 0.3s ease;
  }

  .radio-button__custom {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #a2a3b1;
    transition: all 0.3s ease;
  }

  .radio-button__input:checked + .radio-button__label .radio-button__custom {
    background-color: #e82890;
    border-color: transparent;
    transform: scale(0.8);
    box-shadow: 0 0 20px #4c8bf580;
  }

  .radio-button__input:checked + .radio-button__label {
    color: #e82890;
  }

  .radio-button__label:hover .radio-button__custom {
    transform: scale(1.2);
    border-color: #e82890;
    box-shadow: 0 0 20px #4c8bf580;
  }
`;

export default ShippingSelector;
