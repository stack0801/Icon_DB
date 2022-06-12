import React from 'react';
import styled from "styled-components";
import Container from "../component/ImageGrid";
import Header from "../component/Header/Header";
import Top from "../component/Top";
import TopButton from "../component/TopButton";

export default function Main() {
    return (
        <LandingPage>
            <Header />
            <Top text="GET FREE ICONS" />
            <Container />
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
