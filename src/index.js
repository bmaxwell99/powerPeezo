import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBbvFupHZqFu3MvUOk_tSFg-cLxyU7iQDs",
    authDomain: "final-project-bmaxwell99.firebaseapp.com",
    databaseURL: "https://final-project-bmaxwell99.firebaseio.com",
    projectId: "final-project-bmaxwell99",
    storageBucket: "final-project-bmaxwell99.appspot.com",
    messagingSenderId: "889681824709",
    appId: "1:889681824709:web:8702c7690f3015676dd9ac",
    measurementId: "G-6KQHXP0QED"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
