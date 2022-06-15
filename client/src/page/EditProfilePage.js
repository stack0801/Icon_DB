import React from "react";
import styled from "styled-components";
import ProfileContainer from "../component/EditProfilePage/EditProfileContainer";
import Header from "../component/Header/Header";

export default function App() {
    return (<>
        <Header />
        <EditProfilePage>
            <ProfileContainer />
        </EditProfilePage>
    </>);
}
const EditProfilePage = styled.div`
    position: absolute;
    top: 40px;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    place-content: center;
`;
