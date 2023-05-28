import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "../SearchBox";
import ImageContainer from "../ImageContainer";
import LinkButton from "../LinkButton";
import Logo from "../Logo";
import axios from 'axios';

export default function App() {
    const [sign, setSign] = useState(null);
    const [profiledata, setProfileData] = useState({ profilename: "Anonymous.png", nickname: "Anonymous" });

    useEffect(() => {
        console.log(sign);
        axios.post('/get_auth')
            .then((res) => {
                let data = res.data
                setSign(data)
                axios.post('/get_profile', {
                    user: data
                })
                    .then((res) => {
                        setProfileData(res.data[0])
                    })
            })
    }, []);

    const signOut = () => {
        axios
            .post('/sign_out')
            .then((res) => {
                console.log(res.data)
                if (res.data === 'success')
                    window.location.href = '/';
            })
    }

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY >= 500)
            setScroll(true);
        else
            setScroll(false);
    };

    //Editor Open
    const openEditor = () => {
        window.open(process.env.REACT_APP_URL + ':8000/src/editor/')
    }

    return (
        <Page sign={sign}>
            <Container>
                <Logo />
                {scroll === false
                    ? <div />
                    : <SearchBox width="450px" height="30px" />
                }
                <Link to="/posting"><LinkButton color="#9ED1D9" text="Posting" /></Link>
                <LinkButton text="Edit" onClick={openEditor} />
                {sign !== null && <Link to={"/profile/" + sign}>
                    <ImageContainer src={"https://webservicegraduationproject.s3.amazonaws.com/userprofile/" + profiledata.profilename} alt="" width="45px" height="45px" borderRadius="50%" />
                </Link>}
                {sign === null ?
                    <Link to="/sign_in"><LinkButton text="Sign in" /></Link> :
                    <LinkButton onClick={signOut} text="sign out" />
                }
            </Container>
        </Page>
    )
}

const Page = styled.div`
    position: fixed;
    width: 100vw;
    height: 65px;
    background: rgba(255,255,255,0.4);
    border-bottom: solid 1px #000000;
    font-size: 18px;
    display: grid;
    place-items: center;
    z-index: 999;
}`;

const Container = styled.div`
    width: 1800px;
    display: grid;
    place-items: center;
    grid-template-columns: ${(props) => (props.sign === null ? "15% 1fr repeat(3,10%)" : "15% 1fr repeat(4,10%)")};
`;