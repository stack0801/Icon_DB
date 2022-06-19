import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import LinkButton from "../LinkButton";
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
                ? <Link to = "/posting"><LinkButton text="Posting" /></Link>
                : <SearchBox width="450px" height="30px" />}
            {sign === null
                ? <Link to = "/sign_in"><LinkButton text="Sign in" /></Link>
                : <ul>
                    <li><Link to ="/profile"><LinkButton text="Profile" /></Link></li>
                    <li><LinkButton onClick={signOut} text="Logout" /></li>
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