// import required dependencies
import {
  Route,
 Switch, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import ShowArticles from './ShowArticles';
import Footer from './Footer';
import NotFound from './NotFound';

/**
 * Create an export a react component
 * @class Layout
 */

const Layout = () => (
  <Router>
    <div className="width-100">
      <Header />
      <div className="row home-div m-0">
        <Switch>
          <Route exact path="/" component={localStorage.user ? ShowArticles : Home} />
          <Route path="/favorites" component={localStorage.user ? Favorites : Home} />
          <Route component={NotFound} />
          <div className="clear" />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default Layout;
