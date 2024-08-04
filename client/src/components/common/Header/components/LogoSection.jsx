import React from 'react';
import styled from 'styled-components';

import logo from '@_assets/brand/logo.svg';

export default function LogoSection() {
  return (
    <LogoLink href="/">
      <LogoImage src={logo} title="ICONDB 로고" alt="ICONDB logo" />
    </LogoLink>
  );
}

const LogoLink = styled.a`
  @media screen and (max-width: 992px) {
    order: 1;
    width: 125px;
    margin-left: auto;
    margin-right: auto;
  }  
`;

const LogoImage = styled.img`
  display: block;
`;
