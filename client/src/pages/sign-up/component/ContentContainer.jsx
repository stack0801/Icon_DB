import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Logo from "@_components/Logo";
import Input from "@_components/Input";
import Button from "@_components/ui/Button";

export default function Content() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onNameHandler = (e) => { setName(e.currentTarget.value) }
    const onIdHandler = (e) => { setId(e.currentTarget.value) }
    const onPasswordHandler = (e) => { setPassword(e.currentTarget.value) }
    const onKeyPress = (e) => { if (e.key === 'Enter') onSubmit() }

    const onSubmit = () => {
        if (id && password && name) {
            axios.post('/sign_up', {
                name: name,
                id: id,
                pw: password
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data === 'success') {
                        window.location.href = '/'
                    } else if (res.data === 'fail') {
                        alert("다른 아이디를 입력해주세요!");
                    }
                })
        } else {
            alert("입력 칸을 알맞게 입력해주십시오.");
        }
    };

    return (
        <ContentContainer>
        <ContentBox>
          <LogoBox>
            <Logo />
          </LogoBox>
          <MainBox>
            <h5>계정을 만드세요</h5>
            <LoginBox>
              <LoginForm>
              <FormItem>
                  <label>
                    닉네임
                    <Input
                      type="text"
                      name="name"
                      width="100%"
                      onChange={onNameHandler}
                    />
                  </label>
                </FormItem>
                <FormItem>
                  <label>
                    아이디
                    <Input
                      type="text"
                      name="id"
                      width="100%"
                      onChange={onIdHandler}
                    />
                  </label>
                </FormItem>
                <FormItem>
                  <label>
                    비밀번호
                    <Input
                      type="password"
                      name="password"
                      width="100%"
                      onChange={onPasswordHandler}
                    />
                  </label>
                </FormItem>
                <Button width="100%" text="가입하기" onClick={onSubmit} />
              </LoginForm>
            </LoginBox>
            <NoAccountBox>
              <p>
                이미 계정이 있습니까?
                <ToSignupLink to="/sign_in"> 로그인</ToSignupLink>
              </p>
            </NoAccountBox>
          </MainBox>
          <IcondbBox />
        </ContentBox>
      </ContentContainer>
    )
}

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

const MainBox = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 2rem;
  }

  > div {
    width: 100%;
  }

  h5 {
    color: #424242;
    font-size: 1.3125rem;
    font-weight: 600;
  }
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  align-items: initial;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const FormItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0;
    color: #777;
    font-size: 0.8125rem;
    font-weight: 600;

    input {
      margin-top: 5px;
      font-size: 0.8125rem;
    }
  }
`;
const NoAccountBox = styled.div`
  width: 100%;

  p {
    font-size: 0.8125rem;
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
