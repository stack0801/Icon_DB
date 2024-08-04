import React from 'react';
import styled from 'styled-components';

export default function AuthSection() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <LoginLink href="/sign_in">로그인</LoginLink>
        <ResisterLink href="/sign_up">가입하기</ResisterLink>
      </StyledWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  align-self: center;
`;

const StyledWrapper = styled.div`
  margin: 0;
  display: none;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 1400px) {
    display: flex;
  }
`;

const LoginLink = styled.a`
  font-weight: 600;
  margin-right: 20px;
  color: #fff;
`;

const ResisterLink = styled.a`
  position: relative;
  padding: 0 20px;
  min-width: 34px;
  height: 34px;
  display: inline-flex !important;
  align-items: center;
  background: transparent;
  box-shadow: inset 0 0 0 2px #fff;
  color: #fff;
  border-radius: 6px;
  transition: none;
`;
