import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header/Header";
import ImageContainer from "../component/ImageContainer";
import axios from "axios"
import NoImg from "../img/NoImage.png";

export default function App() {
    const [profiledata, setProfileData] = useState({});
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
                setProfileData(res.data[0]);
                console.log(res.data[0]);
            })
    }, []);

    return (<>
        <Header />
        <UserPage>
            <ProfilePage>
                <ProfileWrapper>
                    <ImageContainer src={NoImg} alt="" width="60%" borderRadius="50%" />
                    <h1>{profiledata.nickname}</h1>
                    <EditButton href="editprofile">Edit Profile</EditButton>
                </ProfileWrapper>
            </ProfilePage>
            <FavoritePage>
                <div>favorite list</div>
            </FavoritePage>
        </UserPage>
    </>);
}

const UserPage = styled.div`
    position:absolute;
    top: 55px;
    width:100vw;
    height: 94vh;
    display: grid;
    grid-template-columns:1fr 3fr;
`;
const ProfilePage = styled.div` 
    display: grid;
    padding: 10%;
    border-right: solid 2px black;
`;

const ProfileWrapper = styled.div`
    height:40%;
    display: grid;
    place-items: center;
    padding: 5%
    border: solid 2px black;
`;

const EditButton = styled.a`
    background: #f5a282;
    color: #ececec;
    width: 80%;
    display: grid;
    place-items: center;
    font-size: 30px;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    transition-duration: 0.2s;
    &:hover {
        color: white;
    }
    &:active {
        background: #f28962;
    }
`;

const FavoritePage = styled(ProfilePage)`
border:none;
`;
