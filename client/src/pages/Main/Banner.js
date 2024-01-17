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
    <Page>
      <div />
      <TitleWrapper>
        <h1>ICON LIBRARY</h1>
        <h1>AVAILABLE FOR FREE</h1>
      </TitleWrapper>
      <SearchBox
        width={isMobile ? "90%" : "600px"}
        height="60px"
        fontSize="30px"
      />
    </Page>
  );
}

const Page = styled.div`
  padding-top: 60px;
  height: 85vh;
  display: grid;
  grid-template-rows: 20% 20% 30% 1fr;
  place-items: center;
  background: #f7ecdc;
  background-image: url(https://miricanvas.zendesk.com/hc/article_attachments/900002143783/___________________4_.png);
  background-size: cover;
  background-repeat: no-repeat;
`;
const TitleWrapper = styled.div`
  display: grid;
  place-items: center;
`;
