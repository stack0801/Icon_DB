import React from "react";

import Banner from "./component/Banner";
import CategorySection from './component/CategorySection';
import LandingContainer from "./component/LandingContainer";
import Header from "@_components/common/Header/Header";
import TopButton from "@_components/TopButton";

export default function Main() {
    return (
        <>
            <Header />
            <Banner />
            <CategorySection />
            <LandingContainer />
            <TopButton />
        </>
    );
}