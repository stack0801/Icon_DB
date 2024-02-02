import React from "react";
import Header from "@_components/common/Header/Header";
import PostContainer from "@_pages/detail/component/PostContainer";

export default function Detail() {
    return (
        <section id="viewport">
            <Header />
            <PostContainer />
        </section>
    );
}