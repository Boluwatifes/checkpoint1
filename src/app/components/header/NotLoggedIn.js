import React from 'react';
import { Link } from 'react-router-dom';

export default class NotLoggedIn extends React.Component {
  render() {
    return (
    <header id="notLoggedIn">
      <nav className="h-auto p-10">
        <div className="nav-wrapper">
          <Link className="brand-logo" to="/">Andela24</Link>
          <a href="#" data-activates="mobile-demo" className="button-collapse" id="nav"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="#">Login</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo" />
          <div className="clear" />
        </div>
      </nav>
    </header>
    );
  }
}
