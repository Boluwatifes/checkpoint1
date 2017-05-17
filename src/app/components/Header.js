// import required dependencies
import React from 'react';
import NotLoggedIn from './header/NotLoggedIn';
import LoggedIn from './header/LoggedIn';

const Header = () => {
  if (localStorage.getItem('user') !== null) {
    return (
      <LoggedIn />
    );
  }
  return (
    <NotLoggedIn />
  );
};

export default Header;
