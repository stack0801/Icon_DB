import React from "react";

import Banner from "./Banner";
import LandingContainer from "./LandingContainer";
import Header from "@_components/Header/Header";
import TopButton from "@_components/TopButton";

export default function Main() {
    return (
        <>
            <Header />
            <Banner />
            <LandingContainer />
            <TopButton />
        </>
    );
}