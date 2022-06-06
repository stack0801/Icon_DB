import React from "react";
import { Link } from "react-router-dom";
import StyledContainer from "./SigninContainer";
import logo from "./logo.svg";
import "./Sign.css";

export default function LoginPage() {
    return (
        <div className="page">
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <StyledContainer width="540px" height="50%">
            </StyledContainer>
        </div>

    )
}
