import React, { useState } from "react";
import styled from "styled-components";
import StyledInput from "./StyledInput.js";
import "./LoginRegister.css";
import axios from "axios";

export default function App({ width, height, text, fontSize }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(false);

    const onIdHandler = (event) => { setId(event.currentTarget.value); }

    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value); }

    const checkValid = () => {
        id.length && password.length >= 1
            ? setActive(true)
            : setActive(false)
    }
    const onSubmit = () => {
        axios({
            method: 'post',
            url: '/sign_in',
            data: {
                id: id,
                pw: password
            }
        })
            .then((res) => {
                console.log(res.data)
                if (res.data === 'success') {
                    window.location.href = '/'
                }
            })
    }

    return (
        <StyledButton width={width} height={height} fontSize={fontSize}>
            {text}
            <StyledInput></StyledInput>
            
        </StyledButton>
    )
}



const StyledButton = styled.button`
margin-top: 13px;
background: #f5a282;
color: white;
font-size: 16px;
width: 465px;
border-radius: 40px;
height: 60px;
cursor: pointer;
border: none;
transition-duration: 0.2s;
&:active{
    background: #f28962;
}
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
    font-size: ${(props) => props.fontSize || "20px"};
`;
