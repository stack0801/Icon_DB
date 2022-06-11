import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../component/Header/Header";
import ImageDetail from "../component/ImageDetail"
import StyledButton from "../component/StyledButton"
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

    return (<>
        <Header/>
        <PostPage>
           <ImageDetail/>
           {(sign === data.user_id) && 
           <StyledButton width = "50%" text = "delete" onClick = {content_delete}/>}
        </PostPage>
    </>)
}

const PostPage = styled.div`
    margin: auto auto;
    width: 1024px;
    display: grid;
    padding: 8%;
    gap: 5px;
    border: solid 2px #9ed1d9;
    border-radius: 5px;
`;