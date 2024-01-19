import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SearchBox from "../SearchBox";
import ImageContainer from "../ImageContainer";
import LinkButton from "../LinkButton";
import Logo from "../Logo";

import { FaRegUser } from "react-icons/fa6";

export default function DesktopHeader() {
  const [sign, setSign] = useState(null);
  const [profiledata, setProfileData] = useState({
    profilename: "Anonymous.png",
    nickname: "Anonymous",
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
      window.addEventListener('resize', () => {setScreenWidth(window.innerWidth)});
  });
  
  useEffect(() => {
      setScreenWidth(window.innerWidth);
  }, []);

  return (
    <Header id='header' sign={sign}>
      <HeaderMenuSection>
        <MenuBox>
          <Logo />
          {scroll === false ? <div /> : <SearchBox width="450px" height="30px" />}
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
                <LoginResisterBox>
                  { screenWidth > 1400 ? (
                    <>
                  <LoginLink href="/sign_in">
                    로그인
                  </LoginLink>
                  <ResisterLink href="/sign_up">
                    가입하기
                  </ResisterLink>
                  </>
                  ) : (
                  <UserLink href='/sign_in'>
                    <FaRegUser fill='#000' size='16'/>
                  </UserLink>
                  )}
                </LoginResisterBox>
              </NotConnectedBox>
            </LoginBox>
          ) : (
            <LinkButton onClick={signOut} text="Sign out" />
          )}
        </MenuBox>
      </HeaderMenuSection>
    </Header>
  );
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const HeaderMenuSection = styled.section`
  padding: 0 20px;
  height: 54px;
  background-color: #9ed1d9;
`;

const MenuBox = styled.div`
  margin: 0;
  height: 100% !important;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const LoginBox = styled.div`
  margin-left: auto;
  min-width: 50px;
  font-size: 13px;
`;

const NotConnectedBox = styled.div`
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
    background: hsla(0, 0%, 100%, .1);
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

const MenuList = styled.ul`
  display: flex;
  gap: 3vw;
`;


