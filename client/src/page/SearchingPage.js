import React, { useEffect, useState } from "react";
import Header from "../component/Header/Header";
import TopButton from "../component/TopButton";
import styled from "styled-components";
import axios from 'axios';

export default function Main() {

    // let { keyword } = useParams();
    // const [data, setData] = useState({});

    // useEffect(() => {
    //     axios({
    //         method: 'post',
    //         url: '/get_content',
    //         data: {
    //             id : id
    //         }
    //     })
    //     .then((res) => {
    //         setData(res.data[0]);
    //         console.log(res.data[0]);
    //     })
    // }, []);
    
    return (
        <SearchingPage>
            <Header/>
            <TopButton/>
        </SearchingPage>
    )

    const SearchingPage = styled.div`
        
    `;
}
