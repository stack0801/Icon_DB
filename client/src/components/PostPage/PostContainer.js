import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Linkdiv from "../Linkdiv";
import { ThemeProvider, Button, TextField } from '@material-ui/core';
import { theme } from "../theme";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
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
    const resizingHandler = () => { setisMobile(window.innerWidth <= 768); };

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
            <ThemeProvider theme={theme}>
                <Container>
                    <Wrapper columns={isMobile ? "1fr" : "1fr 300px"}>
                        <ImageContainer>
                            <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + data.filename} alt="no_img" width="50%" />
                        </ImageContainer>
                        <DetailContainer>
                            <InformationWrapper>
                                <h1>{data.message}</h1>
                                <DownloadWrapper>
                                    <Button variant="contained" color="primary" onClick={downloadUrl} endIcon={<DownloadIcon />}>Download</Button>
                                </DownloadWrapper>
                                {data.filename.split('.')[1] === 'svg' &&
                                    <Button variant="outlined" color="primary" onClick={OpenEditor} startIcon={<EditIcon />}>Edit</Button>}
                                <LikeWrapper>
                                    {liked
                                        ? <Button variant="outlined" color="secondary" onClick={onLikedHandler} startIcon={<ThumbUpAltIcon />}>Liked!</Button>
                                        : <Button variant="outlined" color="primary" onClick={onLikedHandler} startIcon={<ThumbUpOffAltIcon />}>Like</Button>
                                    }
                                    <div>{likes} likes</div>
                                </LikeWrapper>
                            </InformationWrapper>
                            <TagContainer>
                                <TagWrapper>
                                    {tags.map((tag, idx) => (
                                        <Tag key={idx}>
                                            <Linkdiv to={"/searchingTag/" + tag.Hashtag} text={tag.Hashtag} color="#9ED1D9" />
                                        </Tag>
                                    ))}
                                </TagWrapper>
                                <TextField id="standard-basic" label="Pleas Enter HashTag" variant="standard" onChange={TagInsertHandler} />
                                <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={TagInsert}>
                                    Add Tag
                                </Button>
                            </TagContainer>
                            {(sign === data.user_id) ?
                                <TitleWrapper>
                                    <h1>Update Title</h1>
                                    <TextField id="standard-basic" label="Update Title" variant="standard" onChange={onMassageHandler} />
                                    <LikeWrapper>
                                        <Button variant="outlined" color="primary" startIcon={<DeleteIcon />} onClick={content_delete}>
                                            Delete
                                        </Button>
                                        <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={content_update}>
                                            Send
                                        </Button>
                                    </LikeWrapper>
                                </TitleWrapper> :
                                <UserWrapper>
                                    <Linkdiv to={"/profile/" + data.user_id} color="#3C3C3C" text={data.user_id} />
                                </UserWrapper>}
                        </DetailContainer>
                    </Wrapper>
                </Container>
            </ThemeProvider>
        </Page>
    );
}


const Tag = styled.div`
    display: grid;
    padding: 5px 20px;
    background: #FFFFFF;
    border-radius: 20px;
`;

const Page = styled.div`
`;

const Container = styled.div`
    padding-top: 55px;
    width: 100vw;
    height: 94vh;
    display: grid;
    place-items: center;
    background: #F3EFEF;
`;

const Wrapper = styled.div`
    width: 1200px;
    display: grid;

    grid-template-columns: ${(props) => (props.columns || "1fr")};
`;

const ImageContainer = styled.div`
    display: grid;
    place-items: center;
    background: #FFFFFF;
    margin: 15%;
`;

const DetailContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    place-content: center;
    font-size: 16px;
    font-weight: 600;
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