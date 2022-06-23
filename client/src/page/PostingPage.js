import React from "react";
import styled from "styled-components";
import Header from "../component/Header/Header";
import PostingContainer from "../component/PostingPage/PostingContainer";

export default function App() {
    return (<>
        <Header />
        <PostingPage>
            <PostingContainer />
        </PostingPage>
    </>);
}

const PostingPage = styled.div`
    position:absolute;
    top: 55px;
    width: 100vw;
    height: 93vh;
    
    display: grid;
    grid-template-rows: 0.5fr 1fr;
    place-items: center;
    place-content: center;
`;