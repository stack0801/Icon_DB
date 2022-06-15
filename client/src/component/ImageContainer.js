import React from "react";
import styled from "styled-components";

export default function App({ width, height, src, alt, borderRadius }) {
    return (
        <ImageContainer  src={src} alt={alt} width={width} heigt={height} borderRadius={borderRadius}/>
    );
}

const ImageContainer = styled.img`
    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    border-radius: ${(props) => (props.borderRadius || "0")};
`;

