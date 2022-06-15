import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import axios from "axios";
import { Link } from "react-router-dom";

export default function App({ width, height, padding }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => { setId(event.currentTarget.value); }
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value); }

    const onSubmit = () => {
        if (id.length > 0 && password.length > 0) {
            axios
            .post('/sign_in', {
                id: id,
                pw: password
            })
            .then((res) => {
                console.log(res.data)
                if (res.data === 'success')
                    window.location.href = '/';
            })
        }
        else {
            alert("아이디와 비밀번호를 확인해 주십시오.");
        }
    }

    return (
        <StyledContianer width = {width} height = {height} padding = {padding}>
            <StyledInput width = "95%" placeholder = "ID" onChange = {onIdHandler}/>
            <StyledInput width = "95%" placeholder = "Password" type = "password" onChange = {onPasswordHandler}/>
            <StyledButton width = "100%" text = "Sign In" onClick = {onSubmit}/>
            <Msg>Not a Member? <Link to = "/sign_up"><LinkMsg>Sign up</LinkMsg></Link></Msg>
        </StyledContianer>
    )
}

const StyledContianer = styled.div`
    border: solid 2px #ececee;
    background: white;
    border-radius: 15px;
    display: grid;
    justify-items: center;
    gap: 14px;

    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    padding: ${(props) => (props.padding || "5%")};
`;

const LinkMsg = styled.div`
    font-weight: 700;
    text-decoration: none;
    color: #f5a282;
`

const Msg = styled.div`
    font-size: 20px;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 10px
`