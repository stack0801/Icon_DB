import React from 'react';
import styled from "styled-components";
import ImageListWrapper from "./ImageListWrapper";

export default function Main() {
    return (
        <LandingContainer>
            <ImageListWrapper/>
        </LandingContainer>
    );
}

const LandingContainer = styled.div`
    postion:absolute;
`;