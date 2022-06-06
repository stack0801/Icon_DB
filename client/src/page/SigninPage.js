import React from "react";
import styled from "styled-components";
import SigninContainer from '../component/SigninContainer';
import Logo from '../component/Logo';

export default function App() {
    return (
        <SigninPage>
            <Logo/>
            <SigninContainer width="400px" height="300px" padding="30px"/>
        </SigninPage>
    )
}

const SigninPage = styled.div`
    background: #9ed1d9;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
