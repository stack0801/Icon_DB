import React from "react";
import styled from "styled-components";
import  {ReactComponent as SvgLogo} from '../img/logo3.svg'
import { Link } from 'react-router-dom';

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

export default function App(){
    return (
        <Logo>
            <Link to = "/">
                <Svg src = {SvgLogo} alt = "logo" />
            </Link>
        </Logo>
    );
}