import React from "react";
import Header from "../component/Header/Header";
import Top from "../component/LandingPage/Top";
import LandingContainer from "../component/LandingPage/LandingContainer";
import TopButton from "../component/TopButton";

export default function Main() {
    return (<>
        <Header />
        <Top text="GET FREE ICONS" />
        <LandingContainer />
        <TopButton />
    </>);
}