import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase')
                 require('firebase/firestore')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAup30jGg6QV4Dfafj7HGU1vyO-z5tNahY",
  authDomain: "evernote-clone-4b2dd.firebaseapp.com",
  databaseURL: "https://evernote-clone-4b2dd.firebaseio.com",
  projectId: "evernote-clone-4b2dd",
  storageBucket: "evernote-clone-4b2dd.appspot.com",
  messagingSenderId: "508998292212",
  appId: "1:508998292212:web:37125619195ef7489304a1",
  measurementId: "G-JBRQRK2WNW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
