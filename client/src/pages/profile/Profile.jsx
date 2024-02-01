import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";

import MenuListComponent from "../../components/ui/MenuListComponent";
import SidebarComponent from "./components/SidebarComponent";
import ProfileSectionComponent from "./components/ProfileSectionComponent";

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

export default function App() {
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
    <RootContainer>
      <Header />
      <Container>
        <Wrapper>
          <MenuListComponent />
          <SidebarComponent />
          <ProfileSectionComponent />

          {/* <ProfileContainer>
            <ImageUploader
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              onError={onError}
            >
              {({ imageList, onImageUpdate }) => (
                <>
                  {imageList.length === 0 && (
                    <ImageContainer
                      src={
                        "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
                        profiledata.profilename
                      }
                      alt=""
                      width="60%"
                      borderRadius="50%"
                    />
                  )}
                  {imageList.map((image, index) => (
                    <ImageContainer
                      key={index}
                      src={image["data_url"]}
                      alt=""
                      width="60%"
                      borderRadius="50%"
                    />
                  ))}
                  <h1>{profiledata.nickname}</h1>
                  {sign === user ? (
                    <>
                      <StyledInput
                        placeholder={profiledata.nickname}
                        onChange={onNicknameHandler}
                      />
                      <StyledButton
                        width="90%"
                        text="Edit Profile"
                        onClick={() => onImageUpdate(0)}
                      />
                      <StyledButton
                        width="90%"
                        text="Update"
                        onClick={handleFormSubmit}
                      />
                    </>
                  ) : (
                    <ThemeProvider theme={theme}>
                      {!followed ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={onFollowHandler}
                        >
                          <AddIcon fontSize="small" />
                          &nbsp;Follow
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={onFollowHandler}
                        >
                          <CheckIcon fontSize="small" />
                          &nbsp;Following
                        </Button>
                      )}
                    </ThemeProvider>
                  )}
                </>
              )}
            </ImageUploader>
          </ProfileContainer>
          <FavoritePage>
            <div>
              <h2>My Icon List</h2>
              <MyList>
                {profileContent.map((list, idx) => (
                  <div key={idx}>
                    <Link to={"/post/" + list.content_id}>
                      <IconList
                        src={
                          "https://webservicegraduationproject.s3.amazonaws.com/img/" +
                          list.filename
                        }
                        alt="no_img"
                        width="100"
                      />
                    </Link>
                  </div>
                ))}
              </MyList>
            </div>
            <div>
              <h2>Liked Icon List</h2>
              <MyList>
                {profileLiked.map((list, idx) => (
                  <div key={idx}>
                    <Link to={"/post/" + list.content_id}>
                      <IconList
                        src={
                          "https://webservicegraduationproject.s3.amazonaws.com/img/" +
                          list.filename
                        }
                        alt="no_img"
                        width="100"
                      />
                    </Link>
                  </div>
                ))}
              </MyList>
            </div>
            <div>
              <h2>Following</h2>
              <MyList>
                {profileFollow.map((list, idx) => (
                  <div key={idx}>
                    <Link to={"/profile/" + list.id}>
                      <IconList
                        src={
                          "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
                          list.profilename
                        }
                        alt="no_img"
                        width="100"
                        height="100"
                      />
                    </Link>
                  </div>
                ))}
              </MyList>
            </div>
            <div>
              <h2>Follower</h2>
              <MyList>
                {profileFollower.map((list, idx) => (
                  <div key={idx}>
                    <Link to={"/profile/" + list.id}>
                      <IconList
                        src={
                          "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
                          list.profilename
                        }
                        alt="no_img"
                        width="100"
                        height="100"
                      />
                    </Link>
                  </div>
                ))}
              </MyList>
            </div>
          </FavoritePage> */}
        </Wrapper>
      </Container>
    </RootContainer>
  );
}

const RootContainer = styled.div`
  background-color: #f8fafb;
  min-height: 100vh;
  display: flex !important;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  padding: 0 20px;
  max-width: 1200px;

  ::after {
    clear: both;
    content: "";
    display: table;
  }
`;

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

    :hover {
      border-color: #ced0d4;
    }

    :focus {
      border-color: #9ed1d9;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.06), 0 0 5px rgba(158, 209, 217, 0.7);
      outline: none;

        ~.reset-input {
        opacity: 1;
      }
    }
  }

  label {
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
  }

  input.hascontent~label {
    color: #0b2239;
    top: 0;
    font-size: .8em;
    padding: 0 0.3em;
  }
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
const ProfileContainer = styled.div`
  display: grid;
  grid-template-rows: 300px 100px 50px 50px 50px;
  place-items: center;
  padding: 10%;
`;

const FavoritePage = styled.div`
  display: grid;
  padding-left: 102px;
`;

const MyList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 30px;
`;

const IconList = styled.img`
  height: 100px;

  border: 2px solid #9ed1d9;
  border-radius: 10px;
`;
