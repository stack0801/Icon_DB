import React, { useState } from 'react';
import ImageUploader from 'react-images-uploading';
import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledIuput from "./StyledInput";
import NoImg from "../img/NoImage.png"
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
        <PostingImage>
            <ImageUploader
                value = { images }
                onChange = { onChange }
                maxNumber = { maxNumber }
                dataURLKey = "data_url"
                onError = { onError }
            >
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                    <ImageWrapper>
                        {imageList.length === 0 && <img src = { NoImg } alt = "" width = "260" />}
                        {imageList.map((image, index) => (
                            <div key = { index }>
                                <img src={ image['data_url'] } alt = "" width = "260" />
                                <ul>
                                    <li><StyledButton width = "100px" height = "35px" text = "Update" onClick = {() => onImageUpdate(index)} /></li>
                                    <li><StyledButton width = "100px" height = "35px" text = "Delete" onClick = {() => onImageRemove(index)} /></li>
                                </ul>
                            </div>

                        ))}
                        <TitleImgUpload>
                            <StyledIuput width="95%" height="35px" placeholder="Message" onChange={onMessageHandler}/>
                            {imageList.length !== 0
                                ? <StyledButton width="100px" height="35px" text="Upload" onClick={boardtest} />
                                : <ul>
                                    <li><StyledButton width="100px" height="35px" text="Add" onClick={onImageUpload} /></li>
                                    <li><StyledButton width="100px" height="35px" text="Upload" onClick={boardtest} /></li>
                                </ul>

                            }
                        </TitleImgUpload>
                    </ImageWrapper>
                )}
            </ImageUploader>
        </PostingImage>)
}

const PostingImage = styled.div`
    height: 100vh;
    display: grid;
    place-items:center;
    place-content:center;
`;

const ImageWrapper = styled.div`
    width: 450px;
    height: 600px;
    border: solid 2px #ececee;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 3fr 1fr;
    place-items:center;
    place-content:center;
    gap : 10px;
    padding: 5%;
`;

const TitleImgUpload = styled.div`
    display: grid;
    place-items: center;
    place-content: center;
    gap: 10px;
`;