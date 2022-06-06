import React from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox/SearchBox";
import top_image from "../watercolor.jpg";

export default function App({text}){
    return(
        <Top>
            <TopImage src={top_image} alt="top_img" />
            {text}
            <SearchBox width="600px" height="60px"/>
        </Top>

    );
}

const Top = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 100px 100px 1fr;
    place-items: center;
`;

const TopImage=styled.img`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
`;