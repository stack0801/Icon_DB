import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import Header from "../component/Header/Header";
import TopButton from "../component/TopButton";
import styled from "styled-components";
import axios from 'axios';

export default function App() {

    let { keyword } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/search',
            data: {
                searchbox: keyword
            }
        })
            .then((res) => {
                setData(res.data)
                console.log(res.data) //아직 받는 데이터 없음(server.js에서 추후 수정)
            })
    }, []);

    return (<>
        <Header />
        <SearchingPage>
            {data.map((list, idx) => (
                <div key={idx}>
                    <Link to={"/post/" + list.content_id}>
                        <div className="icon-list">
                            <img src={"https://webservicegraduationproject.s3.amazonaws.com/img/" + list.content_id + ".png"} alt="no_img" />
                        </div>
                    </Link>
                </div>
            ))}
            <TopButton />
        </SearchingPage>
    </>);
}

const SearchingPage = styled.div`
    display: grid;
    place-items: center;
    place-content: center;
`;
