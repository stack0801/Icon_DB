import React from "react";
import styled from "styled-components";
import Header from "../component/Header/Header";
import ProfileContainer from "../component/EditProfilePage/EditProfileContainer";

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
    top: 55px;
    width: 100vw;
    height: 93vh;
    
    display: grid;
    place-items: center;
    place-content: center;
`;
