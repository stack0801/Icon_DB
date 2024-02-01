import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Background from "@_components/ui/Background.jsx";
import SignupContainer from "@_pages/sign-up/component/ContentContainer";

export default function Signup() {

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
            <Background />
            <SignupContainer />
        </SignupPage>
    );
}

const SignupPage = styled.div`
     width: 100vw;
    height: 100vh;

    @media screen and (min-width: 992px) {
      display: flex;        
    }
`;
