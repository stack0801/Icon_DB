import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBox from "../SearchBox";
import top_image from "../../img/watercolor.jpg";

export default function App() {

    //Mobile 버전
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

    const [isTopImageLoaded, setIsTopImageLoaded] = useState();

    return (
        <Top style={{ visibility: isTopImageLoaded ? "visible" : "hidden" }}>
            <TopImage
                src={top_image}
                alt="top_img"
                onLoad={() => setIsTopImageLoaded(true)} />
            <div />
            <h1>GET FREE ICON</h1>
            <SearchBox width={isMobile ? "90%" : "600px"} height="60px" fontSize="30px" />
        </Top>
    );
}

const Top = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 100px 100px 1fr;
    place-items: center;
`;

const TopImage = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`;