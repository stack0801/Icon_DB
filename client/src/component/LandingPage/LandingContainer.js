import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Loading from "../Loading";
import axios from 'axios';

export default function Main() {

    //무한 스크롤
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState([]);
    const [page, setPage] = useState(0);
    const loading_size = 10;

    const [profiledata, setProfileData] = useState({});

    useEffect(() => {
        axios({
            method: 'post',
            url: '/get_user'
        })
            .then((res) => {
                setProfileData(res.data[0]);
                console.log(res.data[0]);
            })
    }, []);
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
            });
        setLoading(false);
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
        <LandingContainer>
            <ImageListWrapper>
                {icons.map((list, idx) => (
                    <div key={idx}>
                        {idx + 1 === icons.length
                            ? <Link to={"/post/" + list.content_id}>
                                <IconContainer>
                                    <IconList src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.filename} alt="no_img" width="260" ref={lastElRef} />
                                    <ShowTitle><Text>Show Detail</Text></ShowTitle>
                                </IconContainer>
                            </Link>
                            : <Link to={"/post/" + list.content_id}>
                                <IconContainer>
                                    <IconList src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.filename} alt="no_img" width="260" />
                                    <ShowTitle><Text>Show Detail</Text></ShowTitle>
                                </IconContainer>
                            </Link>}
                    </div>
                ))}
            </ImageListWrapper>
            {!loading && <Loading />}
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
`;

const ImageListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(320px,1fr));
    grid-template-rows: repeat(auto-fit,minmax(300px,1fr));
    gap: 5px;
    justify-items: center;
`;

const IconContainer = styled.div`
    display: inline-block;
    height: 260px;
`;

const IconList = styled.img`
    height: 260px;
`;

const ShowTitle = styled.div`
    position: relative;
    top: -263px;
    bottom: 0;
    left: 0;
    width: 260px;
    height: 260px;
    opacity:0;
    transition: .5s ease;
    background-color: #9ed1d9;
    &:hover { 
        opacity: 0.9;
    }
`;

const Text = styled.div`
    width: fit-content;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
`;

