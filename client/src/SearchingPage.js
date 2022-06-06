import React, { useEffect, useState } from "react";
import Header from "./StyledHeader";
import { FaSearch, FaArrowUp, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './LandingPage.css';

export default function Main() {
    // 유저 로그인 여부
    const [sign, setSign] = useState(null)
    // 접속이후 axios 통신을 이용하여 확인함
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                //console.log(res.data)
            })
    }, []);

    // 스크롤 위치
    const [scrollPosition, setScrollPosition] = useState(0);
    // 스크롤의 위치를 저장
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    // 맨 위로 올라가게 함
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 이거 왜 안먹음?
        });
    };

    const [searchbox, setSearchbox] = useState("");

    const onSearchHandler = (e) => { setSearchbox(e.currentTarget.value) }

    const onSubmit = () => {
        //console.log(searchname);
        axios({
            method: 'post',
            url: '/search',
            data: {
                searchbox: searchbox
            }
        })
            .then((res) => {
                console.log(res.data) //아직 받는 데이터 없음(server.js에서 추후 수정)
            })
    }

    // search_box 컴포넌트
    const search_box = (
        <div id="search_box">
            <input placeholder="keyword" type="text" onChange={onSearchHandler}></input>
            <button onClick={onSubmit}><FaSearch size="20" color="#9ed1d9" /></button>
        </div>
    )


    // 반응형 헤더
    const [HambergerBar, setHambergerBar] = useState(false);
    const showBar = () => setHambergerBar(!HambergerBar);

    return (<>
        <Header />
        <div id="top">
            <h1>About</h1>
            {search_box}
        </div>
        <nav className={HambergerBar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="menu-list-items" onClick={showBar}>
                <li className="navbar-toggle">
                    <FaTimes className="menu-bars" size="30" color="white" />
                </li>
            </ul>
        </nav>
        {scrollPosition > 500 &&
            <button id="top_btn" onClick={scrollTop}><FaArrowUp size="26" color="white" /></button>}
    </>)
}
