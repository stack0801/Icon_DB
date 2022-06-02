import React, { useEffect, useState, useRef, useCallback } from 'react';
import Rodal from 'rodal';
import { Link } from 'react-router-dom';
import Header from './StyledHeader';
import { FaSearch, FaArrowUp } from 'react-icons/fa';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import axios from 'axios';
import './LandingPage.css';
import './Modal.css';
import 'rodal/lib/rodal.css';
import top_image from './watercolor.jpg';

export default function Main() {

    //좋아요 기능
    const [like, setLike] = useState(false);
    const LikeButton = () => { setLike(!like) };

    //Modal
    const [visible, setVisible] = useState(false);
    const modalOpen = () => { setVisible(true) }
    const modalClose = () => { setVisible(false) }

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
            <Link to='/searching'><FaSearch size="20" color="#9ed1d9" /></Link>
        </div>
    )

    //무한 스크롤
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState([]);
    const [page, setPage] = useState(1);
    const loading_size = 1;

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
        <Header/>

        <div id="top">
            <img id="top_img" src={top_image} alt="top_img" />
            <h1 onClick={modalOpen}>GET FREE ICONS</h1>
            {/* <Rodal customStyles={{ height: "330px", width: "600px", }} visible={visible} onClose={modalClose} animation='fade'>
                <div className="modal-container" >
                    <div className="modal-img">아이콘 </div>
                    <div className="modal-title">제목</div>
                    <div className="modal-detail">
                        {like === false ?
                            <FcLikePlaceholder className="icon-nonlike animated1" size="35" onClick={LikeButton} /> :
                            <FcLike className="icon-like animated1" size="35" onClick={LikeButton} />}
                        <MdOutlineSaveAlt className="icon-save animated1" />
                    </div>
                    <button className="close-btn" onClick={modalClose}>close</button>
                </div>
            </Rodal> */}
            {search_box}
        </div>

        <div className="image-grid">
            {icons.map((list, idx) => (
                <div key={idx}>
                    {idx + 1 === icons.length ?
                        <div className="icon-list" ref={lastElRef}>
                            <img src={"/" + list.content_id + ".svg"} alt="no_img" />
                        </div> :
                        <div className="icon-list">
                            <img src={"/" + list.content_id + ".svg"} alt="no_img" />
                        </div>}
                </div>
            ))}
        </div>
        {loading && <div>Loading...</div>}
        {
            scrollPosition > 500 &&
            <button id="top_btn" onClick={scrollTop}><FaArrowUp size="26" color="white" /></button>
        }
    </>)
}