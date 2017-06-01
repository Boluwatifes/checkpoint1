// import required dependencies
import {
  Route,
 Switch, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { createBrowserHistory } from 'history';
import Header from './Header';
import Home from './Home';
import Favorites from './Favorites';
import ShowArticles from './ShowArticles';
import Footer from './Footer';
import NotFound from './NotFound';
import ReadArticle from './ReadArticle';

/**
 * Create an export a react component
 * @class Layout
 */

const history = createBrowserHistory();

/**
 * This is the main layout of the app. It house all other
 * components in routes
 * @function Layout
 * @export
 * @returns {any} - React Layout Component
 */
export default function Layout() {
  return (
    <Router history={history}>
      <div className="width-100">
        <Header />
        <div className="row home-div m-0">
          <Switch>
            <Route
              exact
              path="/"
              component={localStorage.getItem('user')
               ? ShowArticles : Home}
            />
            <Route
              path="/favorites"
              component={localStorage.getItem('user')
              ? Favorites : Home}
            />
            <Route path="/article" component={ReadArticle} />
            <Route component={NotFound} />
            <div className="clear" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
