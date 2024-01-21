import React from "react";
import styled from "styled-components";

export default function App({ width, height, placeholder, type, fontSize, onChange, onKeyPress}) {
    return (
        <StyledInput 
            width = {width} 
            height = {height} 
            placeholder = {placeholder} 
            fontSize = {fontSize} 
            onChange = {onChange}
            onKeyPress = {onKeyPress}
            type = {type}>
        </StyledInput>
    );
}

const StyledInput = styled.input`
    padding-left: 10px;
    background: white;
    border: solid 1px #424242;
    border-radius: 3px;

    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "40px"};
    font-size: ${(props) => props.fontSize || "13px"};
    type: ${(props) => props.type ? props.type : "text"};

    &:hover {
        border: solid 1px #9ed1d9;
        outline: none;
    }
`;