import React from "react";
import styled from "styled-components";
import ProfileContainer from "../component/ProfileContainer";
import Header from "../component/Header/Header";

export default function App() {
    return (<>
        <Header />
        <UserPage>
            <h1>Edit Your Profile</h1>
            <ProfileContainer/>
        </UserPage>
    </>);
}
const UserPage = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    place-content: center;
`;