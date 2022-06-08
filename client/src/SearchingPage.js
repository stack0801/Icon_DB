import React, { useEffect, useState } from "react";
import Header from "./component/Header/Header";
import Top from "./component/Top";
import TopButton from "./component/TopButton";
import axios from 'axios';

export default function Main() {
    // 유저 로그인 여부
    const [sign, setSign] = useState(null)
    // 접속이후 axios 통신을 이용하여 확인함
    useEffect(() => {
        axios.post('/get_auth')
            .then((res) => {
                setSign(res.data)
                //console.log(res.data)
            })
    }, []);

    return (<>
        <Header />
        <Top text="About"/>
        <TopButton/>
    </>)
}
