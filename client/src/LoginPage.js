import React, { useState } from "react";
import { Link } from "react-router-dom";
import './LoginRegister.css'
import logo from './logo.svg'
import axios from 'axios';

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => { setId(event.currentTarget.value); }

    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value); }

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
            <div className="page">
                <Link to="/"><img src={logo} alt="logo" /></Link>
                <div className="login_container">
                    <input className="loginregister__input" type="text" placeholder="아이디" value={id} onChange={onIdHandler} />
                    <input className="loginregister__input" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} />
                    <button type="submit" onClick={onSubmit} className="loginregister__button">로그인</button>
                    <div className="link_msg">
                        <span>Not a Member?</span><Link to="/sign_up">Register</Link>
                    </div>
                </div>
            </div>)
}
