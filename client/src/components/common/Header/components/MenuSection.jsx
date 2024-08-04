import React from 'react';
import { MdMenu } from 'react-icons/md';
import styled from 'styled-components';

export default function MenuSection() {
  return (
    <StyledNav>
      <MenuWrapper>
        <MdMenu size="20" />
      </MenuWrapper>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  padding: 0 20px;
  flex: 1;
  font-size: 13px;

  @media screen and (max-width: 992px) {
    padding: 0;
    order: 0;
    flex: none;
    font-size: 17px;
  }
`;

const MenuWrapper = styled.label`
  margin: 0;
  display: none;
  cursor: pointer;

  @media screen and (max-width: 992px) {
    display: inherit !important;
    width: 54px;
    height: 20px;
    text-align: center;
  }
`;
