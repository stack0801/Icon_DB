import React from "react";
import styled from "styled-components";

// styled-component를 사용하여 Component화, 다른 파일에도 사용 
export default function App({ width, height, src, alt, borderRadius, border }) {
    return ( <ImageContainer  src={src} alt={alt} width={width} height={height} borderRadius={borderRadius} border = {border}/> );
}

const ImageContainer = styled.img`
    display: grid;
    place-items: center;
    place-content: center;
    
    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    border: ${(props) => (props.border || "none")};
    border-radius: ${(props) => (props.borderRadius || "0")};
`;

