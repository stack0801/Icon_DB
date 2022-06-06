import React, { useState, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function App() {

    const [state, setState] = useState({ mobileView: false });
    const { mobileView } = state;
    
    useEffect(() => {
        const setResponse = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }))
        }
        setResponse();

        window.addEventListener("resize", () => setResponse());

        return () => {
            window.removeEventListener("resize", () => setResponse());
        };
    }, []);

    return (<>
        {mobileView ? <MobileHeader /> : <DesktopHeader />}
    </>)
}