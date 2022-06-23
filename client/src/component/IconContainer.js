import React from 'react';
import styled from "styled-components";
export default function App({src, alt, width}) {

    return (<IconContainer>
            <IconList src={src} alt={alt} width={width} />
            <ShowTitle><Text>Show Detail</Text></ShowTitle>
            </IconContainer>);
}

const IconContainer = styled.div`
    background-color : #ffffff;
    display: inline-block;
    height: 260px;
    border: 3px solid #9ed1d9;
    border-radius: 10px;
`;

const IconList = styled.img`
    height: 260px;
    border-radius: 10px;
`;

const ShowTitle = styled.div`
    position: relative;
    top: -264px;
    bottom: 0;
    left: 0;
    width: 260px;
    height: 260px;
    opacity:0;
    transition: .5s ease;
    background-color: #9ed1d9;
    border-radius: 10px;
    &:hover { 
        opacity: 0.9;
    }
`;

const Text = styled.div`
    width: fit-content;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

