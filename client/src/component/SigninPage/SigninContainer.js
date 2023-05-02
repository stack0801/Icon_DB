import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import GoogleButton from "../GoogleButton";
import axios from "axios";

export default function App({ width, height, padding }) {
    //ID, 비밀번호
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => { setId(event.currentTarget.value); }
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value); }
    const onKeyPress = (e) => { if (e.key === 'Enter') onSubmit() }

    const onSubmit = () => {
        if (id && password) {
            axios.post('/sign_in', {
                id: id,
                pw: password
            })
                .then((res) => {
                    if (res.data === "success")
                        window.location.href = '/';
                    else //로그인 실패할 시 Error
                        alert("아이디와 비밀번호를 확인해 주십시오.");
                })
        } else {
            alert("아이디와 비밀번호를 확인해 주십시오.");
        }
    }

    return (
        <StyledContianer width={width} height={height} padding={padding}>
            <StyledInput width="95%" placeholder="ID" onChange={onIdHandler} />
            <StyledInput width="95%" placeholder="Password" type="password" onChange={onPasswordHandler} onKeyPress={onKeyPress} />
            <StyledButton width="100%" text="Sign In" onClick={onSubmit} />
            <GoogleButton />
            <Msg>Not a Member? <Link to="/sign_up"><LinkMsg>Sign up</LinkMsg></Link></Msg>
        </StyledContianer>
    )
}

const StyledContianer = styled.div`
    display: grid;
    justify-items: center;
    gap: 14px;
    background: white;
    border: solid 2px #ECECEC;
    border-radius: 15px;

    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    padding: ${(props) => (props.padding || "5%")};
`;

const LinkMsg = styled.div`
    font-weight: 700;
    color: #F5A282;
    text-decoration: none;
`

const Msg = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 10px;
    font-size: 20px;
`