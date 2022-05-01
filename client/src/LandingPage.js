import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom";
import './LandingPage.css'
import { FaSearch } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import axios from 'axios'
import logo from './logo.svg'
import top_image from "./watercolor.jpg"

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
            behavior: 'smooth'
        });
    };

{/* return (
        <>
            {scrollPosition < 900 ? (
                <div className="navbar">
                    <div className="navbar_logo">
                        <a href="/">Home</a>
                    </div>

                    <ul className="navbar_menu">
                        <li className="navbar_menu_menu">
                            <a href="#!">menu1</a>
                        </li>
                        <li className="navbar_menu_menu">
                            <a href="#!">menu2</a>
                        </li>
                        <li className="navbar_menu_menu">
                            <a href="#!">menu3</a>
                        </li>
                    </ul>
                    
                    <a href="/sign_in"><FaUser className="user_icon" size="26" color="white" /></a>
                    {/*<ul className="navbar_icons">
                        {sign ? (
                            <li><Link to="/sign_in"><a onClick={onClick}>로그인</a></Link></li>
                        ) : (
                            <li><Link to="/sign_up"><a onClick={onClick}>회원가입</a></Link></li>
                        )}
                        </ul>
                </div>
            ) : (
                <div className="navbar">
                    <div className="navbar_logo">
                        <a href="/">Home</a>
                    </div>

                    <div id="search_box">
                        <input id="search_ipt" placeholder="keyword" type="text"></input>
                        <button><FaSearch className="search_icon" size="26" color="white" /></button>
                    </div>

                    <a href="/sign_in"><FaUser className="user_icon" size="26" color="white" /></a>
                    {/*<ul className="navbar_icons">
                        {sign ? (
                            <li><Link to="/sign_in"><a onClick={onClick}>로그인</a></Link></li>
                        ) : (
                            <li><Link to="/sign_up"><a onClick={onClick}>회원가입</a></Link></li>
                        )}
                        </ul>
                    </div>
            )}

            <div className="outer">
                <div id="top">
                    <div></div>
                    <h1>GET FREE ICONS</h1>
                    <div id="search_box">
                        <input id="search_ipt" placeholder="keyword" type="text"></input>
                        <button><FaSearch className="search_icon" size="26" color="white" /></button>
                    </div>
                </div>

                <div className="inner bg-yellow">1</div>
                <div className="divider"></div>
                <div className="inner bg-blue">2</div>
                <div className="divider"></div>
                <div className="inner bg-pink">3</div>

            </div>

            {ShowBtn && (
                <button onClick={scrollTop}><FaArrowUp className="back_top" size="26" color="white" />
                </button>
            )}
    
        </>
            )*/}

    //search_box 변수화
    const search_box = (
        <div id = "search_box">
            <input placeholder = "keyword" type = "text"></input>
            <button><FaSearch size = "26" color = "#9ed1d9"/></button>
        </div>
    )

    return (<>
        <div id = "navbar">
            <Link to = "/" onClick = {scrollTop}><img src = {logo} alt = "logo"/></Link>
            {scrollPosition < 500 ? 
            <Link to = "/"><div>menu</div></Link>:
            search_box}
            {sign === null ?
            <Link to = "/sign_in"><FaUser className="user_icon" size="26" color="white" /></Link> :
            <Link to = "/sign_up"><div>sign up</div></Link>}
        </div>
        <div id="top">
            <img id = "top_img" src = {top_image} alt = "top_img"/>
            <div></div>
            <h1>GET FREE ICONS</h1>
            {search_box}
        </div>
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
