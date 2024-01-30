import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Logo from "@_components/Logo";
import StyledInput from "@_components/StyledInput";
import StyledButton from "@_components/StyledButton";
import GoogleButton from "@_components/ui/GoogleButton";

export default function Content() {
    //ID, 비밀번호
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => { setId(event.currentTarget.value); }
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value); }
    const onKeyPress = (e) => { if (e.key === 'Enter') onSubmit() }

    const onSubmit = () => {
        if (id && password) {
            axios.post('/sign_in', {
                id: id,
                pw: password
            })
                .then((res) => {
                    if (res.data === "success")
                        window.location.href = '/';
                    else //로그인 실패할 시 Error
                        alert("아이디와 비밀번호를 확인해 주십시오.");
                })
        } else {
            alert("아이디와 비밀번호를 확인해 주십시오.");
        }
    }

    return (
        <ContentContainer>
            <ContentBox>
                <LogoBox>
                    <Logo />
                </LogoBox>
                <HeadingBox>
                    <h5>로그인</h5>
                </HeadingBox>
                <LoginBox>
                    <StyledInput width="100%" placeholder="ID" onChange={onIdHandler} />
                    <StyledInput width="100%" placeholder="Password" type="password" onChange={onPasswordHandler} onKeyPress={onKeyPress} />
                    <StyledButton width="100%" text="로그인" onClick={onSubmit} />
                    <GoogleButton />
                </LoginBox>
                <NoAccountBox>
                    <p>
                        계정이 없습니까?
                        <ToSignupLink to="/sign_up"> 가입하기</ToSignupLink>
                    </p>
                </NoAccountBox>
                <IcondbBox />
            </ContentBox>
        </ContentContainer>
    );
};

const ContentContainer = styled.div`
    padding: 40px 20px;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;

    @media only screen and (min-width: 768px) {
        padding-left: 40px;
        padding-right: 40px;
    }

    @media only screen and (min-width: 992px) {
        padding-left: 80px;
        padding-right: 80px;
        width: 480px;
    }
`;

const ContentBox = styled.div`
    padding-top: 20px;
    position: relative;
    width: 320px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > * {
        width: 100%;
    }
`;

const LogoBox = styled.div`
    margin-top: 50px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 992px) {
        margin-bottom: 70px !important;
    }
`;

const HeadingBox = styled.div`
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h5 {
        margin-bottom: 2rem;
        font-size: 1.3125rem;
        font-weight: 600;
    }
`;

const LoginBox = styled.div`
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const NoAccountBox = styled.div`
    width: 100%;

    p {
        font-size: .8125rem;
        font-weight: 600;
        text-align: center;
    }
`;

const ToSignupLink = styled(Link)`
    font-weight: 700;
    color: #9ed1d9;
`;

const IcondbBox = styled.div`
    margin-top: auto;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    visibility: hidden;
    opacity: 0;
`;