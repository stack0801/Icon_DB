import React from "react";
import styled from "styled-components";

import Banner from "./component/Banner";
import Popular from "./component/PopularSection";
import LandingContainer from "./component/LandingContainer";
import Desktop from "@_components/common/Header/Desktop";
import TopButton from "@_components/TopButton";

export default function Main() {
  return (
    <section id="viewport">
      <Desktop />
      <TopButton />
      <HomeContainer>
        <Banner />
        <Popular />
        <LandingContainer />
      </HomeContainer>
    </section>
  );
}

const HomeContainer = styled.main`
  overflow: hidden;
  color: #0a152f;
`;
