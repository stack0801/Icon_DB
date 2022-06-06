import React from "react";
import styled from "styled-components";
import logo from '../img/logo.svg'
import { Link } from 'react-router-dom';

const Logo = styled.div`
    
`;

export default function App() {
    return (
        <Logo>
            <Link to = "/">
                <img src = {logo} alt = "logo"/>
            </Link>
        </Logo>
    );
}