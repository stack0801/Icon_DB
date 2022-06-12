import React from "react";
import styled from "styled-components";

export default function App({width, src, alt, borderRadius}){
    return(
        <ImageContainer src={src} alt={alt} width={width} borderRadius={borderRadius}/>
    );
}

const ImageContainer = styled.img`
width: ${(props) => (props.width || "auto")};
border-radius: ${(props) => (props.borderRadius || "0")};

`;