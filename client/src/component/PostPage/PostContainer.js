import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../../component/StyledButton";
import StyledInput from "../../component/StyledInput";
import Linkdiv from "../Linkdiv";
import { ThemeProvider, Button } from '@material-ui/core';
import { theme } from "../theme";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

export default function App() {
    let { url_id } = useParams();
    const [sign, setSign] = useState(null);
    const [data, setData] = useState({ filename: "NoImage.png" });
    const [isMobile, setisMobile] = useState(); //Mobile버전 나타내기
    const [liked, setLiked] = useState(); //좋아요 여부 나타내기
    const [likes, setLikes] = useState(0); //좋아요의 갯수 확인
    const [tags, setTags] = useState([]); //HashTag 확인
    const [tagInsert, setTagInsert] = useState(""); //HashTag 입력
    const [followed, setFollowed] = useState();

    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                let data = res.data
                setSign(data)
                if (data) {
                    axios.post('/check_liked', {
                        content_id: url_id
                    })
                        .then((res) => {
                            setLiked((res.data === 'liked'))
                        })
                }
            })

        resizingHandler();
        window.addEventListener("resize", resizingHandler);
        return () => { window.removeEventListener("resize", resizingHandler); };
    }, [url_id]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/get_content',
            data: {
                content_id: url_id
            }
        })
            .then((res) => {
                setData(res.data[0]);
                setLikes(res.data[0].like)
            })
        getTags(url_id)

    }, [url_id]);

    const getTags = (url_id) => {
        axios({
            method: 'post',
            url: '/get_tags',
            data: {
                content_id: url_id
            }
        })
            .then((res) => {
                setTags(res.data)
            })
    }

    //Mobile 버전
    const resizingHandler = () => { setisMobile(window.innerWidth <= 600); };

    useEffect(() => {
        resizingHandler();
        window.addEventListener("resize", resizingHandler);
        return () => { window.removeEventListener("resize", resizingHandler); };
    }, []);

    //좋아요 기능
    const onLikedHandler = () => {
        if (sign === null) {
            alert("로그인 후 사용 가능한 서비스 입니다.");
            window.location.href = '/sign_in';
        }
        else {
            axios({
                method: 'post',
                url: '/setLike',
                data: {
                    content_id: url_id,
                }
            })
                .then((res) => {
                    setLiked(res.data)
                    axios({
                        method: 'post',
                        url: '/get_content',
                        data: {
                            content_id: url_id
                        }
                    })
                        .then((res) => {
                            setLikes(res.data[0].like)
                        })
                })
        }
    };

    const [message, setMessage] = useState("");
    const onMassageHandler = (event) => { setMessage(event.currentTarget.value); }

    const content_delete = () => {
        axios.post('/content_delete', {
            content_id: url_id
        })
            .then((res) => {
                console.log(res)
                window.location.href = '/';
            })
    }

    const content_update = () => {
        axios.post('/content_update', {
            content_id: url_id,
            content_message: message,
            image: null
        })
            .then((res) => {
                console.log(res)
                window.location.href = '/';
            })
    }

    //Download URL
    const downloadUrl = () => {
        window.open(process.env.REACT_APP_URL_s + ':5000/download/' + data.filename)
    }

    //HashTag 기능
    const TagInsertHandler = (event) => { setTagInsert(event.currentTarget.value); }
    const TagInsert = () => {
        if (tagInsert.length > 1) {
            axios.post('/tag_insert', {
                content_id: url_id,
                tag_context: tagInsert
            })
                .then((res) => {
                    console.log(res)
                    getTags(url_id)
                })
        }
        else {
            alert("태그는 2글자 이상입니다");
        }
    }

    //Editor 기능
    const OpenEditor = () => {
        window.open(process.env.REACT_APP_URL + ':8000/src/editor/' + data.filename.split('.')[0])
    }

    return (
        <Page>
            <Container columns={isMobile ? "1fr" : "1fr 300px"}>
                <ImageContainer>
                    <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.filename} alt="no_img" width="50%" />
                </ImageContainer>
                <Title>
                    <Information>
                        <h1>{data.message}</h1>
                        <ThemeProvider theme={theme}>
                            <DownloadWrapper>
                                <Button variant="outlined" color="primary" onClick={downloadUrl}><DownloadIcon fontSize='small' />&nbsp;Download</Button>
                                {liked
                                ? <Button variant="outlined" color="secondary" onClick={onLikedHandler}><ThumbUpAltIcon fontSize='small' />&nbsp;Liked!</Button>
                                : <Button variant="outlined" color="primary" onClick={onLikedHandler}><ThumbUpOffAltIcon fontSize='small' />&nbsp;Like</Button>
                            }
                            </DownloadWrapper>
                            {data.filename.split('.')[1] === 'svg' &&
                                    <Button variant="outlined" color="primary" onClick={OpenEditor}><EditIcon fontSize='small' />&nbsp;Edit</Button>}
                        </ThemeProvider>
                     
                        <div>{likes} likes</div>
                        <PostTags>
                            {tags.map((tag, idx) => (
                                <Tag key={idx}>
                                    <Linkdiv to={"/searchingTag/" + tag.Hashtag} text={tag.Hashtag} color="#9ED1D9" />
                                </Tag>
                            ))}
                        </PostTags>
                        <StyledInput width="95%" placeholder="Please enter a tag" onChange={TagInsertHandler} />
                        <StyledButton width="50%" text="Add Tag" onClick={TagInsert} />
                    </Information>
                    {(sign === data.user_id) ?
                        <UserContainer>
                            <h1>Update</h1>
                            <StyledInput width="95%" placeholder="MESSAGE" onChange={onMassageHandler} />
                            <StyledButton width="50%" text="Delete" onClick={content_delete} />
                            <StyledButton width="50%" text="Update" onClick={content_update} />
                        </UserContainer> :
                        <UserWrapper>
                        <Linkdiv to={"/profile/" + data.user_id} color="#3C3C3C" text={data.user_id} />
                        </UserWrapper>}
                </Title>
            </Container>
        </Page>
    );
}

const PostTags = styled.div`
`;

const Tag = styled.div`
    display: inline;
    margin: 2px;
    padding: 8px;
    background: #F3EFEF;
    border-radius: 20px;
`;

const Page = styled.div`
    display: grid;
    place-items: center;
`;

const Container = styled.div`
    padding-top: 55px;
    width: 1200px;
    height: 94vh;
    display: grid;

    grid-template-columns: ${(props) => (props.columns || "1fr")};
`;

const ImageContainer = styled.div`
    display: grid;
    place-items: center;
`;


const Title = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    place-content: center;
    place-items: center;
    border-left: 1px solid #DDDDDD;
    font-size: 16px;
    font-weight: 600;
`;

const Information = styled.div`
    display: grid;
    place-content: center;
    place-items: center;
    gap: 20px;
    padding: 5px;
`;

const DownloadWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    gap: 20px;
`;

const UserContainer = styled.div`
Padding: 5%;
    display: grid;
    place-items: center;
    place-content: center;
    gap: 15px;
`;

const UserWrapper = styled(DownloadWrapper)`
    grid-template-columns: 1fr;
`;