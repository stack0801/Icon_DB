import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from "styled-components";
import Header from "../component/Header/Header";
import Top from "../component/Top";
import TopButton from "../component/TopButton";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Main() {

    //무한 스크롤
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState([]);
    const [page, setPage] = useState(0);
    const loading_size = 10;

    useEffect(() => {
        setLoading(true);
        axios
        .post('/get_contents', {
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

    return (
    <LandingPage>
        <Header/>
        <Top text="GET FREE ICONS" />
        <div className="image-grid">
            {icons.map((list, idx) => (
                <div key={idx}>
                    {idx + 1 === icons.length ?
                        <Link to = {"/post/" + list.content_id}>
                            <div className="icon-list" ref={lastElRef}>
                                <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.content_id + ".png"} alt="no_img" />
                            </div>
                        </Link> :
                        <Link to = {"/post/" + list.content_id}>
                            <div className="icon-list">
                                <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.content_id + ".png"} alt="no_img" />
                            </div>
                        </Link>}
                </div>
            ))}
        </div>
        {loading && <div>Loading...</div>}
       <TopButton/>
    </LandingPage>)
}

const LandingPage = styled.div`
  .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(320px,1fr));
      grid-template-rows: repeat(auto-fit,minmax(300px,1fr));
      gap: 5px;
      justify-items: center;
  }
  .icon-list{
      width: 300px;
      height:300px;
      background-color: white;
  }
`