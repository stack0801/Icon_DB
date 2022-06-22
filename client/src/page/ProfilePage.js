import React, { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import ImageUploader from 'react-images-uploading';
import styled from "styled-components";
import Header from "../component/Header/Header";
import ImageContainer from "../component/ImageContainer";
import StyledInput from "../component/StyledInput";
import StyledButton from "../component/StyledButton";
import axios from "axios"

export default function App() {

    let {user} = useParams();
    const [profiledata, setProfileData] = useState({profilename: "Anonymous.png", nickname: "Anonymous"});
    const [sign, setSign] = useState(null);

    useEffect(() => {
        axios.post('/get_auth')
        .then((res) => {
            setSign(res.data)
        })
    }, []);

    useEffect(() => {
        axios.post('/get_profile', {
            user: user
        })
        .then((res) => {
            setProfileData(res.data[0]);
        });
    }, [user]);

    //프로필 업로드
    const [images, setImages] = useState([]);
    const [nickname, updateNickname] = useState();
    const onNicknameHandler = (e) => { updateNickname(e.currentTarget.value) }
    const maxNumber = 1;
    const onChange = (imageList) => {
        setImages(imageList);
    }
    const onError = (errors) => {
        if (errors)
            alert("이미지는 1개까지만 첨부할 수 있습니다")
    }

    const insert_content = () => {
        if(images.length > 0) {
            const formData = new FormData()
            formData.append("img", images[0].file)
            axios({
                method: 'post',
                url: '/update_profile_img',
                header: { 'content-type': 'multipart/form-data' },
                data: formData
            })
            .then((res) => {
                alert(res.data)
                if (res.data === 'success') 
                    window.location.href = '/profile/' + user
            })
        }

        if(nickname.length > 0) {
            axios
            .post('/update_profile_nickname', {
                nickname: nickname
            })
            .then((res) => {
                alert(res.data)
                if (res.data === 'success') 
                    window.location.href = '/profile/' + user
            })
        }
    }

    return (<>
        <Header />
        <UserPage>
            <ProfilePage>
                <ImageUploader
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    onError={onError}>
                    {({ imageList, onImageUpdate}) => (
                        <>
                        {imageList.length === 0 && <ImageContainer src={"https://webservicegraduationproject.s3.amazonaws.com/userprofile/" + profiledata.profilename} alt="" width="60%" borderRadius="50%"/>}
                        {imageList.map((image, index) => (
                            <ImageContainer key={index} src={image['data_url']} alt="" width="60%" borderRadius="50%"/>
                        ))}
                        <h1>{profiledata.nickname}</h1>
                        {sign === user && <>
                            <StyledInput placeholder = {profiledata.nickname} onChange={onNicknameHandler}/>
                            <StyledButton width = "90%" text = "Edit Profile" onClick={() => onImageUpdate(0)}/>
                            <StyledButton width = "90%" text = "Update" onClick={insert_content}/>
                        </>}
                        </>
                    )}
                </ImageUploader>
            </ProfilePage>

            <FavoritePage>
                <div>favorite list</div>
            </FavoritePage>
        </UserPage>
    </>);
}

const UserPage = styled.div`
    padding-top : 60px;
    width:100vw;
    height: 90vh;
    display: grid;
    grid-template-columns:400px 1fr;
`;

const ProfilePage = styled.div` 
    display: grid;
    grid-template-rows:300px 100px 50px 50px 50px;
    place-items: center;

    padding: 10%;
    border-right: solid 2px #dddddd;
`;

const FavoritePage = styled(ProfilePage)`
border:none;
`;
