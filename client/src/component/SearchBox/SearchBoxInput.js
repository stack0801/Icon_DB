import React from "react";
import styled from "styled-components";

export default function App({onChange}){
    return(
        <SearchBoxInput placeholder="Search" onChange={onChange}/>
    )
}
const SearchBoxInput = styled.input`
    text-align: center;
    width:98%;
    border: solid 1px white;
    outline: none;
    font-size:20px;
`;