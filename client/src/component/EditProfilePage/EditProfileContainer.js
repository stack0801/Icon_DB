import React from "react";
import styled from "styled-components";
import EditProfileWrapper from "./EditProfileWrapper";

export default function App() {
    return (<>
        <EditProfile>Edit Your Profile</EditProfile>
        <EditProfileContainer>
            <EditProfileWrapper />
        </EditProfileContainer>
    </>);
}

const EditProfileContainer = styled.div`
    position: absolute;
    top: 40px;
    display: grid;
    place-items: center;
    place-content: center;
`;

const EditProfile = styled.h1`
    display: grid;
    place-items: center;
    color: #f5a282;
`;