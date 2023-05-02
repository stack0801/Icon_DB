import React, { useState, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function App() {

    //ScreenWidth에 따라 PC버전 / Mobile버전으로 변경
    const [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {
        window.addEventListener('resize', () => {setScreenWidth(window.innerWidth)});
    });
    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    return (screenWidth < 1600 ? <MobileHeader /> : <DesktopHeader />); // screenWidth를 900 기준으로 PC버전과 Mobile버전의 Header 구분
}