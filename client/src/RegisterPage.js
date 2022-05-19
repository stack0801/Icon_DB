import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./LoginRegister.css"
import logo from './logo.svg'
function RegisterPage() {
    const [name, setName] = useState("")
    const [id, setId] = useState("");
    const [password, setPassword] = useState("")

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <>
            <div className='page'>
            <Link to = "/"><img src = {logo} alt = "logo"/></Link>

                <div className='container'>
                    <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} className="loginregister__input" /></div>
                    <div><input name="id" type="text" placeholder="아이디" value={id} onChange={onIdHandler} className="loginregister__input" /></div>
                    <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input" /></div>
                    <div><button type="submit" onSubmit={onSubmit} className="loginregister__button">계정 생성하기</button></div>
                    <div className="link_msg">
                        <span>Already have an account?</span><Link to="/sign_in">Log in</Link>
                    </div>
                </div>

            </div>
        </>
    );
}
export default RegisterPage;