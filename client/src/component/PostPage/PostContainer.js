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
    let url_id = id;

    const [data, setData] = useState({});
    const [sign, setSign] = useState(null);
    const [liked, setLiked] = useState(false);
    const [isMobile, setisMobile] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        axios.post('/get_auth')
        .then((res) => {
            setSign(res.data)
            if(res.data) {
                axios.post('/check_liked', {
                    content_id: url_id
                })
                .then((res) => {
                    setLiked((res.data === 'liked'))
                })
            }
        })

        resizingHandler();        
        window.addEventListener("resize", resizingHandler);
        return () => { window.removeEventListener("resize", resizingHandler);};
    }, [url_id]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/get_content',
            data: {
                content_id: url_id
            }
        })
        .then((res) => {
            setData(res.data[0]);
            setLikes(res.data[0].like)
        })
    }, [url_id]);

    const resizingHandler = () => { setisMobile(window.innerWidth <= 600);};

    useEffect(() => {
        resizingHandler();        
        window.addEventListener("resize", resizingHandler);
        return () => { window.removeEventListener("resize", resizingHandler);};
    }, []);

    const onLikedHandler = () => {
        if(sign === null) {
            alert("로그인 후 사용 가능한 서비스 입니다.");
            window.location.href = '/sign_in';
        }
        else {
            axios({
                method: 'post',
                url: '/setLike',
                data: {
                    content_id: url_id,
                }
            })
            .then((res) => {
                setLiked(res.data)
                axios({
                    method: 'post',
                    url: '/get_content',
                    data: {
                        content_id: url_id
                    }
                })
                .then((res) => {
                    setLikes(res.data[0].like)
                })
            })
        }
    };

    const [message, setMessage] = useState("");
    const onMassageHandler = (event) => { setMessage(event.currentTarget.value); }

    const content_delete = () => {
        axios.post('/content_delete', {
            content_id: url_id
        })
        .then((res) => {
            console.log(res)
            window.location.href = '/';
        })
    }

    const content_update = () => {
        axios.post('/content_update', {
            content_id: url_id,
            content_message: message,
            image: null
        })
        .then((res) => {
            console.log(res)
            window.location.href = '/';
        })
    }
    
    const downloadUrl = () => {
        window.open(process.env.REACT_APP_URL + ':5000/download/' + data.filename)
    }

    return (
        <PostContainer columns = {isMobile ? "1fr" : "1fr 300px"}>
            <ImageDetail>
                <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.filename} alt="no_img" width="50%"/>
            </ImageDetail>

            <Title>
                <Information>
                    <div>Comment : {data.message}</div>
                    <div>ID : {data.user_id}</div>
                    <div>{data.date}</div>
                    <div>{likes} likes</div>
                    <ThemeProvider theme={theme}>
                        {liked ? 
                            <Button variant="outlined" color="primary" onClick={onLikedHandler}>Liked!</Button> :
                            <Button variant="outlined" color="secondary" onClick={onLikedHandler}>Like</Button>
                        }
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button variant="outlined" color="secondary" onClick={downloadUrl}>Download</Button>
                    </ThemeProvider>
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

    padding-top: 55px;

    width: 95vw;
    height: 90vh;

    display: grid;
    grid-template-columns: ${(props) => (props.columns || "1fr")};
`;

const ImageDetail = styled.div`
    display: grid;
    place-items: center;
`;

const Title = styled.div`

    border-left: 1px solid #dddddd;
    border-top: 1px solid #dddddd;

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