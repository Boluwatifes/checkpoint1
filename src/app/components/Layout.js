// import required dependencies
import {
  Route,
 Switch, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Body from './Body';
import Favorites from './Favorites';
import Portal from './Portal';

/**
 * Create an export a react component
 * @class Layout
 */

export default class Layout extends React.Component {
  /**
   * Render react component
   * @method render
   */

  /** create a `NotFound` component that display when the user navigates to an invalid page */
  NotFound() {
    return (
      <div>
        <h2>Page Not Found! </h2>
      </div>
    );
  }

  render() {
    // return the react component
    return (
      <Router>
      <div className="width-100">
        <Header />
        <div className="row home-div m-0">
          <Switch>
            <Route exact path="/" component={localStorage.user ? Portal : Body} />
            <Route path="/favorites" component={localStorage.user ? Favorites : Body} />
            <Route component={this.NotFound} />
            <div className="clear" />
          </Switch>
        </div>
      </div>
    </Router>
    );
  }
}
