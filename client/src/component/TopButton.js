import React, { useEffect, useState} from 'react';
import styled from "styled-components";
import { FaArrowUp } from 'react-icons/fa';

export default function App() {
     // 스크롤 위치
     const [scrollPosition, setScrollPosition] = useState(0);
     // 스크롤의 위치를 저장
     const updateScroll = () => {
         setScrollPosition(window.scrollY || document.documentElement.scrollTop);
     }
     useEffect(() => {
         window.addEventListener('scroll', updateScroll);
     });
     
     // 맨 위로 올라가게 함
     const scrollTop = () => {
         window.scrollTo({
             top: 0,
             behavior: 'smooth' 
         });
     };
     return(scrollPosition > 500 && <TopButton onClick={scrollTop}><FaArrowUp size="26" color="white" /></TopButton>);
}

const TopButton =styled.button`
    cursor: pointer;
    position: fixed;
    display: flex;
    bottom: 1.5rem;
    right: 1.5rem;
    background: #9ed1d9;
    padding: 0.5rem;
    font-size: 2rem;
    border: 1.5px solid white;
    border-radius: 50%;
    box-shadow: -1px 0 4px rgba(14, 55, 63, 0.15);
    transition: 0.5s ease-in;
`;