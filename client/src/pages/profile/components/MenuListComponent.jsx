import React from "react";
import styled from "styled-components";

export default function MenuListComponent() {

  return (
          <MenuList>
            <li>
              <MenuLink href="">
                <span>프로필</span>
              </MenuLink>
            </li>
            <li>
              <MenuLink href="">
                <span>다운로드</span>
              </MenuLink>
            </li>
            <li>
              <MenuLink href="">
                <span>좋아요</span>
              </MenuLink>
            </li>
            <li>
              <MenuLink href="">
                <span>팔로우</span>
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
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2), 0px 0px 1px 0px rgba(0, 0, 00.2);

  li {
    position: relative;
    flex: 1;
    overflow: hidden;

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

  ::before {
    content: "";
  }
`;