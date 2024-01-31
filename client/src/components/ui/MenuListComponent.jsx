import React from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

import { FaRegUser, FaDownload, FaRegThumbsUp, FaHeart } from "react-icons/fa6";

export default function MenuListComponent() {
  const location = useLocation();
  const isMeActive = location.pathname.endsWith("/me");
  const isDownloadActive = location.pathname.endsWith("/my_downloads");
  

  return (
          <MenuList>
            <li>
              <MenuLink href="/profile/me" className={isMeActive ? "active" : ""}>
                <FaRegUser />
                <span> 프로필</span>
              </MenuLink>
            </li>
            <li>
              <MenuLink href="/profile/my_downloads" className={isDownloadActive ? "active" : ""}>
                <FaDownload />
                <span> 다운로드</span>
              </MenuLink>
            </li>
            <li>
              <MenuLink href="">
                <FaRegThumbsUp />
                <span> 좋아요</span>
              </MenuLink>
            </li>
            <li>
              <MenuLink href="">
                <FaHeart />
                <span> 팔로우</span>
              </MenuLink>
            </li>
          </MenuList>
  );
}

const MenuList = styled.ul`
  display: flex;
  border-radius: 4px;
  font-size: 0;
  overflow: hidden;
  transition: all 0.5s;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2), 0px 0px 1px 0px rgba(0, 0, 0, 0.2);

  li {
    position: relative;
    flex: 1;
    overflow: hidden;

    &:first-child a {
      border-radius: 4px 0 0 4px;
    }

    a.active {
      border-bottom: none;
      background-color: #fff;
      color: #333;
    }

    a::before {
      margin-right: 0.5em;
    }
  }
`;

const MenuLink = styled.a`
  font-size: 14px;
  display: block;
  padding: 1em;
  text-align: center;
  border-right: 1px solid #d5d5d5;
  background-color: #e5e5e5;
  color: #939393;

  :hover {
    color: #333;
  }
`;