import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SvgLogo } from "../img/logo3.svg";

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
        fill: #ECECEC;
        transition-duration: 0.3s;
    }

    &:hover {
        text {
            fill: white;
        }
    }
    &:active {
        text {
            fill:#F5A282;
        }
    }
`;
