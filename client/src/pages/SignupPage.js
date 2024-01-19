import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SignupContainer from "@_components/SignupPage/SignupContainer";
import Logo from "@_components/Logo";

export default function App() {

    //Mobile 버전
    const [isMobile, setisMobile] = useState(false);
    const resizingHandler = () => { setisMobile(window.innerWidth <= 768);};

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
    );
}

const SignupPage = styled.div`
    height: 100vh;
    display: grid;
    place-items:center;
    place-content:center;
    background: #9ed1d9;
`;
