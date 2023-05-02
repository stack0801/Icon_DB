import React, { useState, useEffect, useCallback } from "react";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";
import ImageContainer from "../ImageContainer";
import StyledButton from "../StyledButton";
import StyledIuput from "../StyledInput";
import axios from 'axios';
import NoImg from "../../img/NoImage.png";

export default function App() {
    const [state, setState] = useState({
        images: [],
        Message: ""
    });
    
    const maxNumber = 1;
    
    const onChange = (imageList) => {
        setState({
            ...state,
            images: imageList
        });
    };
    
    const onError = (errors) => {
        if (errors) alert("이미지는 1개까지만 첨부할 수 있습니다");
    };
    
    const onMessageHandler = (e) => {
        setState({
            ...state,
            Message: e.currentTarget.value
        });
    };
    
    const insert_content = useCallback(() => {
        const formData = new FormData();
        formData.append("img", state.images[0].file);
        formData.append("message", state.Message);
    
        axios({
            method: 'post',
            url: '/insert_content',
            header: { 'content-type': 'multipart/form-data' },
            data: formData
        })
            .then((res) => {
                alert(res.data)
                if (res.data === 'success')
                    window.location.href = '/'
            });
    }, [state]);

        //로그인 여부
        useEffect(() => {
            axios.post('/get_auth')
                .then((res) => {
                    if (res.data === null) {
                        alert("로그인을 해주세요");
                        window.location.href = '/sign_in'
                    }
                })
        }, []);



        return (
            <PostingWrapper>
                <ImageUploader //react-images-uploading 모듈 사용
                    value={state.images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    onError={onError}>
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                        <ImageWrapper>
                            {imageList.length === 0 && <ImageContainer src={NoImg} alt="" width="260px" height="260px" />}
                            {imageList.map((image, index) => (
                                <div key={index}>
                                    <ImageContainer src={image['data_url']} alt="" width="260px" height="260px" />
                                    <>
                                        <StyledButton width="100%" height="35px" text="Update" onClick={() => onImageUpdate(index)} />
                                        <StyledButton width="100%" height="35px" text="Delete" onClick={() => onImageRemove(index)} />
                                    </>
                                </div>

                            ))}
                            <TitleImgUpload>
                                <StyledIuput width="95%" height="35px" placeholder="Message" onChange={onMessageHandler} />
                                {imageList.length !== 0
                                    ? <StyledButton width="100%" height="35px" text="Upload" onClick={insert_content} />
                                    : <>
                                        <StyledButton width="60%" height="35px" text="Add" onClick={onImageUpload} />
                                        <StyledButton width="60%" height="35px" text="Upload" onClick={insert_content} />
                                    </>
                                }
                            </TitleImgUpload>
                        </ImageWrapper>
                    )}
                </ImageUploader>
            </PostingWrapper>
        );
    }

    const PostingWrapper = styled.div`
    display: grid;
    place-items:center;
`;

    const ImageWrapper = styled.div`
    width: 140%;
    height: 80%;
    
    display: grid;
    grid-template-rows: 3fr 1fr;
    place-items: center;
    place-content: center;
    padding: 5%;

    border: solid 2px #f5d7cb;
    border-radius: 5px;
`;

    const TitleImgUpload = styled(PostingWrapper)`
    gap: 10px;
`;
