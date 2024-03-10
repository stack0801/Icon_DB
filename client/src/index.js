import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import App from "./App";

import './styles/_download.css';
import './styles/_transition.css';
import './styles/_bookmarks.css';
import './styles/_home.css';
import './styles/_detail.css';
import './styles/_new-detail.css';
import "./styles/_home-icons.css";
import "./styles/_search-bar.css";
import "./styles/_header.css";
import "./styles/_overrides-new-guide.css";
import "./styles/_component.css";
import "./styles/_button.css";
import "./styles/_typhography-v1-0.css";
import "./styles/_grid-v1-0.css";
import "./styles/_grid.css";
import "./styles/_helpers.css";
import "./styles/_clearfix.css";
import "./styles/_icondb.css";
import "./styles/_author_style.css";
import "./styles/_reset.css";
import "./styles/_prefixer.css";
import "./styles/_general.css";

const GlobalStyle = createGlobalStyle`
  :root {
    --font-base: 'Montserrat', 'Noto Sans KR', sans-serif;
  }

  * {
    box-sizing: border-box;
    outline: none;
  }

  
  html .alignl { text-align: left; }
  html .alignr { text-align: right; }
  html .alignc { text-align: center; }

  
  html .full-height { height: 100% !important; }
  html .block { display: block; }
  html .inline-block { display: inline-block; }
  
  html .mg-none { margin: 0; }
  html .mg-bottom-lv2 { margin-bottom: 10px; }
  html .mg-bottom-lv3 { margin-bottom: 20px; }
  html .mg-bottom-lv4 { margin-bottom: 30px; }
  html .mg-bottom-lv4-i { margin-bottom: 30px !important; }
  html .mg-bottom-lv5 { margin-bottom: 50px } 
  html .mg-left-lv2 { margin-left: 10px; }
  html .mg-left-lv2-i { margin-left: 10px !important; }
  html .mg-right-lv3 { margin-right: 20px; }

  html .pd-none { padding: 0; }
  html .pd-top-lv5 { padding-top: 50px; }
  html .pd-top-lv3 { padding-top: 20px; }
  html .pd-bottom-lv2 { padding-bottom: 10px; }
  html .pd-right-lv2-i { padding-right: 10px !important; }
  html .pd-lv4 { padding: 30px; }


  html .push-left { margin-right: auto; }
  html .push-right { margin-left: auto; }
  html .push-center { 
    margin-left: auto;
    margin-right: auto;
  }

  html .font-sm, html .font-xs { font-size: 13px; }
  html .font-md { font-size: 15px; }
  html .font-lg { font-size: 17px; }
  html .font-xl { font-size: 20px; }

  html .font-h6 {
    font-size: 20px;
    line-height: 1.5;
    font-family: 'Montserrat', 'Noto Sans KR', sans-serif;

    @media screen and (min-width: 640px) {
      font-size: 24px;
      line-height: 1.25;
    }

    @media screen and (min-width: 1400px) {
      font-size: 26px;
    }

    @media screen and (min-width: 480px) {
      font-size: calc(20px + (600vw - 2880px)/920);
    }
  }

  html .semibold { font-weight: 600; }
  html .bold { font-weight: 700; }

  html .hide { display: none; }
  body>* {
    width: 100%;
  }

  main {
    flex: 1;
    overflow: hidden;

    section {
      margin: 0 0 30px;
    }
  }

  h3 {
    font-size: 1.75em;
  }

  ul, ol, dl {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  label {
    margin-bottom: 0.375em;
    font-size: 1em;
    font-weight: normal;
  }

  @media screen and (min-width: 1400px) {
    html .font-h6 {
      font-size: 26px;
    }
  }

  @media screen and (min-width: 640px) {
    html .font-h6 {
      font-size: 24px;
      line-height: 1.25;
    }
  }
`;

const viewport = ReactDOM.createRoot(document.getElementById("viewport"));
viewport.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
