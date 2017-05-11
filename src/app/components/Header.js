// import required dependencies
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Create a react component
 * @class NotLoggedIn
 */

class NotLoggedIn extends React.Component {
  /**
   * Render react component
   * @method render
   */

  render() {
    return (
      <header>
        <nav className="h-auto p-10">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">Andela24</Link>
            <a href="#" data-activates="mobile-demo" className="button-collapse" id="nav"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down" />
            <ul className="side-nav" id="mobile-demo" />
            <div className="clear" />
          </div>
        </nav>
      </header>
    );
  }
}

/**
 * Create a react component
 * @class LoggedIn
 */

class LoggedIn extends React.Component {
  /**
   * Set user's state to either logged in or not logged in
   * @constructor
   */

  constructor() {
    super();
    this.logMeOut = this.logMeOut.bind(this);
  }

  /**
   * Handles user logout
   * @method logMeOut
   * @param {object} e - Event passed in from the clicked button
   */

  logMeOut(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    location.reload();
  }

  /**
   * Render react component
   * @method render
   */

  render() {
    const user = JSON.parse(localStorage.user);
    return (
      <header>
        <nav className="h-auto p-10">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">Andela24</Link>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/favorites">Favourites</Link></li>
              <li><img className="avatar-img" src={user.image} alt="User Avatar" /></li>
              <li><Link to="/logout" onClick={this.logMeOut}>Logout</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/logout" onClick={this.logMeOut}>Logout</Link></li>
            </ul>
            <div className="clear" />
          </div>
        </nav>
       </header>
    );
  }
}

/**
 * Create and export a react component
 * @class Header
 */

export default class Header extends React.Component {
  /**
   * Render react component
   * @method render
   */

  render() {
    if (localStorage.getItem('user') !== null) {
      return (<LoggedIn />
      );
    }
    return (
      <NotLoggedIn />
    );
  }
}
