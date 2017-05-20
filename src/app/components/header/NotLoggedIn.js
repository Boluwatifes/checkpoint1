import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedIn = () =>
  (
    <header id="notLoggedIn">
      <nav className="h-auto p-10">
        <div className="nav-wrapper">
          <Link className="brand-logo" to="/">NewsNinja</Link>
          <a href="!#" data-activates="mobile-demo" className="button-collapse" id="nav">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li className="avatar-img">
              <span className="fa fa-user" />
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo" />
          <div className="clear" />
        </div>
      </nav>
    </header>
  );

export default NotLoggedIn;
