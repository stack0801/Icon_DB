import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../Logo";
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import axios from 'axios';

export default function App() {

    // 유저 로그인 여부
    const [sign, setSign] = useState(null)
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
            })
    }, []);

    const [HambergerBar, setHambergerBar] = useState(false);
    const showBar = () => setHambergerBar(!HambergerBar);

    return (
        <MobileHeader>
            <Toggle>
                {HambergerBar === false
                    ? <FaBars className = "menubar-open animated" size = "18" onClick={showBar} />
                    : <FaTimes className = "menubar-open animated" size = "20" onClick={showBar} />
                }
            </Toggle>
            <Logo />
            {sign === null
                ? <Link to = "/sign_in"><FaUser className = "header_user" size = "20" /></Link>
                : <Link to = "/user"><FaUser className = "header_user" size = "20" /></Link>
            }
        </MobileHeader>
    )
}

const MobileHeader = styled.div`
  position:fixed;
  background:#9ed1d9;
  width:100vw;
  height:40px;
  font-size: 18px;
  display: grid;   
  grid-template-columns: 20% 1fr 20%;
  place-items:center;
  place-content:center;

    .header_user {
      color: #ececec;
      transition-duration: 0.3s;
      &:hover {
        color: white;
      }
      &:active {
        color: #f5a282;
      }
    }

  .animated {
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    .animated.infinite {
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    .animated.hinge {
      -webkit-animation-duration: 2s;
      animation-duration: 2s;
    }
    @-webkit-keyframes flipInX {
      0% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        -webkit-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
        opacity: 0
      }
      40% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        -webkit-transition-timing-function: ease-in;
        transition-timing-function: ease-in
      }
      60% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1
      }
      80% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg)
      }
      100% {
        -webkit-transform: perspective(400px);
        transform: perspective(400px)
      }
    }
    @keyframes flipInX {
      0% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        -ms-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        -webkit-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
        opacity: 0
      }
      40% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        -ms-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        -webkit-transition-timing-function: ease-in;
        transition-timing-function: ease-in
      }
      60% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        -ms-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1
      }
      80% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        -ms-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg)
      }
      100% {
        -webkit-transform: perspective(400px);
        -ms-transform: perspective(400px);
        transform: perspective(400px)
      }
    }
    .menubar-open {
      -webkit-backface-visibility: visible!important;
      -ms-backface-visibility: visible!important;
      backface-visibility: visible!important;
      -webkit-animation-name: flipInX;
      animation-name: flipInX
    }
}`;

const Toggle = styled.button`
    background-color: #9ed1d9;
    height: 40px;
    color: #ececec;
    border: none;
    cursor: pointer;
    transition-duratio: 0.3s;
    &:hover{
        color: white;
    }
`;