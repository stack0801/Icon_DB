import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #header {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
  }
  
  a {
    position: relative;
    color: white;
    text-decoration: none;
    transition: color .1s linear;
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

  img {
    border: 0;
  }

  img, picture {
    margin: 0;
    max-width: 100%;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);
