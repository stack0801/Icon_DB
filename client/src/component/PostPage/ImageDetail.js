import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider, Button } from '@material-ui/core';
import { theme } from "../theme";
import { FavoriteBorderIcon } from '@mui/icons-material';
import axios from 'axios';

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
            })
    }, []);

    const [liked, setLiked] = useState(false);

    const onLikedHandler = () => {
        setLiked(!liked)
    };

    const url = () => {
        window.open('http://localhost:5000/download/' + data.filename)
    }

    return (
        <ImageDetail>
            <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.filename} alt="no_img" />
            <div />
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
                Title : {data.message}
                <div>ID : {data.user_id}</div>
                <div>Date : {data.date}</div>
            </Title>
        </ImageDetail>
    );
}

const ImageDetail = styled.div`
    display: grid;
    grid-template-columns: 2fr 0.3fr 1fr;
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

