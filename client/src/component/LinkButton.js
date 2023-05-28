import React from "react";
import styled from "styled-components";

export default function App({ fontSize, color, onClick, text }) {
    return ( <Button fontSize = { fontSize } color={ color } onClick = { onClick }>{ text }</Button> );
}

const Button = styled.button`
    width: 100%;
    background: none;
    border: none;
    transition-duration: 0.3s;
    cursor: pointer;

    font-size: ${({ fontSize }) => fontSize || "18px"};
    color: ${({ color }) => color || "#000000"};
    &:hover {
        color: #B8E9F2;
    }
`;
