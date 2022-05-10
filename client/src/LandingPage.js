import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import './LandingPage.css';
import { FaSearch, FaArrowUp, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './LandingPage.css';
import logo from './logo.svg';
import top_image from "./watercolor.jpg";

export default function Main() {

    //Button 1개로 두가지 기능
    const [sign, setSign] = useState(null)

    useEffect(() => {
        axios({
            method: 'post',
            url: '/get_auth'
        })
        .then((res) => {
            if (res.data !== null) {
                setSign(res.data)
                console.log(res.data)
            }
        })
    }, []);

    //Hide Header
    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    //Top Button
    const [ShowBtn, setShowBtn] = useState(false);

    //스크롤이 600이상 내려가면 화면에 보임
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 600)
                setShowBtn(true);
            else
                setShowBtn(false);
        });
    });

    //맨 위로 올라가게 함
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        });
    };

    //반응형 헤더
    const [HambergerBar,setHambergerBar]=useState(false);

    const showBar = () => setHambergerBar(!HambergerBar);

    //search_box 변수화
    const search_box = (
        <div id = "search_box">
            <input placeholder = "keyword" type = "text"></input>
            <button><FaSearch size = "26" color = "#9ed1d9"/></button>
        </div>
    )

    return (<>
        <Header>
            <Link to="#" className="toggle"><FaBars size="26" color="white" onClick={showBar}/></Link>
            <Link to = "/" className="logo" onClick = {scrollTop}><img src = {logo} alt = "logo"/></Link>
            {scrollPosition < 500 ? 
            <Link to = "/" className="menu_list"><div>menu</div></Link>:
            search_box}
            {sign === null ?
            <Link to = "/sign_in"><FaUser className="user_icon" size="26" color="white" /></Link> :
            <Link to = "/sign_up"><div>sign up</div></Link>}
        </Header>
        <div id="top">
            <img id = "top_img" src = {top_image} alt = "top_img"/>
            <div></div>
            <h1>GET FREE ICONS</h1>
            {search_box}
        </div>
        <nav className={HambergerBar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="menu-list-items" onClick={showBar}>
                <li className="navbar-toggle">
                    <FaTimes className="menu-bars" size="30" color="white"/>
                </li>
            </ul>
        </nav>
        <div id = "content">
            <div className="test">1</div>
            <div className="test">2</div>
            <div className="test">3</div>
            <div className="test">4</div>
            <div className="test">5</div>
        </div>
        {ShowBtn &&
        <button id = "top_btn" onClick = {scrollTop}><FaArrowUp size="26" color="white" /></button>}
    </>)
}

const Header=styled.div`
    background:#9ed1d9;
    position: fixed;
    width:100%;
    height:60px;
    font-size: 30px;
    display: grid;
    place-items: center;
    grid-template-columns: 230px 1fr 200px;

    .toggle{
        display:none;
    }
    @media screen and (max-width:840px){
        .toggle{
            display:block;
        }

        .menu_list{
            display:${(props)=>(props.isToggled ? "flex" : "none")};
            flex-direction:column;
            width:100%;
            background-color:black;
        }

       
        #search_box{
            display:none;
        }
    }
`;