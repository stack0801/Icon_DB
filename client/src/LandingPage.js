import React, { useEffect, useState, useRef, useCallback } from "react";
import Rodal from "rodal";
import styled from "styled-components";
import { Link, renderMatches } from "react-router-dom";
import { FaSearch, FaArrowUp, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdOutlineSaveAlt } from "react-icons/md";
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
import axios from 'axios';
import './LandingPage.css';
import './Modal.css';
import logo from './logo.svg';
import top_image from "./watercolor.jpg";
import "rodal/lib/rodal.css";

export default function Main() {
    
    //좋아요 기능
    const [like,setLike]=useState(false);
    const LikeButton=()=>{setLike(!like)};

    //Modal
    const [visible, setVisible] = useState(false);
    const modalOpen = () => { setVisible(true) }
    const modalClose = () => { setVisible(false) }

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

    // search_box 컴포넌트
    const search_box = (
        <div id="search_box">
            <input placeholder="keyword" type="text"></input>
            <Link to='/searching'><FaSearch size="26" color="#9ed1d9" /></Link>
        </div>
    )

    // 반응형 헤더
    const [HambergerBar, setHambergerBar] = useState(false);
    const showBar = () => setHambergerBar(!HambergerBar);

    //무한 스크롤
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState([]);
    const [page, setPage] = useState(1);
    const loading_size = 4;

    useEffect(() => {
        setLoading(true);

        axios.post('/get_contents', {
            id: page,
            count: loading_size
        })
            .then((res) => {
                console.log(res.data)
                setIcons((prevIcons) => [...prevIcons, ...res.data]);
                setLoading(false);
            });

    }, [page]);

    //Instersection Observer 사용
    const observer = useRef();
    const lastElRef = useCallback(
        (event) => {
            if (loading) return;
            if (observer.current)
                observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting)
                    setPage((prevPage) => prevPage + loading_size);
            });
            if (event)
                observer.current.observe(event);
        },
        [loading]
    );




    return (<>
        <Header>
            <Link to="#" className="toggle"><FaBars size="26" color="white" onClick={showBar} /></Link>
            <Link to="/" className="logo" onClick={scrollTop}><img src={logo} alt="logo" /></Link>
            {scrollPosition < 500 ?
                <Link to="/" className="menu_list"><div>menu</div></Link> :
                search_box}
            {sign === null ?
                <Link to="/sign_in"><FaUser className="user_icon" size="26" color="white" /></Link> :
                <Link to="/sign_up"><div>sign up</div></Link>}
        </Header>
        <div id="top">
            <img id="top_img" src={top_image} alt="top_img" />
            <div></div>
            <h1 onClick={modalOpen}>GET FREE ICONS</h1>
               <Rodal  visible={visible} onClose={modalClose} animation='fade' width='600' height='330'>
                   <div className="modal-container" >
                        <div className="modal-img">아이콘 </div>
                        <div className="modal-title">제목</div>
                        <div className="modal-detail">
                            {like === false ?
                            <FcLikePlaceholder className="icon-nonlike" size="35"onClick={LikeButton}/>:
                            <FcLike className="icon-like" size="35"onClick={LikeButton}/>
                            }
                            <MdOutlineSaveAlt className="icon-save animated" />
                        </div>
                        <button className="close-btn" onClick={modalClose}>close</button>
                        </div>
                </Rodal>
            {search_box}
        </div>
                
        <nav className={HambergerBar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="menu-list-items" onClick={showBar}>
                <li className="navbar-toggle">
                    <FaTimes className="menu-bars" size="30" color="white" />
                </li>
            </ul>
        </nav>
        <div className="image-grid">
            {icons.map((list, idx) => (
                <div key={idx}>
                    {idx + 1 === icons.length ?
                        <div className="icon-list" ref={lastElRef}>
                            <img src={"/" + list.content_id + ".svg"} alt="no_img" onClick={this.handleLikeModal} />
                        </div> :
                        <div className="icon-list">
                            <img src={"/" + list.content_id + ".svg"} alt="no_img" onClick={this.handleLikeModal} />
                        </div>}
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
        {
            scrollPosition > 500 &&
            <button id="top_btn" onClick={scrollTop}><FaArrowUp size="26" color="white" /></button>
        }
    </>)
}
const Header = styled.div`
        background:#9ed1d9;
        position: fixed;
        width:100%;
        height:60px;
        font-size: 30px;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(3,1fr);

        .toggle{
            display:none;
    }
        @media screen and (max-width:840px){
        .toggle{
            display:block;
        }

        .menu_list{
            display:${(props) => (props.isToggled ? "flex" : "none")};
        flex-direction:column;
        width:100%;
        background-color:black;
        }

        #search_box{
            display:none;
        }
    }
        `;
const ModalComponenet = styled.div`
        `;