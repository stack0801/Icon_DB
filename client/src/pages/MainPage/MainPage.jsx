import React, { useEffect } from "react";

import Banner from "./components/Banner";
import Popular from "./components/PopularSection";
import LogoSection from "./components/LogoSection";
import TopIconSearch from "./components/TopIconSearch";
import Desktop from "@_components/common/Header/DesktopHeader/DesktopHeader";
import TopButton from "@_components/TopButton";
import Footer from "@_components/common/Footer/Footer";

export default function MainPage() {
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
