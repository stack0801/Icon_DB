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
    )
}

const StyledButton = styled.button`
    background: #9ed1d9;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    transition-duration: 0.2s;

    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "40px")};
    font-size: ${(props) => (props.fontSize || "18px")};
`;