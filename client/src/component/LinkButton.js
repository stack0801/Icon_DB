import React from "react";
import styled from "styled-components";

export default function App({ fontSize, onClick, text }) {
    return ( <Button fontSize = { fontSize } onClick = { onClick }>{ text }</Button> );
}

const Button = styled.button`
    width: 100%;
    background-color: #9ED1D9;
    color: #ECECEC;
    border: none;
    transition-duration: 0.3s;
    cursor: pointer;

    font-size: ${({ fontSize }) => fontSize || "18px"};
    
    &:hover{
        color: white;
    }
    
    &:active{
        color: #F5A282;
    }
`;
