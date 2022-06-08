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
                id: id
            }
        })
            .then((res) => {
                setData(res.data[0]);
                console.log(res.data[0]);
            })
    }, []);

    return (<>
        <Header />
        <PostPage>
            <div />
            <Image>
                <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.content_id +  ".png"} alt="no_img" />
                <Title>
                ID : {data.user_id}
            <div>Title : {data.message}</div>
            <div>Date : {data.date}</div>
            </Title>
            </Image>
        </PostPage>
        </>)
}

const PostPage = styled.div`
    display: grid;
    grid-template-rows: 100px 100px 100px 100px;
    gap: 5px;
    border: solid 2px gray;
    place-items: center;
`;

const Image = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Title = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 15px;
`;