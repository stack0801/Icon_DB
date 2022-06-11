import React, { useEffect, useState, useRef, useCallback } from 'react';
import StyledInput from "../component/StyledInput";
import StyledButton from "../component/StyledButton";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Header from "../component/Header/Header";
import Top from "../component/Top";
import ImageDetail from "../component/ImageDetail";
import TopButton from "../component/TopButton";
import Loading from "../component/Loading";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function App() {
    // let { id } = useParams();
    // const [data, setData] = useState({});

    //  useEffect(() => {
    //      axios({
    //          method: 'post',
    //          url: '/user',
    //          data: {
    //              id: id
    //          }
    //      })
    //          .then((res) => {
    //              setData(res.data[0]);
    //              console.log(res.data[0]);
    //          })
    //  }, []);

    return (<>
        <UserPage>
        <StyledInput placeholder="Name"/>
        <StyledInput placeholder="ID"/>
        <StyledInput placeholder="Password"/>
        <StyledButton text="Update"/>
        </UserPage>
        </>
    );
}
const UserPage = styled.div`
    display: grid;
    place-content: center center;
    place-items: center center;
`;