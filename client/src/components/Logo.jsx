import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SvgLogo } from "@_assets/brand/logo.svg";

export default function LogoWrapper() {
    return (
        <Link to="/">
            <SvgLogo />
        </Link>
    );
};