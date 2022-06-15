import React from 'react';
import styled from "styled-components";
import LandingContainer from "../component/LandingPage/LandingContainer";
import Header from "../component/Header/Header";
import Top from "../component/LandingPage/Top";
import TopButton from "../component/TopButton";

export default function Main() {
    return (
        <LandingPage>
            <Header />
            <Top text="GET FREE ICONS" />
            <LandingContainer />
            <TopButton />
        </LandingPage>
    )
}

const LandingPage = styled.div`
  .icon-list {
      width: 300px;
      height: 300px;
      background-color: white;
  }
`;
