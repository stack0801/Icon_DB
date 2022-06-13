import React from 'react';
import styled from "styled-components";
import PostingImage from "./PostingImage";

export default function App() {
    return (
        <PostingContainer>
            <PostingMessage>Post Your Icon</PostingMessage>
            <PostingImage />
        </PostingContainer>
    );
}

const PostingContainer = styled.div`
    display: grid;
    place-items: center;
    place-content: center;
`;
const PostingMessage = styled.h1`
    display: grid;
    place-items: center;
    color: #f5a282;
`;