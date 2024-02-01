import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";

import Header from "@_components/common/Header/Header";
import ImageContainer from "@_components/ImageContainer";
import StyledInput from "@_components/Input";
import StyledButton from "@_components/ui/Button";
import { ThemeProvider, Button } from "@material-ui/core";
import { theme } from "@_components/theme";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

import TextField from "@mui/material/TextField";

export default function SaveButtonComponent() {
  let { user } = useParams();

  /** User Data */
  const [profiledata, setProfileData] = useState({
    profilename: "admin.png",
    nickname: "admin",
  });
  const [followed, setFollowed] = useState();
  const [sign, setSign] = useState(null);

  /** Profile Information */
  const [profileContent, setProfileContent] = useState([]);
  const [profileLiked, setProfileLiked] = useState([]);
  const [profileFollow, setProfileFollow] = useState([]);
  const [profileFollower, setProfileFollower] = useState([]);

  /** Mobile version */
  const [isMobile, setisMobile] = useState(false);
  const resizingHandler = () => {
    setisMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          authResponse,
          contentResponse,
          likedResponse,
          followingResponse,
          followerResponse,
          profileResponse,
        ] = await Promise.all([
          axios.post("/get_auth"),
          axios.post("/get_usercontent", { id: user }),
          axios.post("/get_userlike", { id: user }),
          axios.post("/get_Following", { id: user }),
          axios.post("/get_Follower", { id: user }),
          axios.post("/get_profile", { user: user }),
        ]);

        setSign(authResponse.data);

        if (authResponse.data) {
          setFollowed(contentResponse.data === "followed");
          window.addEventListener("resize", resizingHandler);
          return () => {
            window.removeEventListener("resize", resizingHandler);
          };
        }

        setProfileContent(contentResponse.data);
        setProfileLiked(likedResponse.data);
        setProfileFollow(followingResponse.data);
        setProfileFollower(followerResponse.data);
        setProfileData(profileResponse.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [user]);

  /** axios.post('/get_auth').then((res) => {
        setSign(res.data)
        if (res.data) {
            axios.post('/check_followed', { id: user }).then((res) => {
                setFollowed((res.data === 'followed'))
            });
            window.addEventListener("resize", resizingHandler);
            return () => {
                window.removeEventListener("resize", resizingHandler);
            };
        };
    });

    axios.post('/get_usercontent', { id: user }).then((res) => {
        setProfileContent(res.data);
    });

    axios.post('/get_userlike', { id: user }).then((res) => {
        setProfileLiked(res.data);
    });

    axios.post('/get_Following', { id: user }).then((res) => {
        setProfileFollow(res.data);
    });

    axios.post('/get_Follower', { id: user }).then((res) => {
        setProfileFollower(res.data);
    });

}, [user]);

useEffect(() => {
    axios.post('/get_profile', { user: user }).then((res) => {
        setProfileData(res.data[0]);
    });
}, [user]);



useEffect(() => {
    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => { window.removeEventListener("resize", resizingHandler); };
}, []); */

  /** Follow Function */
  const onFollowHandler = () => {
    if (sign === null) {
      alert("로그인 후 사용 가능한 서비스 입니다.");
      window.location.href = "/sign_in";
    } else {
      axios.post("/setFollow", { id: user }).then((res) => {
        setFollowed(res.data);
      });
    }
  };

  /** Profile Upload */
  const [images, setImages] = useState([]);
  const [nickname, updateNickname] = useState();
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImages(imageList.slice(0, maxNumber));
  };

  const onNicknameHandler = (e) => {
    updateNickname(e.currentTarget.value);
  };

  const onError = (errors) => {
    if (errors) {
      alert("이미지는 1개까지만 첨부할 수 있습니다");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (images.length > 0) {
      formData.append("img", images[0].file);
      axios({
        method: "post",
        url: "/update_profile_img",
        header: { "content-type": "multipart/form-data" },
        data: formData,
      })
        .then((res) => {
          alert(res.data);
          if (res.data === "success") {
            window.location.href = `/profile/${user}`;
          }
        })
        .catch((err) => console.log(err));
    }

    if (nickname.length > 0) {
      axios
        .post("/update_profile_nickname", { nickname })
        .then((res) => {
          alert(res.data);
          if (res.data === "success") {
            window.location.href = `/profile/${user}`;
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ButtonBox>
        <SaveButton type="submit" tabIndex="25">저장하기</SaveButton>
    </ButtonBox>
  );
}

const ButtonBox = styled.div`
    display: flex;

    @media screen and (min-width: 768px) {
        justify-content: flex-end;
    }
`;

const SaveButton = styled.button`
    margin: 0;
    margin-top: 20px !important;
    margin-left: 5px !important;
    padding: 0 13px;
    display: inline-block;
    border: none;
    border-radius: 3px;
    background-color: #9ed1d9;
    color: #fff !important;
    font-size: 1em;
    font-weight: 500;
    line-height: 44px;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
    text-decoration: none;
    text-transform: none;
    cursor: pointer;
    appearance: none;

    :hover {
        background-color: #7facb3;
    }

    @media screen and (min-width: 768px) {
        padding: 0 30px !important;
        width: initial !important;
    }
`;