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

    const content_modify = () => {

    }

    return (<>
        <Header />
        <PostPage>
            <PostContainer>
                <ImageDetail />
                {(sign === data.user_id) && <ul>
                    <li><StyledButton width="110%" height="40px" text="delete" onClick={content_delete} /></li>
                    <li><StyledButton width="110%" height="40px" text="modify" onClick={content_modify} /></li>
                </ul>}
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
    padding: 8%;
    border: solid 2px #ececee;
    border-radius: 5px;
`;