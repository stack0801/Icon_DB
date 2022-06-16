import React, { useState } from 'react';
import ImageUploader from 'react-images-uploading';
import styled from "styled-components";
import ImageContainer from "../ImageContainer";
import StyledButton from "../StyledButton";
import StyledIuput from "../StyledInput";
import NoImg from "../../img/NoImage.png";
import axios from 'axios';

export default function App() {

    //이미지 업로드
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange = (imageList) => {
        setImages(imageList);
    }

    const onError = (errors) => {
        if (errors) {
            alert("이미지는 1개까지만 첨부할 수 있습니다")
        }
    }

    const [Message, setMessagebox] = useState("");
    const onMessageHandler = (e) => { setMessagebox(e.currentTarget.value) }
    const boardtest = () => {

        const formData = new FormData()
        formData.append("img", images[0].file)
        formData.append("message", Message)

        axios({
            method: 'post',
            url: '/boardtest',
            header: { 'content-type': 'multipart/form-data' },
            data: formData
        })
            .then((res) => {
                alert(res.data)/*
            if (res.data == 'success') 
                window.location.href = '/'*/
            })
    }
    return (
        <PostingWrapper>
            <ImageUploader
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                onError={onError}>
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                    <ImageWrapper>
                        {imageList.length === 0 && <ImageContainer src={NoImg} alt="" width="70%" heigth="70%"/>}
                        {imageList.map((image, index) => (
                            <div key={index}>
                                <ImageContainer src={image['data_url']} alt="" width="70%">
                                </ImageContainer>
                                <ul>
                                    <li><StyledButton width="100%" height="35px" text="Update" onClick={() => onImageUpdate(index)} /></li>
                                    <li><StyledButton width="100%" height="35px" text="Delete" onClick={() => onImageRemove(index)} /></li>
                                </ul>
                            </div>

                        ))}
                        <TitleImgUpload>
                            <StyledIuput width="95%" height="35px" placeholder="Message" onChange={onMessageHandler} />
                            {imageList.length !== 0
                                ? <StyledButton width="100%" height="35px" text="Upload" onClick={boardtest} />
                                : <>
                                    <StyledButton width="60%" height="35px" text="Add" onClick={onImageUpload} />
                                    <StyledButton width="60%" height="35px" text="Upload" onClick={boardtest} />
                                </>}
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
    border: solid 2px #f5d7cb;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 3fr 1fr;
    place-items:center;
    padding: 5%;
`;

const TitleImgUpload = styled(PostingWrapper)`
    gap: 20px;
`;