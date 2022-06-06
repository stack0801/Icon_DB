import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import axios from "axios";

export default function App({ width, height }) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onNameHandler = (e) => { setName(e.currentTarget.value) }
    const onIdHandler = (e) => { setId(e.currentTarget.value) }
    const onPasswordHandler = (e) => { setPassword(e.currentTarget.value) }

    const onSubmit = () => {
        if (id.length && password.length && name.length >= 1) {
            axios({
                method: 'post',
                url: '/sign_up',
                data: {
                    name: name,
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
            alert("입력 칸을 알맞게 입력해주십시오.");
        }
    }

    return (
        <StyledContianer width={width} height={height}>
            <StyledInput width="95%" height="60px" placeholder="Name" onChange={onNameHandler} />
            <StyledInput width="95%%" height="60px" placeholder="ID" onChange={onIdHandler} />
            <StyledInput width="95%" height="60px" placeholder="Password" type="password" onChange={onPasswordHandler} />
            <StyledButton width="100%" height="60px" text="회원가입" onClick={onSubmit} />
            <div className="link_msg"><span>아이디가 있으십니까? </span><a href="sign_in">로그인</a></div>
        </StyledContianer>
    )
}

const StyledContianer = styled.div`
    border: solid 2px #ececee;
    background: white;
    border-radius: 15px;
    display: grid;
    grid-template-rows : 1fr 1fr 1fr 1fr;
    justify-items: center;
    gap: 5px;
    
    width=${(props) => (props.width || "auto")};
    height=${(props) => (props.height || "auto")};
`;