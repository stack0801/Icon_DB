import React, { useState } from "react"
import './Landing.css'
import { FaSearch } from 'react-icons/fa';

export default function Main(){
    return(
        <form>
 
    <div id="top">
        <div></div>
        <h1>GET FREE ICONS</h1>
            <div id="search_box">
                <input id="search_ipt" placeholder="keyword" type="text"></input>
                <button><FaSearch className="search_icon" size="26"/></button>
            </div>
    </div>
    </form>
    )
}
