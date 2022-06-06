import React from "react";
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';

const SearchBox = styled.div`
    font-size:20px;
    background: white;
    border-radius: 5px;
    width: 450px;
    height: 30px;
    display: grid;
    grid-template-columns: 400px 50px;
    place-items: center;
    border: solid 2px #9ed1d9;
`;

const SearchInput = styled.input`
    text-align: center;
    font-size: 20px;
    border: solid 1px white;
    border-radius: 5px 0 0 5px;
    outline: none;
`;

export default function App() {
    return (
        <SearchBox>
            <SearchInput placeholder = "keyword" type = "text"/>
            <FaSearch size = "20" color = "#9ed1d9" />
        </SearchBox>
    );
}