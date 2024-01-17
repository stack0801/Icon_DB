import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SearchBox from "../SearchBox";
import ImageContainer from "../ImageContainer";
import LinkButton from "../LinkButton";
import Logo from "../Logo";

export default function App() {
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

  return (
    <Page sign={sign}>
      <Container>
        <Logo />
        {scroll === false ? <div /> : <SearchBox width="450px" height="30px" />}
        <MenuList>
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
          <li>
            {sign === null ? (
              <a href="/sign_in">
                <LinkButton text="Login" />
              </a>
            ) : (
              <LinkButton onClick={signOut} text="Sign out" />
            )}
          </li>
        </MenuList>
      </Container>
    </Page>
  );
}

const Page = styled.header`
  position: fixed;
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid #000;
  font-size: 18px;
  z-index: 999;

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
  padding: 0 8%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: ${(props) =>
    props.sign === null ? "15% 1fr repeat(4,10%)" : "15% 1fr repeat(3,10%)"};
`;

const MenuList = styled.ul`
  display: flex;
  gap: 3vw;
`;
