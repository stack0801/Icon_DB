import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import ModalBoxComponent from "./components/ModalBoxComponent";

import SearchBox from "../../../SearchBox";
import ImageContainer from "../../../ImageContainer";
import LinkButton from "../../../LinkButton";
import Logo from "../../../Logo";

import Avatar from "@_assets/images/noimage.png";

import { FaRegUser } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";

export default function DesktopHeader() {
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

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 500) setScroll(true);
    else setScroll(false);
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

  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Header id="header" sign={sign} isHome={isHome}>
      <HeaderMenuSection>
        <MenuBox>
          <LogoLink href="/">
            <Logo />
          </LogoLink>
          <Nav>
            <MenuToggle>
              <div>
                <MdMenu size="20" />
              </div>
            </MenuToggle>
          </Nav>
          {scroll === false ? (
            <div />
          ) : (
            <SearchBox width="450px" height="30px" />
          )}
          {/* <MenuList>
          <li>
            <a href="/posting">
              <LinkButton color="#9ED1D9" text="Posting" />
            </a>
          </li>
          <li>
            <LinkButton text="Edit" onClick={openEditor} />
          </li>
          {sign !== null && (
            <li>
              <Link to={"/profile/" + sign}>
                <ImageContainer
                  src={
                    "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
                    profiledata.profilename
                  }
                  alt=""
                  width="45px"
                  height="45px"
                  borderRadius="50%"
                />
              </Link>
            </li>
          )}
        </MenuList> */}
          {sign === null ? (
            <LoginBox>
              <NotConnectedBox>
                  {screenWidth > 1400 ? (
                    <LoginResisterBox>
                      <LoginLink href="/sign_in">로그인</LoginLink>
                      <ResisterLink href="/sign_up">가입하기</ResisterLink>
                    </LoginResisterBox>
                  ) : (
                    <NotConnectedUserBox>
                    <UserLink href="/sign_in">
                      <FaRegUser fill="#000" size="16" />
                    </UserLink>
                    </NotConnectedUserBox>
                  )}
              </NotConnectedBox>
            </LoginBox>
          ) : (
            <UserBox>
              <AvatarBox onClick={handleAvatarButtonClick}>
                <AvatarButton>
                  <img src={Avatar} alt="noimage" />
                </AvatarButton>
                {isModalOpen && <ModalBoxComponent isModalOpen={isModalOpen} />}
              </AvatarBox>
            </UserBox>
          )}
        </MenuBox>
      </HeaderMenuSection>
    </Header>
  );
}

const Header = styled.header`
  position: ${({ isHome }) => (isHome ? "fixed" : "static")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 14;
  display: block;
`;

const HeaderMenuSection = styled.section`
  padding: 0 20px;
  height: 54px;
  background-color: #b3b3b3;

  @media screen and (max-width: 992px) {
    padding: 0;
  }
`;

const MenuBox = styled.div`
  margin: 0;
  height: 100% !important;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const LogoLink = styled.a`
  @media screen and (max-width: 992px) {
    order: 1;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Nav = styled.nav`
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

const MenuToggle = styled.label`
  margin: 0;
  display: none;
  cursor: pointer;

  @media screen and (max-width: 992px) {
    display: inherit !important;
  }

  div {
    width: 54px;
    height: 20px;
    text-align: center;
  }
`;

const LoginBox = styled.div`
  margin-left: auto;
  min-width: 50px;
  font-size: 13px;

  @media screen and (max-width: 992px) {
    order: 2;
    margin-left: 0 !important;
  }
`;

const NotConnectedBox = styled.div`
  margin: 0;
  min-width: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: 992px) {
    height: 36px;
  }
`;

const NotConnectedUserBox =styled.div`
  align-self: center;
`;

const LoginResisterBox = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const LoginLink = styled.a`
  margin-right: 20px;
  font-weight: 600;
  background-color: transparent;
  color: #000;
`;

const ResisterLink = styled.a`
  padding: 0 20px;
  position: relative;
  min-width: 34px;
  height: 34px;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: inset 0 0 0 2px #000;
  color: #000;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  line-height: 34px;
  text-align: center;
  text-decoration: none;
  transition: none;
  cursor: pointer;

  :hover {
    background: hsla(0, 0%, 100%, 0.1);
  }

  ::after {
    display: table;
    clear: both;
    content: "";
  }
`;

const UserLink = styled.a`
  display: block;
  cursor: pointer;

  @media screen and (min-width: 1400px) {
    display: none;
  }
`;

const UserBox = styled.div`
  margin-left: auto;
  font-size: 14px;

  ::after {
    transition: opacity 1ms cubic-bezier(1, 0, 0, 1);
    opacity: 0;
    content: "";
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
    content: "";
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
  display: block;
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
