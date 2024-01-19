import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchBox from "@_components/SearchBox";

export default function Banner() {
  const [isMobile, setisMobile] = useState();

  useEffect(() => {
    const resizingHandler = () => {
      setisMobile(window.innerWidth <= 768);
    };
    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, [isMobile]);

  return (
    <BannerSection>
      <InnerContentBox>
        <Heading>ICON LIBRARY, AVAILABLE FOR FREE</Heading>
      <SearchBox
        width={isMobile ? "100%" : "600px"}
        height="64px"
        fontSize="30px"
      />
      </InnerContentBox>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  padding-top: 54px;
  position: relative;
  text-align: center;
  color: #000;
`;

const InnerContentBox = styled.div`
  margin: auto;
  padding: 80px 100px 40px;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;

  @media screen and (min-width: 768px) {
    font-size: 44px;
  }
`;

const TitleWrapper = styled.div`
  display: grid;
  place-items: center;
`;
