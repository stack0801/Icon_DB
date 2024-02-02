import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import SearchBox from "@_components/SearchBox";
import Avatar from "@_assets/images/noimage.png";

import { MdLogout } from "react-icons/md";
import { FaDownload, FaRegThumbsUp, FaHeart } from "react-icons/fa6";

export default function SearchSectionComponent({ isModalOpen }) {
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
    <SearchSection>
        <InnerContainer>
            <InnerBox>
                <section>
                    <SearchContainer>
                        <SearchWrapper>
                            <SearchBox />
                        </SearchWrapper>
                    </SearchContainer>
                </section>
            </InnerBox>
        </InnerContainer>
    </SearchSection>
  );
}

const SearchSection = styled.section`
    display: block;
    background-color: #fff;
    box-shadow: 0 0 0 1px #d8d8d8;
`;

const InnerContainer = styled.div`
    padding: 10px 20px;
`;

const InnerBox = styled.div`
    height: 100% !important;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    section {
        position: relative;
        flex: 1;
    }
`;

const SearchContainer = styled.div`
    background-color: #f0f0f0;
    height: 44px;
    line-height: 44px;
    border-radius: 3px;
`;

const SearchWrapper = styled.div`
    position: relative;
    line-height: 24px;
    height: 100%;
    flex: 1;
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
