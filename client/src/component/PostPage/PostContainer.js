import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import StyledButton from "../../component/StyledButton";
import StyledInput from "../../component/StyledInput";
import { ThemeProvider, Button } from '@material-ui/core';
import { theme } from "../theme";
import axios from 'axios';

export default function App() {

    let { id } = useParams();

    // 유저 로그인 여부
    const [data, setData] = useState({});
    const [sign, setSign] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                console.log(res.data)
            })

        axios({
            method: 'post',
            url: '/check_liked',
            data: {
                content_id: id
            }
        })
            .then((res) => {
                if (res.data === 'Unliked')
                    setLiked(!liked)
            })

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
                if (res.data === 'Unliked')
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
            .then((res) => {
                setLiked(!liked)
            })
    };

    const [message, setMessage] = useState("");
    const onMassageHandler = (event) => { setMessage(event.currentTarget.value); }

    const content_delete = () => {
        axios.post('/content_delete', {
            content_id: id
        })
            .then((res) => {
                console.log(res)
                window.location.href = '/';
            })
    }

    const content_update = () => {
        axios.post('/content_update', {
            content_id: id,
            content_message: message,
            image: null
        })
            .then((res) => {
                console.log(res)
                window.location.href = '/';
            })
    }
    
    const url = () => {
        window.open(process.env.REACT_APP_URL + ':5000/download/' + data.filename)
    }

    return (
        <PostContainer>
            <ImageDetail>
                <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.filename} alt="no_img" width="600px" />
            </ImageDetail>

            <Title>
                <Information>
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
                </Information>

                {(sign === data.user_id) && <UserContainer>
                    <h1>Update</h1>
                    <StyledInput width="95%" placeholder="MESSAGE" onChange={onMassageHandler} />
                    <StyledButton width="50%" text="Delete" onClick={content_delete} />
                    <StyledButton width="50%" text="Update" onClick={content_update} />
                </UserContainer>}
            </Title>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-items: center;
    place-content: center;
`;

const ImageDetail = styled.div`
    display: grid;
    place-items: center;
`;

const Title = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    font-size: 16px;
    font-weight: 600;
    color: #9ed1d9;
    place-content: center;
    place-items: center;
`;
const Information = styled.div`
    display: grid;
    place-content: center;
    gap: 15px;
`;
const UserContainer = styled.div`
    display: grid;
    place-items: center;
    place-content: center;
    gap: 15px;
`;