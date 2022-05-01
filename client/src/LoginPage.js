import React, { useState } from "react"
import { Link } from "react-router-dom";
import './LoginRegister.css'
import logo from './logo.svg'

export default function LoginPage() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (<>
            <div className="page">
                <Link to = "/"><img src = {logo} alt = "logo"/></Link>
                <div className="container">
                    <div><input name="id" type="text" placeholder="아이디" value={id} onChange={onIdHandler} className="loginregister__input" /></div>
                    <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input" /></div>
                    <div><button type="submit" onSubmit={onSubmit} className="loginregister__button">로그인</button></div>
                    <div className="link_msg">
                        <span>Not a Member?</span><a href="/sign_up">Register</a>
                    </div>
                </div>
            </div>
        </>)
}
