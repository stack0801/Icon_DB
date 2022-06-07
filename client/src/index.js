import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
  a {
    color: white;
    text-decoration: none;
  }
  ul{
    display: grid;
    place-items:center;
    place-content:center;
    grid-template-columns: 1fr 1fr;
    color: white;
    list-style: none;
    padding-inline-start: 0;
  }
  li{
    float: left;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>
);
