import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function App({ width, height, fontSize }) {
    const [searchbox, setSearchbox] = useState("");
    const navigate = useNavigate();

    const onKeyPress = (e) => { if (e.key === 'Enter') onSubmit() }

    const onSubmit = () => {
        navigate(`/searching/${searchbox}`);
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="아이콘을 검색해 주세요"
                inputProps={{ 'aria-label': 'search your icons' }}
                onChange={(e) => setSearchbox(e.currentTarget.value)}
                onKeyPress={onKeyPress}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSubmit}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};