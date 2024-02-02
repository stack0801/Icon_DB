import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Linkdiv from "../../../components/Linkdiv";
import { ThemeProvider, Button, TextField } from "@material-ui/core";
import { theme } from "../../../components/theme";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function App() {
  let { url_id } = useParams();
  const [sign, setSign] = useState(null);
  const [data, setData] = useState({ filename: "NoImage.png" });
  const [isMobile, setisMobile] = useState(); //Mobile버전 나타내기
  const [liked, setLiked] = useState(); //좋아요 여부 나타내기
  const [likes, setLikes] = useState(0); //좋아요의 갯수 확인
  const [tags, setTags] = useState([]); //HashTag 확인
  const [tagInsert, setTagInsert] = useState(""); //HashTag 입력

  useEffect(() => {
    axios.post("/get_auth").then((res) => {
      let data = res.data;
      setSign(data);
      if (data) {
        axios
          .post("/check_liked", {
            content_id: url_id,
          })
          .then((res) => {
            setLiked(res.data === "liked");
          });
      }
    });

    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, [url_id]);

  useEffect(() => {
    axios({
      method: "post",
      url: "/get_content",
      data: {
        content_id: url_id,
      },
    }).then((res) => {
      setData(res.data[0]);
      setLikes(res.data[0].like);
    });
    getTags(url_id);
  }, [url_id]);

  const getTags = (url_id) => {
    axios({
      method: "post",
      url: "/get_tags",
      data: {
        content_id: url_id,
      },
    }).then((res) => {
      setTags(res.data);
    });
  };

  //Mobile 버전
  const resizingHandler = () => {
    setisMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  //좋아요 기능
  const onLikedHandler = () => {
    if (sign === null) {
      alert("로그인 후 사용 가능한 서비스 입니다.");
      window.location.href = "/sign_in";
    } else {
      axios({
        method: "post",
        url: "/setLike",
        data: {
          content_id: url_id,
        },
      }).then((res) => {
        setLiked(res.data);
        axios({
          method: "post",
          url: "/get_content",
          data: {
            content_id: url_id,
          },
        }).then((res) => {
          setLikes(res.data[0].like);
        });
      });
    }
  };

  const [message, setMessage] = useState("");
  const onMassageHandler = (event) => {
    setMessage(event.currentTarget.value);
  };

  const content_delete = () => {
    axios
      .post("/content_delete", {
        content_id: url_id,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      });
  };

  const content_update = () => {
    axios
      .post("/content_update", {
        content_id: url_id,
        content_message: message,
        image: null,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      });
  };

  //Download URL
  const downloadUrl = () => {
    window.open(
      process.env.REACT_APP_URL_s + ":5000/download/" + data.filename
    );
  };

  //HashTag 기능
  const TagInsertHandler = (event) => {
    setTagInsert(event.currentTarget.value);
  };
  const TagInsert = () => {
    if (tagInsert.length > 1) {
      axios
        .post("/tag_insert", {
          content_id: url_id,
          tag_context: tagInsert,
        })
        .then((res) => {
          console.log(res);
          getTags(url_id);
        });
    } else {
      alert("태그는 2글자 이상입니다");
    }
  };

  //Editor 기능
  const OpenEditor = () => {
    window.open(
      process.env.REACT_APP_URL +
        ":8000/src/editor/" +
        data.filename.split(".")[0]
    );
  };

  return (
    <DetailSection>
      <div>
        <Container>
          <ImageSection>
            <ImageContainer>
              <ImageWrapper>
                <ImageBox>
                  <img
                    src={
                      "https://webservicegraduationproject.s3.amazonaws.com/img/" +
                      data.filename
                    }
                    alt="no_img"
                    width="256"
                    height="256"
                  />
                </ImageBox>
              </ImageWrapper>
            </ImageContainer>
          </ImageSection>
          <DetailSidebar>
            <TitleBox>
              <h1>No Image</h1>
            </TitleBox>
            <DownloadContainer>
              <DownloadBox>
                <ButtonBox>
                  <div>
                  <ButtonLink href="#" onClick={downloadUrl}>
                    <span>다운로드</span>
                  </ButtonLink>
                  </div>
                </ButtonBox>
                <IsLikeBox>
                {liked ? (
                  <IsLikeButtonBox onClick={onLikedHandler}>
                    LIKED!
                  </IsLikeButtonBox>
                ) : (
                  <IsLikeButtonBox onClick={onLikedHandler}>
                  LIKE
                </IsLikeButtonBox>
                )}
                </IsLikeBox>
                <IsLikeBox>
                  <IsLikeButtonBox>
                    <span>{likes} Likes</span>
                  </IsLikeButtonBox>
                </IsLikeBox>
              </DownloadBox>
            </DownloadContainer>
            <InformationWrapper>
              <h1>{data.message}</h1>
              {data.filename.split(".")[1] === "svg" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={OpenEditor}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </InformationWrapper>
            <TagContainer>
              <TagWrapper>
                {tags.map((tag, idx) => (
                  <Tag key={idx}>
                    <Linkdiv
                      to={"/searchingTag/" + tag.Hashtag}
                      text={tag.Hashtag}
                      color="#9ED1D9"
                    />
                  </Tag>
                ))}
              </TagWrapper>
              <TextField
                id="standard-basic"
                label="Pleas Enter HashTag"
                variant="standard"
                onChange={TagInsertHandler}
              />
              <Button
                variant="contained"
                color="secondary"
                endIcon={<SendIcon />}
                onClick={TagInsert}
              >
                Add Tag
              </Button>
            </TagContainer>
            {sign === data.user_id ? (
              <TitleWrapper>
                <h1>Update Title</h1>
                <TextField
                  id="standard-basic"
                  label="Update Title"
                  variant="standard"
                  onChange={onMassageHandler}
                />
                <LikeWrapper>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={content_delete}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<SendIcon />}
                    onClick={content_update}
                  >
                    Send
                  </Button>
                </LikeWrapper>
              </TitleWrapper>
            ) : (
              <UserWrapper>
                <Linkdiv
                  to={"/profile/" + data.user_id}
                  color="#3C3C3C"
                  text={data.user_id}
                />
              </UserWrapper>
            )}
          </DetailSidebar>
        </Container>
      </div>
    </DetailSection>
  );
}

const Tag = styled.div`
  display: grid;
  padding: 5px 20px;
  background: #ffffff;
  border-radius: 20px;
`;

const DetailSection = styled.section`
  margin: 0 auto;
  padding: 0 60px;
  max-width: 1440px;
`;

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  border-bottom: none;
`;

const ImageSection = styled.section`
  border-radius: 12px;
  background-color: #f7f7f7;
  text-align: center;
`;

const ImageContainer = styled.div`
  height: 100% !important;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  touch-action: auto !important;
`;

const ImageWrapper = styled.div`
  padding: 0 5px;
  position: relative;
  flex: 1;
`;

const ImageBox = styled.div`
  padding: 90px;

  img {
    height: auto;
  }
`;

const DetailSidebar = styled.aside`
  margin-left: 70px;
  position: relative;
  width: 441px;
  align-self: stretch;
`;

const TitleBox = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;

  h1 {
    color: #424242;
    font-size: 15px;
  }
`;

const DownloadContainer = styled.div`
  padding: 10px 0 20px;
`;

const DownloadBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonBox = styled.div`
  width: calc(100% - 5px);
  flex: unset;

  > div {
    margin: unset;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

const ButtonLink = styled.a`
  padding: 0.75em 0;
  min-width: 44px;
  height: 44px;
  display: inline-flex !important;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: #9ed1d9;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  appearance: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  transition: none;

  :hover {
    background-color: #7facb3;
  }

  ::after {
    display: table;
    clear: both;
    content: "";
  }

  span {
    height: 44px;
    line-height: 44px;
    display: inline-block;
    float: left;
  }
`;

const IsLikeBox = styled.span`
  position: relative;
  flex: unset;
  width: calc(50% - 5px);
`;

const IsLikeButtonBox = styled.button`
  padding: 0 30px;
  position: relative;
  width: 100%;
  min-width: 44px;
  height: 44px;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: #e5e5e5;
  color: #424242;
  font-size: 14px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  appearance: none;

  :hover {
    background: #d8d8d8;
  }
`;
const InformationWrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const TagContainer = styled.div`
  padding-top: 50px;
  display: grid;
  gap: 15px;
`;

const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  place-items: center;
  gap: 20px;
`;
const DownloadWrapper = styled.div`
  display: grid;
`;

const LikeWrapper = styled(DownloadWrapper)`
  grid-template-columns: 1fr 1fr;
  place-items: center;
`;

const TitleWrapper = styled.div`
  padding-top: 50px;
  display: grid;
  place-content: center;
  gap: 15px;
`;

const UserWrapper = styled(DownloadWrapper)`
  place-items: center;
`;
