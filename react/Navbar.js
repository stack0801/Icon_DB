import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const [sign, setSign] = useState(true)
    const onClick = () => {
        setSign((prev) => !prev)
    }

    return (
        <nav className="navbar">
            <div classname="navbar_logo">
            <a href ="/">Home</a>
            </div>
            <ul className="navbar_menu">
                <li className="navbar_menu_menu">
                    <a href="#!">menu1</a>
                    </li>
                    <li className="navbar_menu_menu">
                    <a href="#!">menu2</a>
                    </li>
                    <li className="navbar_menu_menu">
                    <a href="#!">menu3</a>
                    </li>
                </ul>
            <ul className="navbar_icons">
                {sign ? (
                    <li><Link to="/sign_in"><button onClick={onClick}>로그인</button></Link></li>
                ) : (
                    <li><Link to="/sign_up"><button onClick={onClick}>회원가입</button></Link></li>
                )}
            </ul>
        </nav>
    )
}