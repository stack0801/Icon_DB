import React, { useEffect } from "react";

import Banner from "./component/Banner";
import Popular from "./component/PopularSection";
import LogoSection from "./component/LogoSection";
import LandingContainer from "./component/LandingContainer";
import TopIconSearch from "./component/TopIconSearch";
import Desktop from "@_components/common/Header/Desktop";
import TopButton from "@_components/TopButton";
import Footer from "@_components/common/Footer/Footer";

export default function Main() {
  useEffect(() => {
    document.body.classList.add("hero--white");

    return () => {
      document.body.classList.remove("hero--white");
    };
  }, []);

  return (
    <>
      <Desktop />
      <TopButton />
      <main className="home-icons">
        <Banner />
        <Popular />
        <LogoSection />
        <TopIconSearch />
      </main>
      <Footer />
    </>
  );
}
