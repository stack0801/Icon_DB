import React, { useState } from "react"
import './LoginRegister.css'

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

    return (
        <>
            <div className="page">
                <div className="main_icon"><a href="/">Home</a></div>

                <div className="container">
                    <div><input name="id" type="text" placeholder="아이디" value={id} onChange={onIdHandler} className="loginregister__input" /></div>
                    <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input" /></div>
                    <div><button type="submit" onSubmit={onSubmit} className="loginregister__button">로그인</button></div>
                    <div className="link_msg">
                        <span>Not a Member?</span><a href="/sign_up">Register</a>
                    </div>
                </div>
                
            </div>
        </>
    )
}
