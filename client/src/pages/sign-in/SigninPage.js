import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Background from "./Background";
import SigninContainer from "@_components/SigninPage/SigninContainer";
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
        <SigninPage>
            <Background />
            <SigninContainer width={isMobile ? "80vw" : "400px"} height="300px" padding="30px"/>
        </SigninPage>
    );
}

const SigninPage = styled.div`
    width: 100vw;
    height: 100vh;

    @media screen and (min-width: 992px) {
      display: flex;        
    }
`;
