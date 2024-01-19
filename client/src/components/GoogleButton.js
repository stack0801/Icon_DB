import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";

export default function GoogleButton({ onSocial }){

    const handleGoogleInit = useCallback(() => {
        gapi.client.init({
            clientId: process.env.REACT_APP_clientId,
            scope: 'email',
        });
    }, []);

    useCallback(handleGoogleInit, []);

    const handleGoogleSuccess = (response) => {
        const { googleId, profileObj : { email, name } } = response;

        axios.post('/google_sign_in', {
            id: email,
            pw: googleId,
            name: name
        }).then((res) => {
            console.log(res.data);
            if (res.data === 'success') {
                window.location.href = '/';
            }
        }).catch((error) => {
            console.error(error);
            alert("서버에 오류가 발생했습니다.");
        });
    }

    const handleGoogleFailure = (error) => {
        alert("로그인에 실패했습니다.");
    }

    return(
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_clientId}
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure} />
        </div>
    )
}