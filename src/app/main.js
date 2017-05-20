// import required dependencies
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDom from 'react-dom';
import Firebase from 'firebase';
import Layout from './components/Layout';
import '../public/assets/sass/styles.scss';
import '../../node_modules/materialize-css/js/materialize';

const app = document.getElementById('app');
 // Firebase Configuration
const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://news-ninja-ed6d3.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESS_ID,
};

// Initialize firebase
Firebase.initializeApp(config);

// renders the react components to the `app` div
ReactDom.render(
  <Router>
    <Layout />
  </Router>,
  app);
