import React from "react";
import styled from "styled-components";

import TextSection from "./TextSection";
import Uploader from "./Uploader";

export default function UploadSectionComponent() {
    return (
        <UploadSection>
            <UploadContainer>
            <Title>Upload your icon</Title>
            <TextSection />
            <hr />
            <Uploader />
            </UploadContainer>
            <ButtonContainer>
                <ButtonBox>
                    <div className="push-right">
                        <ButtonBox>
                            <UploadButton>
                                <span>Upload</span>
                            </UploadButton>
                        </ButtonBox>
                    </div>
                </ButtonBox>
            </ButtonContainer>
        </UploadSection>
    );
}

const UploadSection = styled.section`
    margin: 0 0 30px;
    padding-bottom: 30px !important;

    hr {
        margin: 20px;
        margin-left: 0;
        margin-right: 0;
        width: 100% !important;
        height: 1px;
        border: none;
        outline: none;
        background-color: #e3e9ed;
    }
`;

const UploadContainer = styled.div`
    padding: 0 20px;
`;

const Title = styled.h6`
    margin-top: 0;
    margin-bottom: 5px;
    color: #374957;
    font-weight: 500;
    line-height: 1.6;

    @media screen and (min-width: 480px){
        font-size: calc(20px + (600vw - 2880px)/920);
    }
`;

const ButtonContainer = styled.div`
    padding: 10px;
`;

const ButtonBox = styled.div`
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .push-right {
        margin-left: auto;
    }
`;

const UploadButton = styled.div`
    margin-left: 10px !important;
    padding: 0 1.4em;
    position: relative;
    height: 44px;
    display: inline-block;
    border-radius: 3px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 44px;
    box-shadow: inset 0 0 0 100px #9ed1d9;
    cursor: pointer;
`;