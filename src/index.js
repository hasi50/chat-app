import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// my web firebase
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn8373EFectSDyytN7_mo_sxGPURzEPBk",
  authDomain: "chat-app-f7b6c.firebaseapp.com",
  databaseURL: "https://chat-app-f7b6c-default-rtdb.firebaseio.com",
  projectId: "chat-app-f7b6c",
  storageBucket: "chat-app-f7b6c.firebasestorage.app",
  messagingSenderId: "309417180420",
  appId: "1:309417180420:web:104c67dcaf3691b80f2451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
