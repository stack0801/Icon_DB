import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MdLogout } from 'react-icons/md';
import { FaDownload, FaRegThumbsUp, FaHeart } from 'react-icons/fa6';

import Avatar from '@_assets/images/noimage.png';

import { useAuth } from '@_hooks/useAuth';
import { signOutUser } from '@_utils/signOutUser';

import UserModalItem from './UserModalItem';

const LINKS = {
  DOWNLOADS: '/profile/my_downloads',
  LIKES: '/profile/my_likes',
  FOLLOWS: '/profile/my_follows',
};

export default function UserModal({ isModalOpen }) {
  const { profiledata } = useAuth();

  return (
    <ModalBox style={{ display: isModalOpen ? 'block' : 'none' }}>
      <ModalUserTop>
        <AvatarHolder>
          <img src={Avatar} alt="noimage" />
        </AvatarHolder>
        <UserData>
          <span>{profiledata.nickName}</span>
          <EditProfileLink href="/profile/me">프로필 수정하기</EditProfileLink>
        </UserData>
      </ModalUserTop>
      <UserList>
        <UserModalItem
          icon={<FaDownload />}
          text="다운로드"
          href={LINKS.DOWNLOADS}
        />
        <UserModalItem
          icon={<FaRegThumbsUp />}
          text="좋아요"
          href={LINKS.LIKES}
        />
        <UserModalItem icon={<FaHeart />} text="팔로우" href={LINKS.FOLLOWS} />
      </UserList>
      <Driver />
      <UserList>
        <UserModalItem
          onClick={signOutUser}
          icon={<MdLogout />}
          text="로그아웃"
          href="/"
        />
      </UserList>
    </ModalBox>
  );
}

const popover = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalBox = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50px;
  right: 0;
  width: 360px;
  max-width: 620px;
  border: 1px solid #e9eaec;
  border-radius: 3px;
  background: #fff;
  color: #5f7d95;
  line-height: 1.5;
  overflow: visible;
  box-shadow: 1px 1px 3px rgba(34, 34, 34, 0.2);
  animation: ${popover} 0.2s ease-in-out;
  z-index: 9;

  ::before {
    content: '';
    position: absolute;
    top: -0.45em;
    right: 0.97em;
    width: 0;
    height: 0;
    display: block;
    border-right: 10px solid rgba(0, 0, 0, 0);
    border-left: 10px solid rgba(0, 0, 0, 0);
    border-bottom: 10px solid #999;
    font-size: 1.4em;
    pointer-events: none;
  }

  ::after {
    content: '';
    position: absolute;
    top: -0.45em;
    right: 0.9em;
    width: 0;
    height: 0;
    display: block;
    border-right: 12px solid rgba(0, 0, 0, 0);
    border-left: 12px solid rgba(0, 0, 0, 0);
    border-bottom: 12px solid #fff;
    font-size: 1.4em;
    pointer-events: none;
  }
`;

const ModalUserTop = styled.div`
  padding: 16px;
  border-bottom: 1px solid #cfd9e0;

  ::after {
    content: '';
    clear: both;
    display: table;
  }
`;

const AvatarHolder = styled.div`
  float: left;
  margin-right: 10px;
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  overflow: hidden;
`;

const UserData = styled.div`
  float: left;
  width: 180px;

  span {
    margin-bottom: 10px;
    max-width: 100%;
    display: block;
    color: #4a4a4a;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
`;

const EditProfileLink = styled.a`
  height: 22px;
  line-height: 22px;
  padding: 0 8px;
  font-size: 10px;
  background-color: #f5a282;
  color: #fff !important;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  appearance: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  display: inline-block;
  font-weight: bold;
  text-decoration: none;

  :hover {
    background-color: #f28962;
  }
`;

const UserList = styled.ul`
  padding-left: 0;
  padding-right: 0;
  padding: 10px;
`;

const Driver = styled.hr`
  margin: 0;
  width: 100%;
  height: 0;
  background-color: #e3e9ed;
  border-bottom: 1px solid #e9eaec;
  border-left: none;
  border-right: none;
  border-top: none;
  box-sizing: content-box;
`;
