import React from 'react';
import { Link } from 'react-router-dom';

class NotLoggedIn extends React.Component {
  render() {
    return (
      <header>
        <nav className="h-auto p-10">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">Andela24</Link>
            <a href="#" data-activates="mobile-demo" className="button-collapse" id="nav"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/login">Login</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/login">Login</Link></li>
            </ul>
            <div className="clear" />
          </div>
        </nav>
      </header>
    );
  }
}

class LoggedIn extends React.Component {
  constructor() {
    super();
    this.logMeOut = this.logMeOut.bind(this);
  }

  logMeOut(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    location.reload();
  }

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

export default class Header extends React.Component {
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
