import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import Avatar from "@_assets/images/noimage.png";

import { MdLogout } from "react-icons/md";
import { FaDownload, FaRegThumbsUp, FaHeart } from "react-icons/fa6";

export default function ModalBoxComponent({ isModalOpen }) {
  const [sign, setSign] = useState(null);
  const [profiledata, setProfileData] = useState({
    profilename: "admin.png",
    nickname: "admin",
  });

  useEffect(() => {
    console.log(sign);
    axios.post("/get_auth").then((res) => {
      let data = res.data;
      setSign(data);
      axios
        .post("/get_profile", {
          user: data,
        })
        .then((res) => {
          setProfileData(res.data[0]);
        });
    });
  }, []);

  const signOut = () => {
    axios.post("/sign_out").then((res) => {
      console.log(res.data);
      if (res.data === "success") window.location.href = "/";
    });
  };

  //Editor Open
  const openEditor = () => {
    window.open(process.env.REACT_APP_URL + ":8000/src/editor/");
  };

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  });

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <ModalBox style={{ display: isModalOpen ? "block" : "none" }}>
      <ModalUserTop>
        <AvatarHolder>
          <img src={Avatar} alt="noimage" />
        </AvatarHolder>
        <UserData>
          <span>{profiledata.nickname}</span>
          <EditProfileLink href="/profile/me">프로필 수정하기</EditProfileLink>
        </UserData>
      </ModalUserTop>
      <UserList>
        <li>
          <DownloadsBox>
            <a href="/profile/my_downloads">
              <FaDownload />
              다운로드
            </a>
          </DownloadsBox>
        </li>
        <li>
          <DownloadsBox>
            <a href="/profile/my_downloads">
              <FaRegThumbsUp />
              좋아요
            </a>
          </DownloadsBox>
        </li>
        <li>
          <DownloadsBox>
            <a href="/profile/my_downloads">
              <FaHeart />
              팔로우
            </a>
          </DownloadsBox>
        </li>
      </UserList>
      <hr />
      <UserList>
        <li>
          <a href="/" onClick={signOut}>
            <MdLogout size="17" />
            <span>로그아웃</span>
          </a>
        </li>
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
    content: "";
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
    content: "";
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

  hr {
    margin: 0;
    width: 100%;
    height: 0;
    background-color: #e3e9ed;
    border-bottom: 1px solid #e9eaec;
    border-left: none;
    border-right: none;
    border-top: none;
    box-sizing: content-box;
  }
`;

const ModalUserTop = styled.div`
  padding: 16px;
  border-bottom: 1px solid #cfd9e0;

  ::after {
    content: "";
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

  li {
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

    > a {
      padding: 0 20px;
      height: 36px;
      display: flex;
      align-items: center;
      border: none;
      font-size: 14px;
      font-weight: 600;
    }

    svg {
      margin-right: 10px;
    }

    a {
      color: #0b2239;
    }
  }
`;

const DownloadsBox = styled.div`
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
      content: "";
      display: table;
    }
  }
`;
