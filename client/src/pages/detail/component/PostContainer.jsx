import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import ImageSectionComponent from "./ImageSection";

import noimg from '@_assets/images/noimage.png';

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
    <section id='detail' className="detail bobjoll new-detail loaded">
      <div className="detail__inner detail--v2 gallery">
        <div className="row detail__top mg-none">
         <ImageSectionComponent />
          <aside className="detail__sidebar col--stretch">
            <div className="pd-top-lv3 pd-bottom-lv2">
              <h1 className="mg-none font-xl">No Image</h1>
            </div>
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
            <div className="author__holder">
              <div className="author">
                <div className="row row--vertical-center mg-none">
                  <div className="col mg-none">
                    <input type="hidden" id="author-url" />
                    <a className="row row--vertical-center mg-none">
                      <span className="avatar avatar-60">
                        <img src={noimg} alt="noimg" width="40" height="40" />
                      </span>
                      <div className="col mg-none mg-left-lv2-i">
                        <span className="username">admin</span>
                      </div>
                    </a>
                  </div>
                  <div>
                    <button className="bj-button bj-button--sm bj-button--outline btn--follow js_follow mg-left-lv2" datatype="author">
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <InformationWrapper>
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
            )} */}
          </aside>
        </div>
      </div>
    </section>
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

const AuthorSection = styled.div`
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
`;

const AuthorContainer = styled.div`
  font-size: 13px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const AuthorWrraper = styled.div`
  padding: 0 5px;
  position: relative;
  flex: 1;
`;

const FlexRowLink = styled.a`
  display: flex;
  flex-wrap: wrap;
  color: #0a152f;
  align-items: center;

  > span {
    width: 54px;
    height: 54px;
    border-radius: 100%;
    background-size: 100%;

    img {
      width: 100%;
      border-radius: 100%;
    }
  }
`;

const AuthorInformationBox = styled.div`
  margin-left: 10px !important;
  padding: 0 5px;
  position: relative;
  flex: 1;

  span {
    font-weight: 600;
    color: #142a5e;
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
