import React from 'react';
import styled from 'styled-components';

export default function UserModalItem({ href, text, icon, onClick }) {
  return (
    <StyledUserModalItem>
      <UserWrapper>
        <UserLink href={href} onClick={onClick}>
          {icon}
          {text}
        </UserLink>
      </UserWrapper>
    </StyledUserModalItem>
  );
}

const StyledUserModalItem = styled.li`
  position: relative;

  :first-child {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  :last-child {
    border: none;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
`;

const UserWrapper = styled.div`
  margin: 0;
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  a {
    font-weight: bold;
    padding: 0.5em 0;

    ::after {
      clear: both;
      content: '';
      display: table;
    }
  }
`;

const UserLink = styled.a`
  padding: 0 20px;
  height: 36px;
  display: flex;
  align-items: center;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #0b2239;

  svg {
    margin-right: 10px;
  }
`;
