import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider, Button } from '@material-ui/core';
import { theme } from "../theme";
import axios from 'axios';

export default function App() {

    let { id } = useParams();
    const [data, setData] = useState({});
    const [liked, setLiked] = useState(false);

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
            })
        axios({
            method: 'post',
            url: '/check_liked',
            data: {
                content_id: id
            }
        })
            .then((res) => {
                console.log(res.data)
                if(res.data === 'Unliked')
                    setLiked(!liked)
            })
    }, []);

    const onLikedHandler = () => {
        axios({
            method: 'post',
            url: '/setLike',
            data: {
                content_id: id,
                liked: liked
            }
        })
        setLiked(!liked)
    };

    const url = () => {
        window.open('http://localhost:5000/download/' + data.filename)
    }

    return (
        <ImageDetail>
            <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.filename} alt="no_img" />
            <Title>
                <ThemeProvider theme={theme}>
                    {liked === false
                        ? <Button variant="outlined" color="secondary" onClick={onLikedHandler}>Like</Button>
                        : <Button variant="outlined" color="primary" onClick={onLikedHandler}>Liked!</Button>
                    }
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="secondary" onClick={url}>Download</Button>
                </ThemeProvider>
                <div>Title : {data.message}</div>
                <div>ID : {data.user_id}</div>
                <div>{data.date}</div>
            </Title>
        </ImageDetail>
    );
}

const ImageDetail = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-items: center;
    padding-bottom: 5%;
`;

const Title = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 0.1fr);
    gap: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #9ed1d9;
    place-content: center;
`;

