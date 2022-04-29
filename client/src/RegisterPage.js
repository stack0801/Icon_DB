import React, { useState } from 'react'
import "./LoginRegister.css"

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
            <div className="main_icon"><a href="/">Home</a></div>

                <div className='container'>
                    <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} className="loginregister__input" /></div>
                    <div><input name="id" type="text" placeholder="아이디" value={id} onChange={onIdHandler} className="loginregister__input" /></div>
                    <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input" /></div>
                    <div><button type="submit" onSubmit={onSubmit} className="loginregister__button">계정 생성하기</button></div>
                    <div className="link_msg">
                        <span>Already have an account?</span><a href="/sign_in">Log in</a>
                    </div>
                </div>

            </div>
        </>
    );
}
export default RegisterPage;