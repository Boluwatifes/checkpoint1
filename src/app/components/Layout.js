import {
  Route,
  Redirect,
  withRouter } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Body from './Body';
import Login from './Login';
import Favorites from './Favorites';
import Portal from './Portal';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="width-100">
        <Header />
        <div className="row home-div m-0">
          <Route
            exact path="/" render={() => (
              <Body />
          )}
          />
          <Route path="/login" component={Login} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/portal" component={Portal} />
          <div className="clear" />
        </div>
      </div>
    );
  }
}
