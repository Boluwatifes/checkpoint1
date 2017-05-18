// import required dependencies
import {
  Route,
 Switch, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Body from './Body';
import Favorites from './Favorites';
import Portal from './Portal';
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
          <Route exact path="/" component={localStorage.user ? Portal : Body} />
          <Route path="/favorites" component={localStorage.user ? Favorites : NotFound} />
          <Route component={NotFound} />
          <div className="clear" />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>
);

export default Layout;
