import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '@_assets/brand/logo.svg';

export default function LogoSection() {
  return (
    <Link to="/">
      <LogoImage src={logo} alt="icondb logo" />
    </Link>
  );
}

const LogoImage = styled.img`
  margin-left: auto;
  margin-right: auto;
`;
