import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";

export default function GoogleButton({ onSocial }){

    // 리팩토링 후 코드
    useEffect(() => {
        const loadGoogleApi = async () => {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://apis.google.com/js/api.js';
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });

            gapi.load('client:auth2', () => {
                gapi.client.init({
                    clientId: process.env.REACT_APP_clientId,
                    scope: 'email',
                });
            });
        };

        loadGoogleApi();
    }, []);

    const handleGoogleSuccess = (response) => {
        const { googleId, profileObj : { email, name } } = response;

        axios.post('/google_sign_in', {
            id: email,
            pw: googleId,
            name: name
        }).then((res) => {
            console.log(res.data);
            if(res.data === 'success') {
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

    // 리팩토링 전 기존 코드
    // const handleGoogleInit = useCallback(() => {
    //     gapi.client.init({
    //         clientId: process.env.REACT_APP_clientId,
    //         scope: 'email',
    //     });
    // }, []);

    // useCallback(handleGoogleInit, []);

    // const handleGoogleSuccess = (response) => {
    //     const { googleId, profileObj : { email, name } } = response;

    //     axios.post('/google_sign_in', {
    //         id: email,
    //         pw: googleId,
    //         name: name
    //     }).then((res) => {
    //         console.log(res.data);
    //         if (res.data === 'success') {
    //             window.location.href = '/';
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //         alert("서버에 오류가 발생했습니다.");
    //     });
    // }

    // const handleGoogleFailure = (error) => {
    //     alert("로그인에 실패했습니다.");
    // }

    return(
        <GoogleSignButton>
            <GoogleLogin
                clientId={process.env.REACT_APP_clientId}
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure} />
        </GoogleSignButton>
    )
}

const GoogleSignButton = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;