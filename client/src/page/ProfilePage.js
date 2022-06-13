import React from "react";
import styled from "styled-components";
import ProfileContainer from "../component/ProfileContainer";
import Header from "../component/Header/Header";

export default function App() {
    return (<>
        <Header />
        <ProfilePage>
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
