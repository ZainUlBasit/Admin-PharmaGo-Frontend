import styled from "styled-components";

export const LogoCarouselWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  .carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-image {
    /* max-width: 100%; */
    max-height: 100%;
    margin: 0 auto; /* Center horizontally */
  }
`;

export const CarouselWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100% !important;
  /* height: auto !important; */
  background-color: transparent;
  color: white !important;
`;
export const CarouselWrapperHorizontal = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100% !important;
`;
