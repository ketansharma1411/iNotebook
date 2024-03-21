import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Notestate from './context/Notestate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Notestate>
    <App />
    </Notestate>
  </React.StrictMode>
  
);


reportWebVitals();
