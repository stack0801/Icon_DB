import React from "react";
import styled from "styled-components";

export default function Image({ src, alt, ...restProps }) {
    return ( <ImageContainer  src = { src } alt = { alt } { ...restProps }/> );
}

const ImageContainer = styled.img`
    display: grid;
    place-items: center;
    place-content: center;
    
    width: ${({ width }) => width || "auto"};
    height: ${({ height }) => height || "auto"};
    border: ${({ border }) => border || "none"};
    border-radius: ${({borderRadius}) => borderRadius || "0"};
`;

