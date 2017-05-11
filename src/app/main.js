// import required dependencies
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDom from 'react-dom';
import Layout from './components/Layout';
import '../public/assets/sass/styles.scss';

const app = document.getElementById('app');

// renders the react components to the `app` div
ReactDom.render(
  <Router>
    <Layout />
  </Router>,
  app);
