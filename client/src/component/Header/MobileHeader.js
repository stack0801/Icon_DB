import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../Logo";
import "../../LandingPage.css"
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
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

    const [HambergerBar, setHambergerBar] = useState(false);
    const showBar = () => setHambergerBar(!HambergerBar);

    return (
        <MobileHeader>
            <Toggle>
                {HambergerBar === false
                    ? <FaBars className = "menubar-open animated" size = "18" onClick={showBar} />
                    : <FaTimes className = "menubar-open animated" size = "20" onClick={showBar} />
                }
            </Toggle>
            <Logo />
            {sign === null
                ? <Link to = "/sign_in"><FaUser className = "header_user" size = "20" /></Link>
                : <Link to = "/posting"><FaUser className = "header_user" size = "20" /></Link>
            }

            <nav className={HambergerBar
                ? "nav-menu active"
                : "nav-menu"}>
            </nav>
        </MobileHeader>
    )
}

const Toggle = styled.button`
    background-color: #9ed1d9;
    color: #ececec;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        color: white;
        transition: 0.3s;
    }
`;

const MobileHeader = styled.div`
    background:#9ed1d9;
    position: fixed;
    width: 100vw;
    height:40px;
    font-size: 18px;
    display: grid;   
    grid-template-columns: 20% 1fr 20%;
    place-items:center;
    place-content:center;

    .nav-menu {
        background-color: white;
        width: 40%;
        height: 100vh;
        display: flex;
        position: fixed;
        top: 40px;
        left: -100%;
        transition: 350ms;
        &.active{
             left: 0;
            transition: 0.35s;
            opacity: 0.9;
        }
    }
    .header_user:hover {
        color:#f5a282;
        transition: 0.3s;
    }
}`;