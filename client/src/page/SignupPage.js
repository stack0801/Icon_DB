import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignupContainer from '../component/SignupPage/SignupContainer';
import Logo from '../component/Logo';

export default function App() {

    const [isMobile, setisMobile] = useState(false);
    const resizingHandler = () => { setisMobile(window.innerWidth <= 600);};

    useEffect(() => {
        resizingHandler();        
        window.addEventListener("resize", resizingHandler);
        return () => { window.removeEventListener("resize", resizingHandler);};
    }, []);

    return (
        <SignupPage>
            <Logo/>
            <SignupContainer width={isMobile ? "80vw" : "400px"} height="300px" padding="30px"/>
        </SignupPage>
    )
}

const SignupPage = styled.div`
    background: #9ed1d9;
    height: 100vh;
    display: grid;
    place-items:center;
    place-content:center;
`;
