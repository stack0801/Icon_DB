import React from 'react';
import styled from "styled-components";
import Header from "../component/Header/Header";
import PostContainer from "../component/PostPage/PostContainer";

export default function App() {
    return (<>
        <Header />
        <PostPage>
            <PostContainer/>
        </PostPage>
    </>)
}

const PostPage = styled.div`
    position:absolute;
    top: 55px;
    width:100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    place-content: center;
`;