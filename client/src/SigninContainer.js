import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import axios from "axios";
import "./Sign.css";

export default function App({ width, height }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => { setId(event.currentTarget.value); }

    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value); }

    const onSubmit = () => {
        if (id.length && password.length >= 1) {
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
        else {
            alert("아이디와 비밀번호를 확인해 주십시오.");
        }
    }

    return (
        <StyledContianer width={width} height={height}>
            <StyledInput width="70%" height="60px" placeholder="ID" onChange={onIdHandler} />
            <StyledInput width="70%" height="60px" placeholder="Password" type="password" onChange={onPasswordHandler} />
            <StyledButton width="70%" height="60px" text="로그인" onClick={onSubmit} />
            <div className="link_msg"><span>회원이 아니십니까? </span><a href="sign_up">회원가입</a></div>
        </StyledContianer>
    )
}

const StyledContianer = styled.div`
    border: solid 2px #ececee;
    background: white;
    width: 540px;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    place-items: center;
    border-radius: 15px;
    p{
        color:orange;
    }

    width=${(props) => (props.width || "auto")}:
    height=${(props) => (props.height || "auto")}:

`;