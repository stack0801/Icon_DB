import React, {useState} from "react";
import styled from "styled-components";
import SearchBoxInput from "./SearchBoxInput";
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

export default function App({width, height}) {
    const [searchbox, setSearchbox] = useState("");

    const onSearchHandler = (e) => { setSearchbox(e.currentTarget.value) }

    const onSubmit = () => {
        if(searchbox.length <= 1){
            alert("2글자 이상 입력해주세요")
        }
        axios({
            method: 'post',
            url: '/searching',
            data: {
                searchbox: searchbox
            }
        })
            .then((res) => {
                console.log(res.data) //아직 받는 데이터 없음(server.js에서 추후 수정)
            })
    }
    return (
        <SearchBox width = {width} height = {height}>
            <SearchBoxInput fontSize="40px" onChange = {onSearchHandler}/>
            <FaSearch size = "20" color = "#9ed1d9" cursor = "pointer" onClick = {onSubmit}/>
        </SearchBox>
    );
}

const SearchBox = styled.div`
    background: white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 9fr 1fr;
    place-items: center;
    border: solid 2px #9ed1d9;

    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
`;

