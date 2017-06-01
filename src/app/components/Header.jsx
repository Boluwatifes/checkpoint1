// import required dependencies
import React from 'react';
import NotLoggedIn from './header/NotLoggedIn';
import LoggedIn from './header/LoggedIn';

/**
 * Creates a header component that renders different
 * components depending on the user's login state
 * @function Header
 * @export
 * @returns {any} - React component
 */
export default function Header() {
  if (localStorage.getItem('user') !== undefined &&
    localStorage.getItem('user') !== null) {
    return (
      <LoggedIn />
    );
  }
  return (
    <NotLoggedIn />
  );
}
