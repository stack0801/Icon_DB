import React, { useEffect } from "react";

import Header from "@_components/common/Header/Header";
import PostContainer from "@_pages/detail/component/PostContainer";
import Footer from "@_components/common/Footer/Footer";

export default function Detail() {
  useEffect(() => {
    document.body.classList.add("view--detail", "hero--white", "notouch");

    return () => {
      document.body.classList.remove("view--detail", "hero--white", "notouch");
    };
  }, []);

  return (
    <>
      <Header />
      <PostContainer />
      <Footer />
    </>
  );
}
