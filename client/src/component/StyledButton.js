import React from "react";
import styled from "styled-components";

export default function App({ width, height, text, fontSize, onClick }) {
    return (
        <StyledButton
            width = {width}
            height = {height}
            fontSize = {fontSize}
            onClick = {onClick}>
            {text}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    background: #F5A282;
    border: none;
    color: #ECECEC;
    cursor: pointer;
    transition-duration: 0.2s;

    &:hover {
        color: white;
    }
    &:active {
        background: #F28962;
    }
    
    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    font-size: ${(props) => (props.fontSize || "20px")};
`;
