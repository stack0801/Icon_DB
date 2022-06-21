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

    const openEditor = () => {
        window.open(process.env.REACT_APP_URL + ':8000/src/editor/')
    }

    return (
        <DesktopHeader>
            <Logo/>
            {scroll === false ? 
                <div/> : 
                <SearchBox width="450px" height="30px" />
            }
            <Link to = "/posting"><LinkButton text="Posting" /></Link>
            <LinkButton text="Edit" onClick={openEditor}/>
            {sign !== null && <Link to ={"/profile/" + sign}><LinkButton text="Profile" /></Link>}
            {sign === null ? 
                <Link to = "/sign_in"><LinkButton text="Sign in" /></Link> :
                <LinkButton onClick={signOut} text="sign out"/>
            }

        </DesktopHeader>
    )
}

const DesktopHeader = styled.div`
    position:fixed;
    background:#9ed1d9;
    width:100vw;
    height:55px;
    font-size: 18px;
    display: grid;    
    grid-template-columns: 150px 1fr 100px 100px 100px 100px;
    place-items:center;
    place-content:center;
    z-index: 999;
}`;