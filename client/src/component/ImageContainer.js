import React from "react";
import styled from "styled-components";

export default function App({ width, height, src, alt, borderRadius, border }) {
    return (
        <ImageContainer  src={src} alt={alt} width={width} heigt={height} borderRadius={borderRadius} border = {border}/>
    );
}

const ImageContainer = styled.img`
    display: grid;
    place-items: center;
    place-content: center;
    
    border: ${(props) => (props.border || "none")};
    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    border-radius: ${(props) => (props.borderRadius || "0")};
`;

