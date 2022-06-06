import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from "./component/Header/Header";
import Top from "./component/Top";
import TopButton from "./component/TopButton";
import axios from 'axios';
import './LandingPage.css';

export default function Main() {

    //무한 스크롤
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState([]);
    const [page, setPage] = useState(1);
    const loading_size = 10;

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
        <Header />
        <Top text="GET FREE ICONS" />
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
       <TopButton/>
    </>)
}