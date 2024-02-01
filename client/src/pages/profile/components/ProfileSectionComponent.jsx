import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";

import SaveButtonComponent from "./SaveButtonComponent";
import Header from "@_components/common/Header/Header";
import ImageContainer from "@_components/ImageContainer";
import StyledInput from "@_components/Input";
import StyledButton from "@_components/ui/Button";
import { ThemeProvider, Button } from "@material-ui/core";
import { theme } from "@_components/theme";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

export default function ProfileSectionComponent() {
  let { user } = useParams();

  /** User Data */
  const [profiledata, setProfileData] = useState({
    profilename: "admin.png",
    nickname: "admin_username",
    id:"admin_ID"
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


  const handleInputChange = (e) => {
    setProfileData({
        ...profiledata,
        nickname: e.target.value
    });
  }

  const handleClearInput = () => {
    setProfileData({
        ...profiledata,
        nickname: ''
    });
  }

  return (
    <ProfileSection>
      <UserProfileBox>
        <div>
          <ProfileBlock>
            <h3>계정 정보</h3>
            <ProfileCol>
              <input type="hidden" />
              <InputGroupSpan>
                <input
                  type="text"
                  name="username"
                  id="username"
                  maxLength="60"
                  autoComplete="off"
                  tabIndex="1"
                  value={profiledata.nickname}
                  onChange={handleInputChange}
                  className={profiledata.nickname ? "hascontent" : ""}
                />
                <InputGroupLabel for="username">Username</InputGroupLabel>
                <InputGroupLink href="#" className="reset-input" onClick={handleClearInput}>
                  ×
                </InputGroupLink>
              </InputGroupSpan>

              <InputGroupSpan>
                <input
                  type="text"
                  name="id"
                  id="id"
                  maxLength="60"
                  autoComplete="off"
                  tabIndex="1"
                  value={profiledata.id}
                  className="hascontent"
                  disabled
                />
                <InputGroupLabel for="id">ID</InputGroupLabel>
                <InputGroupLink href="#" className="reset-input" onClick={handleClearInput}>
                  ×
                </InputGroupLink>
              </InputGroupSpan>
            </ProfileCol>
          </ProfileBlock>
        </div>
        <SaveButtonComponent />
      </UserProfileBox>
    </ProfileSection>
  );
}

const ProfileSection = styled.section`
  margin-bottom: 2em;
  margin-top: 2em;
  margin-right: 0;
  width: 74.4105871005%;
  display: block;
  border-radius: 4px;
  background-color: #fff;
  float: left;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 0 1px 0 rgba(0, 0, 0, 0.2);
`;

const UserProfileBox = styled.div`
  padding: 2em;
`;

const ProfileBlock = styled.div`
  padding: 2em 0 0;

  ::after {
    clear: both;
    content: "";
    display: table;
  }

  h3 {
    margin-bottom: 1em;
  }
`;

const ProfileCol = styled.div`
  margin-right: 0;
  width: 48.821174201%;
  display: block;
  float: left;
`;

const InputGroupSpan = styled.span`
  position: relative;
  display: block;
  clear: both;

  input[type="text"] {
    margin: 0 0 10px;
    margin-bottom: 0.75em;
    padding: 1em;
    padding-right: 2.4em;
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background-color: #fff;
    color: #5f7d95;
    font-size: 1em;
    line-height: 24px;
    transition: border-color;
    box-sizing: border-box;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
    appearance: none;
    user-select: text;
    
    :disabled {
        color: #b3b3b3;
        cursor: no-drop;
    }

    :hover {
      border-color: #ced0d4;
    }

    :focus {
      border-color: #9ed1d9;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06),
        0 0 5px rgba(158, 209, 217, 0.7);
      outline: none;

      ~ label {
        padding: 0 0.3em;
        top: 0;
        color: #0b2239;
        font-size: 0.8em;
      }

      ~ .reset-input {
        opacity: 1;
      }
    }

    &.hascontent ~ label {
        padding: 0 0.3em;
        top: 0;
        color: #0b2239;
        font-size: .8em;
    }
  }
`;

const InputGroupLabel = styled.label`
    position: absolute;
    top: 50%;
    left: 1em;
    background-color: #fff;
    color: #b3b3b3;
    font-weight: normal;
    transform: translateY(-50%);
    transition: all 0.2s ease-in-out;
    cursor: text;
    pointer-events: none;
`;

const InputGroupLink = styled.a`
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
  opacity: 0;
  color: #b3b3b3;
  z-index: 9999;

  :hover {
    color: #9ed1d9;
  }
`;
