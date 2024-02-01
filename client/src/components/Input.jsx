import React from "react";
import styled from "styled-components";

export default function Input({ width, height, placeholder, type, fontSize, onChange, onKeyPress}) {
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
    display: block;
    padding: 10px;
    min-height: 24px;
    border: none;
    border-radius: 3px;
    background-color: #fff;
    line-height: 24px;
    box-shadow: inset 0 0 0 1px #c8c8c8;
    transition: box-shadow 1ms cubic-bezier(1,0,0,1);
    user-select: text;
    outline: none;

    width: ${(props) => props.width || "auto"};
    
    &:active, &:focus {
        box-shadow: inset 0 0 0 2px #9ed1d9;
    }
`;