import React, { useEffect } from "react";
import styled from "styled-components";

import Banner from "./component/Banner";
import Popular from "./component/PopularSection";
import LandingContainer from "./component/LandingContainer";
import Desktop from "@_components/common/Header/Desktop";
import TopButton from "@_components/TopButton";
import Footer from "@_components/common/Footer/Footer";

export default function Main() {
  useEffect(() => {
    document.body.classList.add("hero--white")
  })

  return (
    <>
      <Desktop />
      <TopButton />
      <HomeContainer>
        <Banner />
        <Popular />
        <LandingContainer />
      </HomeContainer>
      <Footer />
      </>
  );
}

const HomeContainer = styled.main`
  overflow: hidden;
  color: #0a152f;
`;
