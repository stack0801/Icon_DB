import React, { useState, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function App() {
    //스크린 가로
    const [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {
        window.addEventListener('resize', () => {setScreenWidth(window.innerWidth)});
    });
    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    return (screenWidth < 900 ? <MobileHeader /> : <DesktopHeader />)
}