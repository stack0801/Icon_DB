import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

export default function App(){
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

    return(
        <ImageDetail>
        <img src = {"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.content_id + ".png"} alt = "no_img" />
        <Title>
            ID : {data.user_id}
            <div>Title : {data.message}</div>
            <div>Date : {data.date}</div>
        </Title>
    </ImageDetail>
    );
}

const ImageDetail = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Title = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 15px;
    font-size: 30px;
    font-weight: 600;
    color: #9ed1d9;
`;