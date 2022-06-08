import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';
import Header from "../component/Header/Header";

export default function App() {
    let { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        axios({
            method: 'post',
            url: '/get_content',
            data: {
                id : id
            }
        })
        .then((res) => {
            setData(res.data[0]);
            console.log(res.data[0]);
        })
    }, []);

    return (
        <PostPage>
            <Header/>
            <div/>
            <img src={"/" + data.content_id + ".svg"} alt="no_img" />
            <div>{data.user_id}</div>
            <div>{data.message}</div>
            <div>{data.date}</div>
        </PostPage>
    )
}

const PostPage = styled.div`
    display: grid;
    grid-template-rows: 100px 100px 100px 100px;
    gap: 5px;
    justify-items: center;
`;
