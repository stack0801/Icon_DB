import React from "react";

import Banner from "./component/Banner";
import CategorySection from './component/CategorySection';
import LandingContainer from "./component/LandingContainer";
import Desktop from "@_components/common/Header/Dsktop/Desktop";
import TopButton from "@_components/TopButton";

export default function Main() {
    return (
        <>
            <Desktop />
            <Banner />
            <CategorySection />
            <LandingContainer />
            <TopButton />
        </>
    );
}