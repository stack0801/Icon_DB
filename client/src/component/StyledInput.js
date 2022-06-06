import React from "react";
import styled from "styled-components";

export default function App({ width, height, placeholder, type, fontSize, onChange}) {
    return (
        <StyledInput 
            width = {width} 
            height = {height} 
            placeholder = {placeholder} 
            fontSize = {fontSize} 
            onChange = {onChange}
            type = "text">
        </StyledInput>
    )
}

const StyledInput = styled.input`
    background: white;
    border: solid 2px #9ed1d9;
    border-radius: 5px;
    padding-left: 10px;

    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
    font-size: ${(props) => props.fontSize || "20px"};
    
    &:focus {
        border-color: #f5a382;
        outline: none;
    }
`;