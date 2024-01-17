import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }
  
  a {
    color: white;
    text-decoration: none;
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
