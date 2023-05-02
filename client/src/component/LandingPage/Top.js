import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBox from "../SearchBox";

export default function App() {
    const [isMobile, setisMobile] = useState();

    useEffect(() => {
        const resizingHandler = () => {
            setisMobile(window.innerWidth <= 800);
        };
        resizingHandler();
        window.addEventListener("resize", resizingHandler);
        return () => {
            window.removeEventListener("resize", resizingHandler);
        };
    }, [isMobile]);
  
    return (
        <Page>
            <div/>
            <TitleWrapper>
            <h1>ICON LIBRARY</h1>
            <h1>AVAILABLE FOR FREE</h1>
            </TitleWrapper>
            <SearchBox width={isMobile ? "90%" : "600px"} height="60px" fontSize="30px" />
        </Page>
    );
}

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 20% 20% 30% 1fr;
    place-items: center;
    background: #9ED1D9;
`;
const TitleWrapper = styled.div`
    display: grid;
    place-items: center;
`;