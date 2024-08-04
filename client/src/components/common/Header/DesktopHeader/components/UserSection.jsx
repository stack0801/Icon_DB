import React from 'react';
import styled from 'styled-components';

import ModalBoxComponent from '../../components/ModalBoxComponent';

function UserSection({ avatar, handleAvatarButtonClick, isModalOpen, isDetail }) {
  return (
    <UserBox>
      <AvatarBox onClick={handleAvatarButtonClick}>
        <AvatarButton>
          <img src={avatar} alt="user avatar" />
        </AvatarButton>
        {isModalOpen && (
          <ModalBoxComponent isModalOpen={isModalOpen} isDetail={isDetail} />
        )}
      </AvatarBox>
    </UserBox>
  );
}

export default UserSection;

const UserBox = styled.div`
  margin-left: auto;
  font-size: 14px;

  ::after {
    transition: opacity 1ms cubic-bezier(1, 0, 0, 1);
    opacity: 0;
    content: '';
  }
`;

const AvatarBox = styled.div`
  padding-right: 14px;
  position: relative;
  line-height: 1.5;
  z-index: 4;

  ::before {
    position: absolute;
    top: 50%;
    right: 2px;
    width: 0;
    height: 0;
    border-left: 4px solid rgba(0, 0, 0, 0);
    border-right: 4px solid rgba(0, 0, 0, 0);
    border-top: 4px solid #fff;
    transform: translateY(-50%);
    content: '';
  }
`;

const AvatarButton = styled.button`
  padding: 0;
  position: relative;
  width: 36px;
  height: 36px;
  border: none;
  outline: none;
  background: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  img {
    border-radius: 50%;
  }
`;
