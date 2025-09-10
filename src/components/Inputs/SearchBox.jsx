import React from "react";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

const SearchBox = () => {
  return (
    <StyledWrapper className=" max800:hidden">
      <div className="group">
        <input placeholder="Search" type="search" className="input" />
        <div className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <BiSearch className="text-main text-xl" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    flex: 1 1 0%;
  }

  .input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-right: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: 0.3s ease;
  }

  .input::placeholder {
    color: #9e9ea7;
  }

  .input:focus,
  input:hover {
    outline: none;
    border-color: #fede59;
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
  }

  .icon {
    position: absolute;
    right: 0rem;
    background-color: #fede59;
    width: 4rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 8px 8px 0px;
  }
`;

export default SearchBox;
