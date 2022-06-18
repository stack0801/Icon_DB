import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

const clientId = "355939420782-kojnll410kevd1nhmu4972qdve9qa8di.apps.googleusercontent.com";

export default function GoogleButton({ onSocial }){

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "355939420782-kojnll410kevd1nhmu4972qdve9qa8di.apps.googleusercontent.com",
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = async(response) => {

        const { googleId, profileObj : { email, name } } = response;

        axios
        .post('/google_sign_in', {
            id: email,
            pw: googleId,
            name: name
        })
        .then((res) => {
            console.log(res.data)
            if (res.data === 'success')
                window.location.href = '/';
        })
    }
    
    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
        </div>
    )
}