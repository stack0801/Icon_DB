import React from 'react'
import { Link } from "react-router-dom";
import SignupContainer from "./SignupContainer";
import logo from './logo.svg'
import "./Sign.css";

export default function RegisterPage() {
    //const onSubmit = (e) => { e.preventDefault() }
    return (
        <div className='page'>
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <SignupContainer width="100vw" height="50%"/>
        </div>
    )


}