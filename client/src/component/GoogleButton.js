import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

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
        console.log(response);
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