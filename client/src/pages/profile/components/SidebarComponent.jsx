import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";

import Header from "@_components/common/Header/Header";
import ImageContainer from "@_components/ImageContainer";
import StyledInput from "@_components/StyledInput";
import StyledButton from "@_components/ui/Button";
import { ThemeProvider, Button } from "@material-ui/core";
import { theme } from "@_components/theme";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

import NoImage from "@_assets/images/noimage.png";

export default function SidebarComponent() {
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
    <SidebarAside>
      <UserCardSection>
        <ProfileBox>
          <UserImageBox>
            <ModalUploadLabel></ModalUploadLabel>
            <UserImage src={NoImage} />
          </UserImageBox>
          <UsernameLink href="#">username</UsernameLink>
        </ProfileBox>
      </UserCardSection>
    </SidebarAside>
  );
}

const SidebarAside = styled.aside`
  margin-top: 2em;
  margin-right: 2.3576515979%;
  position: sticky;
  top: 2em;
  float: left;
  width: 23.2317613015%;
  display: block;
`;

const UserCardSection = styled.section`
  position: relative;
  text-align: center;
  margin-bottom: 1em;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 0 1px 0 rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 881px) {
    display: block !important;
  }
`;

const ProfileBox = styled.div`
  padding-top: 2em;
`;

const UserImageBox = styled.div`
  margin: 0 auto 1em;
  position: relative;
  width: 120px;
  height: 120px;
  display: block;
  border: none;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 0 12px #b3b3b3;

  label::before {
    margin-top: 15px;
    margin-right: 5px;
    font-size: 1.4em;
    display: inline-block;
  }

  :hover {
    label {
      opacity: 1;
    }
  }
`;

const ModalUploadLabel = styled.label`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 50%;
  height: 50%;
  display: block;
  opacity: 0;
  background: #fff;
  border-radius: 0 100% 0 1em;
  color: #333;
  transition: opacity 0.2s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  cursor: pointer;
  z-index: 1;

  ::before {
    content: "";
  }
`;

const UserImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100%;
`;

const UsernameLink = styled.a`
  padding: 0 1em;
  display: block;
  color: #333;
  word-wrap: break-word;
`;
