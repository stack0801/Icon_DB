import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import StyledButton from "./StyledButton";
import axios from "axios";

function App({classes}) {
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

    const profile_update = () => {

    }
    return (
            <ProfileContainer>
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
            </ProfileContainer>
    );
}

const ProfileContainer = styled.div`
    width: 30vw;
    height: 50vh;
    display: grid;
    place-items: center;
    border: solid 2px #ececec;
    border-radius: 5px;
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
