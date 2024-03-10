import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import App from './App';

import './styles/_search-bar.css';
import './styles/_header.css';
import './styles/_overrides-new-guide.css';
import './styles/_component.css';
import './styles/_button.css';
import './styles/_typhography-v1-0.css'
import './styles/_grid-v1-0.css';
import './styles/_grid.css'
import './styles/_helpers.css';
import './styles/_clearfix.css';
import './styles/_icondb.css';
import './styles/_author_style.css';
import './styles/_reset.css';
import './styles/_prefixer.css';
import './styles/_general.css';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-base: 'Montserrat', 'Noto Sans KR', sans-serif;
  }

  * {
    box-sizing: border-box;
    outline: none;
  }

  html .mg-none {
    margin: 0;
  }

  html .pd-none {
    padding: 0;
  }

  html .pd-right-lv2-i {
    padding-right: 10px !important;
  }

  html .mg-bottom-lv4-i {
    margin-bottom: 30px !important;
  }

  html .alignl {
    text-align: left;
  }

  html .push-right {
    margin-left: auto;
  }

  html .push-center {
    margin-left: auto;
    margin-right: auto;
  }

  html .full-height {
    height: 100% !important;
  }

  html .block {
    display: block;
  }

  html .font-sm, html .font-xs {
    font-size: 13px;
  }

  html .mg-right-lv3 {
    margin-right: 20px;
  }

  html .semibold {
    font-weight: 600;
  }
  body>* {
    width: 100%;
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
    line-height: 1.25;
  }

  h3 {
    font-size: 1.75em;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  input {
    margin: 0;
    position: relative;
    font: inherit;
    line-height: normal;
    color: inherit;
  }

  input, label, select {
    display: block;
    font-size: 1em;
  } 

  label {
    margin-bottom: 0.375em;
    font-size: 1em;
    font-weight: normal;
  }
`;

const viewport = ReactDOM.createRoot(document.getElementById('viewport'));
viewport.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);
