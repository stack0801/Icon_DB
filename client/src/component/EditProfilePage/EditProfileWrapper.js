import React, { useEffect, useState } from "react";
import ImageUploader from 'react-images-uploading';
import styled from "styled-components";
import ImageContainer from "../ImageContainer";
import StyledButton from "../StyledButton";
import { withStyles, TextField } from "@material-ui/core";
import axios from "axios"
import NoImg from "../../img/NoImage.png";

function App({ classes }) {
    const [profiledata, setProfileData] = useState({});
    const [sign, setSign] = useState(null);

    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                console.log(res.data)
            })
        axios({
            method: 'post',
            url: '/get_user'
        })
            .then((res) => {
                setProfileData(res.data[0]);
                console.log(res.data[0]);
            })
    }, []);

    //이미지 업로드
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange = (imageList) => {
        setImages(imageList);
    }

    const boardtest = () => {

        const formData = new FormData()
        formData.append("img", images[0].file)

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

    const profile_update = () => {

    }
    return (
        <EditProfileWrapper>
            <ImageUploader
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url">
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (<>
                    {imageList.length === 0 && <ImageContainer src={NoImg} alt="" width="60%" borderRadius="50%" />}
                    {imageList.map((image, index) => (
                        <div key={index}>
                            <ImageContainer src={image['data_url']} alt="" width="260" borderRadius="50%" />
                            <ul>
                                <li><StyledButton width="100px" height="35px" text="Update" onClick={() => onImageUpdate(index)} /></li>
                                <li><StyledButton width="100px" height="35px" text="Delete" onClick={() => onImageRemove(index)} /></li>
                            </ul>
                        </div>

                    ))}
                </>)}
            </ImageUploader>
            <TextField className={classes.TextField}
                variant="outlined"
                fullWidth
                label={profiledata.nickname}
                required />
            <TextField className={classes.TextField}
                variant="outlined"
                fullWidth
                label={profiledata.id}
                required />
            <TextField className={classes.TextField}
                variant="outlined"
                fullWidth
                label={profiledata.password}
                required />
            {(sign === profiledata.id) &&
                <StyledButton width="75%" height="60px" text="Update" onClick={profile_update} />
            }
        </EditProfileWrapper>);
}

const EditProfileWrapper = styled.div`
    border: solid 2px #f5d7cb;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 3fr 1fr;
    place-items:center;
    padding: 5%;
`;

const styles = () => ({
    TextField: {
        "& label.Mui-focused": {
            color: "#f5a282"
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                border: "solid 1px #9ed1d9"
            },
            "& .MuiInputBase-input ": {
                fontFamily: "VodafoneRegular",
                fontSize: 16,
                height: 16,
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal"
            }
        }
    }
})

export default withStyles(styles)(App);
