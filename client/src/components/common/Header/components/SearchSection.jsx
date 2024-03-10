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
    <section className="header--search" id="header--search">
        <div className="header--search__inner">
            <div className="row row--vertical-center mg-none full-height">
                <section className="search-holder col mg-none pd-none">
                    <div className="fake-search row">
                        <div className="tag-field col mg-none pd-none">
                            <SearchBox />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
  );
}