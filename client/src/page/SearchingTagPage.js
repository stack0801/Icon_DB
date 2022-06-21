import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";
import SearchBox from "../component/SearchBox";
import Header from "../component/Header/Header";
import TopButton from "../component/TopButton";
import axios from 'axios';

export default function App() {

    let { keyword } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/tag_search',
            data: {
                Hashtag: keyword
            }
        })
        .then((res) => {
            setData(res.data)
            console.log(res.data) //아직 받는 데이터 없음(server.js에서 추후 수정)
        })
    }, []);

    return (<>
        <Header />
        <SearchingTagPage>
        <SearchBox width="60vw" fontSize="40px"/>
            <h1>Your Results : {keyword}</h1>
            <ImageListWrapper>
            {(data.length === 0) ? 
            <h1>no results</h1> :
            data.map((list, idx) => (
                <div key={idx}>
                    <Link to={"/post/" + list.content_id}>
                        <IconContainer>
                            <IconList src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.content_id + ".png"} alt="no_img" width="260"/>
                            <ShowTitle><Text>Show Detail</Text></ShowTitle>
                        </IconContainer>
                    </Link>
                </div>
            ))}
            </ImageListWrapper>
            <TopButton />
        </SearchingTagPage>
    </>);
}

const SearchingTagPage = styled.div`
    position:absolute;
    top: 55px;
    left:20%;
    display: grid;
    place-content: center;
    padding-top: 50px;
`;

const ImageListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(320px,1fr));
    grid-template-rows: repeat(auto-fit,minmax(300px,1fr));
    gap: 5px;
`;

const IconContainer = styled.div`
    background-color : #ffffff;
    display: inline-block;
    height: 260px;
    border: 3px solid #9ed1d9;
    border-radius: 10px;
`;

const IconList = styled.img`
    height: 260px;
    border-radius: 10px;
`;

const ShowTitle = styled.div`
    position: relative;
    top: -264px;
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
    transform: translate(-50%, -50%);
    text-align: center;
`;