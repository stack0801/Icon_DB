import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Loading from "@_components/Loading";

import { Container } from "@material-ui/core";

export default function Main() {

    //무한 스크롤
    const [loading, setLoading] = useState(true);
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
                setIcons((prevIcons) => [...prevIcons, ...res.data]);
                setLoading(false);
            });
    }, [page]);
    
    const observer = useRef();
    const lastElRef = useCallback(
        (event) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + loading_size);
                }
            });
            if (event) observer.current.observe(event);
        }, [loading]);

    return (
        <Page>
            <Container> 
            <ImageListWrapper>
                {icons.map((list, idx) => (
                    <div key={idx}>
                        <Link to={"/post/" + list.content_id}>
                            <IconContainer>
                                <IconList src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.filename} alt="no_img" width="260" ref={idx + 1 === icons.length ? lastElRef : null} />
                                <ShowTitle>
                                    <Text>{list.message}</Text>
                                </ShowTitle>
                            </IconContainer>
                        </Link>
                    </div>
                ))}
            </ImageListWrapper>
            {!loading && <Loading />}
            </Container>
        </Page>
    );
}

const Page = styled.div`
    background-color: #F7ECDC;
`;

const ImageListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(290px,1fr));
    gap: 24px;
    justify-items: center;
`;

const IconContainer = styled.div`
    width: 282px;
    height: 282px;    
    display: inline-block;
    background: #FFFFFF;
    border: none;
`;

const IconList = styled.img`
    width: 282px;
    height: 282px;
`;

const ShowTitle = styled.div`
    position: relative;
    top: -286px;
    bottom: 0;
    left: 0;
    width: 282px;
    height: 282px;
    background: #F3EFEF;
    color: #292929;
    opacity: 0;
    transition: .5s ease;

    &:hover { 
        opacity: 0.8;
    }
`;

const Text = styled.div`
    position: absolute;    
    top: 50%;
    left: 50%;
    width: fit-content;
    font-size: 16px;
    transform: translate(-50%, -50%);
    text-align: center;
`;

