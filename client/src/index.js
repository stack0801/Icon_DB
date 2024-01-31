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
  }
  
  a {
    position: relative;
    color: white;
    text-decoration: none;
    transition: color .1s linear;
  }

  h1, h2, h3, h4, h5, p {
    margin: 0;
    padding: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  label {
    font-weight: normal;
    margin-bottom: 0.375em;
    font-size: 1em;
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
