import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBox() {
    const [searchbox, setSearchbox] = useState("");
    const navigate = useNavigate();

    const onKeyPress = (e) => { if (e.key === 'Enter') onSubmit() }

    const onSubmit = () => {
        if(searchbox.trim().length >= 1){
            navigate(`/searching/${searchbox}`);
        } else {
            alert("검색하시려면 최소 1자를 입력하세요");
        }
        
    }

    return (
        <Paper
            component="form"
            sx={{ p: '0 10px', display: 'flex', alignItems: 'center', width: '100%', height: '44px', background: '#eff3f6', boxShadow: 'none', borderRadius: '3px' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="아이콘을 검색해 보세요"
                inputProps={{ 'aria-label': 'search your icons' }}
                onChange={(e) => setSearchbox(e.currentTarget.value)}
                onKeyPress={onKeyPress}
                color="#424242"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSubmit}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};