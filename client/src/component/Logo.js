import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import  {ReactComponent as SvgLogo} from "../img/logo3.svg";

export default function App(){
    return (
        <Logo>
            <Link to = "/"><Svg src = {SvgLogo} alt = "logo" /></Link>
        </Logo>
    );
}

const Logo = styled.div``;

const Svg = styled(SvgLogo)`
    text {
        fill: #ececec;
        transition-duration: 0.3s;
    }
    &:hover {
        text {
            fill: white;
        }
    }
    &:active{
        text{
            fill:#f5a282;
        }
    }
`;
