import React, { useState, useEffect, useCallback } from "react";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";
import ImageContainer from "../ImageContainer";
import { ThemeProvider, Button, TextField } from '@material-ui/core';
import { theme } from "../theme";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
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
        <Container>
            <ThemeProvider theme={theme}>
            <ImageUploader
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
                                <ButtonWrapper>
                                    <Button variant="outlined" color="primary" startIcon={<DeleteIcon />} onClick={() => onImageRemove(index)}>
                                        Delete
                                    </Button>
                                    <Button variant="outlined" color="primary" endIcon={<SendIcon />} onClick={() => onImageUpdate(index)}>
                                        Update
                                    </Button>
                                </ButtonWrapper>
                            </div>

                        ))}
                        <TitleWrapper>
                            <TextField id="standard-basic" label="Update Title" defaultValue="Normal" variant="standard" onChange={onMessageHandler} />
                        </TitleWrapper>
                            {imageList.length !== 0
                                ? <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={insert_content}>
                                        Upload
                                    </Button>
                                : <ButtonWrapper>
                                    <Button variant="contained" color="secondary" endIcon={<AddIcon />} onClick={onImageUpload}>
                                        Add
                                    </Button>
                                    <Button variant="contained" color="secondary" endIcon={<SendIcon />} onClick={insert_content}>
                                        Update
                                    </Button>
                                </ButtonWrapper>
                            }
                    </ImageWrapper>
                )}
            </ImageUploader>
            </ThemeProvider>
        </Container>
    );
}

const Container = styled.div`
    width: 1200px;
    display: grid;
    place-items:center;
`;

const ImageWrapper = styled.div`
    display: grid;
    grid-template-rows: 3fr 1fr 1fr;
    place-items: center;
    place-content: center;
    padding: 5%;
`;

const TitleWrapper = styled.div`
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 15px;
`