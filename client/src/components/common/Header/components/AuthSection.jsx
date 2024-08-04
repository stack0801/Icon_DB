import React from 'react';
import { FaRegUser } from 'react-icons/fa6';
import styled from 'styled-components';

import { useWindowSize } from '@_hooks/useWindowSize';

const LINKS = {
  LOGIN: '/sign_in',
  RESISTER: '/sign_up',
};

export default function AuthSection() {
  const { width: screenWidth } = useWindowSize();

  return (
    <StyledContainer>
      {screenWidth > 1400 ? (
        <StyledWrapper>
          <LoginLink href={LINKS.LOGIN}>로그인</LoginLink>
          <ResisterLink href={LINKS.RESISTER}>가입하기</ResisterLink>
        </StyledWrapper>
      ) : (
          <UserLink href={LINKS.LOGIN}>
            <FaRegUser fill="#fff" size="20" />
          </UserLink>
      )}
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

const MobileWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: flex-start;

  @media screen and (min-width: 992px) {
    height: 36px;
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

const UserLink = styled.a`
  display: flex;

  @media screen and (min-width: 1400px) {
    display: none;
  }
`;
