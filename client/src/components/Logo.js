import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SvgLogo } from "@_assets/brand/logo3.svg";

export default function App() {
    return (
        <Container>
            <Link to="/">
                <Svg src={SvgLogo} alt="logo" />
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Svg = styled(SvgLogo)`
    text {
        fill: #000000;
        transition-duration: 0.3s;
    }
`;
