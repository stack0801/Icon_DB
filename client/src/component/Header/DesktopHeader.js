import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import axios from 'axios';

export default function App() {

    // 유저 로그인 여부
    const [sign, setSign] = useState(null)
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
            })
    }, []);

    const signOut = () => {
        console.log("!!")
        axios
        .post('/sign_out')
        .then((res) => {
            console.log(res.data)
            if (res.data === 'success')
                window.location.href = '/';
        })
    }
    
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);
    const handleScroll = () => {
        if (window.scrollY >= 500)
            setScroll(true);
        else
            setScroll(false);
    };
    return (
        <DesktopHeader>
            <Logo />
            {scroll === false
                ? <MenuList>
                    <li><Menu href="/posting">posting</Menu></li>
                </MenuList>
                : <SearchBox width="450px" height="30px" />}
            {sign === null
                ? <Link to="/sign_in"><SigninBox>Sign in</SigninBox></Link>
                : <ul>
                    <li><Link to="/profile"><SigninBox>Profile</SigninBox></Link></li>
                    <li><SigninBox onClick={signOut}>Logout</SigninBox></li>
                </ul>}
        </DesktopHeader>
    )
}

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
    z-index: 999;
}`;

const MenuList = styled.ul`
    display:grid;
    place-items:center;
    place-content:center;
`;

const Menu = styled.a`
    width:100%;
    color: #ececec;
    transition-duration:0.3s;
    &:hover {
        color:white;
    }
    &:active{
        color:#f5a282;
    }
  
`;

const SigninBox = styled.button`
    background-color: #9ed1d9;
    color: #ececec;
    font-size: 18px;
    transition-duration: 0.3s;
    border:none;
    &:hover{
        color: white;
    }
    &:active{
        color: #f5a282;
    }
`;
