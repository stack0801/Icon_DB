import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { FaSearch, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import axios from 'axios';

export default function App() {

    // 스크롤 위치
    const [scrollPosition, setScrollPosition] = useState(0);
    // 스크롤의 위치를 저장
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    // 유저 로그인 여부
    const [sign, setSign] = useState(null)
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                //console.log(res.data)
            })
    }, []);

    const [HambergerBar, setHambergerBar] = useState(false);
    const showBar = () => setHambergerBar(!HambergerBar);

    return (
        <Header>
            <Link to="#" className="toggle">
                {HambergerBar === false
                    ? <FaBars className="menubar-open animated" size="18" onClick={showBar} />
                    : <FaTimes className="menubar-open animated" size="20" onClick={showBar} />
                }
            </Link>
            <Logo/>

            {scrollPosition < 500
                ? <Link to="/" className="menu_list">menu</Link>
                : <SearchBox/> }
            {sign === null
                ? <Link to="/sign_in" className="signin_box">Sign in</Link>
                : <ul className="posting-logout-list">
                    <li><Link to="/posting" className="signin_box">Posting</Link></li>
                    <li><Link to="/sign_up" className="signin_box">Logout</Link></li>
                </ul> }
            <Link to="/posting"><FaUser className="header_user" size="20" /></Link>

            <nav className={HambergerBar
                ? "nav-menu active"
                : "nav-menu"}>
                <ul className="menu_list_items">
                </ul>
            </nav>
        </Header>
    )
}

const Header = styled.div`
    background:#9ed1d9;
    position: fixed;
    width:100vw;
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
        
    }
    .nav-menu.active {
            left: 0;
            transition: 0.35s;
            opacity: 0.9;
        }
    }
    .toggle{
        display:none;
    }
    .menu_list{
        width:100%;
        color: #ececec;
        display:flex;
        flex-direction:column;
        align-items:center;
        content-align:center;
        transition:0.3s;
        :hover{
            color:white;
            transition:0.3s;
        }
    }
    .menu_list_items {
        list-style: none;
        color: #9ed1d9;
        display:none;
    }
    .header_user{
        display:none;
    }
    .signin_box{
        transition:0.3s;
        :hover{
            color:#f5a282;
            transition: 0.3s;
        }
    }

    @media screen and (max-width:840px){
    .toggle{
        display:flex;
    }
    .menu_list{
        display:none;
    }
}`;