import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Header />
    <Footer />

  </React.StrictMode>,
  document.getElementById('root')
);

