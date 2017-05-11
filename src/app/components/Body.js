// import required dependencies
import React from 'react';
import GoogleLogin from 'react-google-login';

/**
 * Create a react component
 * @class Body
 */

export default class Body extends React.Component {
  /**
   * Set user's state to either logged in or not logged in
   * @constructor
   */

  constructor() {
    super();
    this.state = {
      user: localStorage.getItem('user') ? localStorage.getItem('user') : 'Guest',
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.errorGoogle = this.errorGoogle.bind(this);
  }

  /**
   * Handles login success callback
   * @method responseGoogle
   * @param {object} response - Object returned from google login
   */
  responseGoogle(response) {
    const profile = response.getBasicProfile();
    const user = {};
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.image = profile.getImageUrl();
    localStorage.setItem('user', JSON.stringify(user));
    location.reload();
  }

  /**
   * Handles login error callback
   * @method errorGoogle
   * @param {object} response - Object returned from google login
   */
  errorGoogle(response) {
    console.log(response);
  }

  /**
   * Render react component
   * @method render
   */

  render() {
    return (
        <div className="col s12 home-inner">
          <div className="inner-content">
            <div id="index-banner" className="parallax-container">
              <div className="section no-pad-bot">
                <div className="container">
                  <br /><br />
                  <h1 className="header center teal-text text-lighten-2">Hi Guest!</h1>
                  <div className="row center">
                    <h5 className="header col s12 light">Fast News brings to you all your favorite news at your comfort. News can't get any better with 70+ news source!</h5>
                  </div>
                  <div className="row center">
                    <GoogleLogin
                      clientId="180417168863-aukt9omvuvpg25ernnc6lgupuv4m3uno.apps.googleusercontent.com"
                      onSuccess={this.responseGoogle}
                      onFailure={this.errorGoogle}
                      tag="span"
                      disabled="false"
                      style={{ opacity: 1 }}
                    >
                      <span className="waves-effect waves-light btn-large"><i className="fa fa-google" /> Login With Google</span>
                    </GoogleLogin>
                  </div>
                  <br />
                </div>
              </div>
              <div className="parallax" />
            </div>
          </div>
          <div className="clear" />
        </div>
    );
  }
}
