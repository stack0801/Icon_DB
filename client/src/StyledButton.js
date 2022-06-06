import React from "react";
import styled from "styled-components";
import "./Sign.css";

export default function App({ width, height, text, fontSize, onClick }) {
    return (
        <StyledButton width={width} height={height} fontSize={fontSize} onClick={onClick}>
            {text}
            </StyledButton>
    )
}

const StyledButton = styled.button`
    margin-top: 20px;
    background: #f5a282;
    color: white;
    font-size: 16px;
    border-radius: 40px;
    cursor: pointer;
    border: none;
    transition-duration: 0.2s;
    &:active{
        background: #f28962;
    }
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
    font-size: ${(props) => props.fontSize || "20px"};
`;
