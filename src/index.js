import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ContextProvider } from './pages/Context';
// import Du from './pages/Du';
// import Ad from './pages/Ad';
import UiContextProvider from './context/UiContext';
import Dad from './pages/Dad';
import Mad from './pages/Mad';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UiContextProvider>
    <Dad/>
    </UiContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
