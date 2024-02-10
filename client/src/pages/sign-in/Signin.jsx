import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Background from "@_components/ui/Background";
import SigninContainer from "@_pages/sign-in/component/ContentContainer";

export default function Signin() {

    // //Mobile 버전
    // const [isMobile, setisMobile] = useState(false);
    // const resizingHandler = () => { setisMobile(window.innerWidth <= 768); };

    // useEffect(() => {
    //     resizingHandler();
    //     window.addEventListener("resize", resizingHandler);
    //     return () => { window.removeEventListener("resize", resizingHandler); };
    // }, []);

    return (
        <SigninPage>
            <Background />
            <SigninContainer />
        </SigninPage>
    );
}

const SigninPage = styled.div`
    width: 100vw;
    height: 100vh;
    color: #000;
    
    @media screen and (min-width: 992px) {
      display: flex;
    }
`;
