import React from "react";
import styled from "styled-components";
import ProfileContainer from "../component/ProfileContainer";
import Header from "../component/Header/Header";

export default function App() {
    return (<>
        <Header />
        <ProfilePage>
            <EditProfile>Edit Your Profile</EditProfile>
            <ProfileContainer />
        </ProfilePage>
    </>);
}
const ProfilePage = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    place-content: center;
`;

const EditProfile = styled.h1`
    color: #f5a282;
`;