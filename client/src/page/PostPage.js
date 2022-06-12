import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../component/Header/Header";
import ImageDetail from "../component/ImageDetail"
import StyledButton from "../component/StyledButton"
import StyledInput from "../component/StyledInput"
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

<<<<<<< HEAD
    const content_modify = () => {

=======
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
>>>>>>> 2001ae4cde1dd8da7bd3c12e608795b13ae40838
    }

    return (<>
        <Header />
        <PostPage>
<<<<<<< HEAD
            <PostContainer>
                <ImageDetail />
                {(sign === data.user_id) && <ul>
                    <li><StyledButton width="110%" height="40px" text="delete" onClick={content_delete} /></li>
                    <li><StyledButton width="110%" height="40px" text="modify" onClick={content_modify} /></li>
                </ul>}
            </PostContainer>
=======
           <ImageDetail/>
           {(sign === data.user_id) && <>
                <StyledButton width = "50%" text = "delete" onClick = {content_delete}/>
                <StyledButton width = "50%" text = "update" onClick = {content_update}/>
                <StyledInput width = "95%" placeholder = "MESSAGE" onChange = {onMassageHandler}/>
           </>}
>>>>>>> 2001ae4cde1dd8da7bd3c12e608795b13ae40838
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
    padding: 8%;
    border: solid 2px #ececee;
    border-radius: 5px;
`;