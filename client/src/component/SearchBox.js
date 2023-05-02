import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

export default function App({ width, height, fontSize }) {
    const [searchbox, setSearchbox] = useState("");
    const navigate = useNavigate();

    const onKeyPress = (e) => { if (e.key === 'Enter') onSubmit() }

    const onSubmit = () => {
        navigate(`/searching/${searchbox}`);
    }

    return (
        <SearchBox width={width} height={height}>
            <SearchInput width={width}
                placeholder="keyword"
                fontSize={fontSize}
                onChange={(e) => setSearchbox(e.currentTarget.value)}
                onKeyPress={onKeyPress}
            />
            <FaSearch size="20" color="#9ED1D9" cursor="pointer" onClick={onSubmit} />
        </SearchBox>
    );
}

const SearchBox = styled.div`
    display: grid;
    grid-template-columns: 9fr 1fr;
    place-items: center;    
    background: white;
    border: solid 2px #9ED1D9;
    border-radius: 5px;

    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
`;

const SearchInput = styled.input`
    width: 90%;
    text-align: center;
    border: solid 1px white;
    border-radius: 5px 0 0 5px;
    outline: none;

    font-size: ${(props) => props.fontSize || "20px"};
`;
