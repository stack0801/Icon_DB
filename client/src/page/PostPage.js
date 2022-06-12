import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../component/Header/Header";
import ImageDetail from "../component/ImageDetail"
import StyledButton from "../component/StyledButton"
import StyledInput from "../component/StyledInput"
import TitleImgUpload from "../component/PostingImage";
import axios from 'axios';

export default function App() {

    // 유저 로그인 여부
    let { id } = useParams();
    const [data, setData] = useState({});
    const [sign, setSign] = useState(null);
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                console.log(res.data)
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
                console.log(res.data[0].user_id);
            })
    }, []);

    const content_delete = () => {
        axios.post('/content_delete', {
            content_id: id
        })
            .then((res) => {
                console.log(res)
                window.location.href = '/';
            })
    }

    const [message, setMessage] = useState("");
    const onMassageHandler = (event) => { setMessage(event.currentTarget.value); }

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

    return (<>
        <Header />
        <PostPage>
            <PostContainer>
                <ImageDetail />
                {(sign === data.user_id) && <UserContainer>
                    <StyledInput width="95%" placeholder="MESSAGE" onChange={onMassageHandler} />
                    <StyledButton width="50%" text="Delete" onClick={content_delete} />
                    <StyledButton width="50%" text="Update" onClick={content_update} />
                </UserContainer>}
            </PostContainer>
        </PostPage>
    </>)
}

const PostPage = styled.div`
    height: 80vh;
    display: grid;
    place-items: center;
    place-content: center;
`;

const PostContainer = styled.div`
    width: 80vw;
    display: grid;
    place-items: center;
    place-content: center;
    padding: 5%;
    border: solid 2px #ececee;
    border-radius: 5px;
`;

const UserContainer = styled.div`
    display: grid;
    place-items: center;
    gap: 15px;
`;