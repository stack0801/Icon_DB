import React from 'react';
import styled from "styled-components";
import PostingImage from "../component/PostingImage";
import Header from "../component/Header/Header";

export default function App() {
    return (<>
        <Header />
        <PostingPage>
            <PostingMessage>Post Your Icon</PostingMessage>
            <PostingImage />
        </PostingPage>
    </>);
}

const PostingPage = styled.div`
height: 100vh;
display: grid;
place-items: center;
place-content: center;
`;
const PostingMessage = styled.h1`
    display: grid;
    place-items: center;
    color: #f5a282;
`;