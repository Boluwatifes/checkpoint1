import {
  Route,
 Switch } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Body from './Body';
import Login from './Login';
import Favorites from './Favorites';
import Portal from './Portal';

export default class Layout extends React.Component {
  render() {
    const NotFound = () => {
      return (
        <h2>Page Not Found! </h2>
      );
    };
    return (
      <div className="width-100">
        <Header />
        <div className="row home-div m-0">
          <Switch>
            <Route exact path="/" component={localStorage.user ? Portal : Body} />
            <Route path="/login" component={Login} />
            <Route path="/favorites" component={localStorage.user ? Favorites : Body} />
            <Route component={NotFound} />
            <div className="clear" />
          </Switch>
        </div>
      </div>
    );
  }
}
