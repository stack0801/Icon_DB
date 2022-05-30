import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./LoginRegister.css"
import logo from './logo.svg'
import axios from 'axios';

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [id, setId] = useState("");
    const [password, setPassword] = useState("")
    const [active, setActive]=useState(false);

    const onNameHandler = (e) => { setName(e.currentTarget.value) }
    const onIdHandler = (e) => { setId(e.currentTarget.value) }
    const onPasswordHandler = (e) => { setPassword(e.currentTarget.value) }

    //const onSubmit = (e) => { e.preventDefault() }

    const checkValid=()=>{
        id.length && password.length && name.length>=1
        ? setActive(true)
        : setActive(false)
    }

    const onSubmit = () => {
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

    return (
        <div className='page'>
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <div className='login_container'>
                <input className="loginregister__input" type="text" placeholder="이름" value={name} onChange={onNameHandler} onKeyUp={checkValid} />
                <input className="loginregister__input" type="text" placeholder="아이디" value={id} onChange={onIdHandler} onKeyUp={checkValid}/>
                <input className="loginregister__input" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} onKeyUp={checkValid}/>
                <button type="submit" onClick={onSubmit} className={active ? "loginregister__button" : "loginregister_unactive"}>계정 생성하기</button>
            <div className="link_msg">
                <span>Already have an account?</span><Link to="/sign_in">Lo g in</Link>
            </div>
        </div>
        </div>
    )


}