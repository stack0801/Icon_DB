import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import StyledInput from "../component/StyledInput";
import StyledButton from "../component/StyledButton";
import Header from "../component/Header/Header";
import axios from 'axios';

export default function App() {
    const [userdata, setUserData] = useState({});
    const [sign, setSign] = useState(null);

    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                console.log(res.data)
            })
        axios({
            method: 'post',
            url: '/get_user'
        })
            .then((res) => {
                setUserData(res.data[0]);
                console.log(res.data[0]);
            })
    }, []);

    const user_update = () => {

    }
    return (<>
        <Header />
        <UserPage>
            <ListContainer>
                <LikeList>LikeList</LikeList>
            </ListContainer>
            <UserContainer>
                <StyledInput width="70%" height="60px" placeholder={userdata.nickname} />
                <StyledInput width="70%" height="60px" placeholder={userdata.id} />
                <StyledInput width="70%" height="60px" placeholder={userdata.password} />
                {(sign === userdata.id) &&
                    <StyledButton width="75%" height="60px" text="Update" onClick={user_update} />
                }
            </UserContainer>
        </UserPage>
    </>);
}
const UserPage = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 3.5fr;
    place-items: center;
    place-content: center;
`;

const ListContainer = styled.div`
    margin-top: 80px;
    width: 100%;
    heigth: 100vh;
    display: grid;
`;

const UserContainer = styled.div`
    margin-top: 80px;
    width: 70%;
    height: 40vh;
    display: grid;
    place-items: center;
    border: solid 2px #ececec;
    border-radius: 5px;
`;

const LikeList = styled.a`
    width:100%;
    color: black;
    display:grid;
    transition-duration:0.3s;
    cursor: pointer;
    &:hover {
        color:white;
    }
    &:active{
        color:#f5a282;
    }
`;