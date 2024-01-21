import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    outline: none;
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
    color: white;
    text-decoration: none;
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
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);
