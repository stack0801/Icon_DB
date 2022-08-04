import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


// styled-component를 사용하여 Component화, 다른 파일에도 사용 가능
export default function App({ to, color, text }) {
    return( <Linkdiv to={to} color={color}>{text}</Linkdiv> );
}

const Linkdiv = styled(Link)`
    color: ${(props) => (props.color || "white")};
`;