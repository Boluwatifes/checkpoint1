// import required dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import NotLoggedIn from './header/NotLoggedIn';
import LoggedIn from './header/LoggedIn';

export default class Header extends React.Component {
  /**
   * Render react component
   * @method render
   */

  /**
 * Create a react component
 * @method NotLoggedIn
 */
  // NotLoggedIn() {
  //   return (
  //     <header id="notLoggedIn">
  //       <nav className="h-auto p-10">
  //         <div className="nav-wrapper">
  //           <Link className="brand-logo" to="/">Andela24</Link>
  //           <a href="#" data-activates="mobile-demo" className="button-collapse" id="nav"><i className="material-icons">menu</i></a>
  //           <ul className="right hide-on-med-and-down" />
  //           <ul className="side-nav" id="mobile-demo" />
  //           <div className="clear" />
  //         </div>
  //       </nav>
  //     </header>
  //   );
  // }

  /**
   * Handles user logout
   * @method logMeOut
   * @param {object} e - Event passed in from the clicked button
   */

  // logMeOut(e) {
  //   e.preventDefault();
  //   localStorage.removeItem('user');
  //   location.reload();
  // }

  // /**
  //  * Create a react component
  //  * @method LoggedIn
  //  */

  // LoggedIn() {
  //   const user = JSON.parse(localStorage.user);
  //   return (
  //     <header>
  //       <nav className="h-auto p-10">
  //         <div className="nav-wrapper">
  //           <Link className="brand-logo" to="/">Andela24</Link>
  //           <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
  //           <ul className="right hide-on-med-and-down">
  //             <li><Link to="/favorites">Favourites</Link></li>
  //             <li><img className="avatar-img" src={user.image} alt="User Avatar" /></li>
  //             <li><Link to="/logout" onClick={this.logMeOut}>Logout</Link></li>
  //           </ul>
  //           <ul className="side-nav" id="mobile-demo">
  //             <li><Link to="/favorites">Favorites</Link></li>
  //             <li><Link to="/logout" onClick={this.logMeOut}>Logout</Link></li>
  //           </ul>
  //           <div className="clear" />
  //         </div>
  //       </nav>
  //     </header>
  //   );
  // }

  /**
   * Render a react component
   * @method render
   */
  render() {
    if (localStorage.getItem('user') !== null) {
      return (
       <LoggedIn />
      );
    }
    return (
      <NotLoggedIn />
    );
  }
}
