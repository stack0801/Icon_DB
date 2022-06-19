import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header/Header";
import ImageContainer from "../component/ImageContainer";
import { withStyles, TextField } from "@material-ui/core";
import axios from "axios"
import NoImg from "../img/NoImage.png";

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

    return (<>
        <Header />
        <UserPage>
            <ProfilePage>
                <ProfileWrapper>
                    <ImageContainer src={NoImg} alt="" width="60%" borderRadius="50%" />
                    <TextField className={classes.TextField}variant="outlined" label={profiledata.nickname} disabled/>
                    <EditButton href="editprofile">Edit</EditButton>
                </ProfileWrapper>
            </ProfilePage>
            <FavoritePage>
                <div>favorite list</div>
            </FavoritePage>
        </UserPage>
    </>);
}
const UserPage = styled.div`
position:absolute;
    top: 55px;
    width:100vw;
    height: 100vh;
    display: grid;
    grid-template-columns:1fr 3fr;
`;
const ProfilePage = styled.div` 
display: grid;
padding: 10%;
border-right: solid 2px black;
`;

const ProfileWrapper = styled.div`
height:40%;
display: grid;
place-items: center;
padding: 5%
border: solid 2px black;
`;

const EditButton = styled.a`
    display: grid;
    place-items: center;
    width: 50%;
    background: #f5a282;
    color: #ececec;
    font-size: 30px;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    transition-duration: 0.2s;
    &:hover {
        color: white;
    }
    &:active {
        background: #f28962;
    }
`;

const FavoritePage = styled(ProfilePage)`
border:none;
`;


const styles = () => ({
    TextField: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-disabled": {
                border: "solid 1px black"
            },
            "& .MuiInputBase-input ": {
                fontFamily: "VodafoneRegular",
                fontSize: 16,
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
