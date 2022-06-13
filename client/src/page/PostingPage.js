import React from 'react';
import styled from "styled-components";
import PostingImage from "../component/PostingImage";
import PostingContainer from "../component/PostingContainer"
import Header from "../component/Header/Header";

export default function App() {
    return (<>
        <Header />
        <PostingPage>
        <PostingContainer/>
    </PostingPage>
    </>);
}

const PostingPage = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    place-content: center;
`;