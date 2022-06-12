import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import axios from 'axios';

export default function App() {

    // 스크롤 위치
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', setScrollPosition(window.scrollY || document.documentElement.scrollTop));
    });

    // 유저 로그인 여부
    const [sign, setSign] = useState(null)
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
            })
    }, []);
    return (
        <DesktopHeader>
            <Logo />
            {scrollPosition < 500
                ? <MenuList>
                    <li><Menu href="/posting">posting</Menu></li>
                </MenuList>
                : <SearchBox width="450px" height="30px" />}
            {sign === null
                ? <SigninBox to="/sign_in">Sign in</SigninBox>
                : <ul>
                    <li><SigninBox to="/profile">Profile</SigninBox></li>
                    <li><SigninBox to="/sign_up">Logout</SigninBox></li>
                </ul>}
        </DesktopHeader>
    )
}

const Menu = styled.a`
    width:100%;
    color: #ececec;
    display:grid;
    flex-direction:column;
    place-items:center;
    place-content:center;
    transition-duration:0.3s;
    &:hover {
        color:white;
    }
    &:active{
        color:#f5a282;
    }
`;

const MenuList = styled.ul`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items:center;
    place-content:center;
    transition-duration:0.3s;
    &:hover {
        color:white;
    }
    &:active{
        color:#f5a282;
    }
`;

const SigninBox = styled(Link)`
    color: #ececec;
    transition-duration: 0.3s;
    &:hover{
        color: white;
    }
    &:active{
        color: #f5a282;
    }
`;

const DesktopHeader = styled.div`
    position:fixed;
    background:#9ed1d9;
    width:100vw;
    height:40px;
    font-size: 18px;
    display: grid;   
    grid-template-columns: 15% 1fr 15%;
    place-items:center;
    place-content:center;
}`;