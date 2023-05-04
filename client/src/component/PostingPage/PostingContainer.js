import React from "react";
import styled from "styled-components";
import PostingWrapper from "./PostingWrapper";

export default function App() {
    return (
        <PostingContainer>
            <PostingMessage>Post Your Icon</PostingMessage>
            <PostingWrapper/>
        </PostingContainer>
    );
}

const PostingContainer = styled.div`
    padding-top: 55px;
    width: 100vw;
    height: 94vh;
    display: grid;
    place-items: center;
    place-content: center;
    background: #F3EFEF;
`;
const PostingMessage = styled.h1`
    width: 1200px;
    display: grid;
    place-items: center;
`;