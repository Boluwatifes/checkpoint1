// import required dependencies
import React from 'react';
import GoogleLogin from 'react-google-login';

/**
 * Create a react component
 * @class Body
 */
export default class Home extends React.Component {
  /**
   * Set user's state to either logged in or not logged in
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.handleLoginResponse = this.handleLoginResponse.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
  }

  /**
   * Handles login success callback
   * and save the user details to localstorage
   * and reloads the page
   * @method responseGoogle
   * @param {object} response - Object returned from google login
   * @return {object} user - Stores user's data to local storage
   */
  handleLoginResponse(response) {
    const profile = response.getBasicProfile();
    const user = {};
    user.id = profile.getId();
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
   * @return {object} response error
   */
  handleLoginError(response) {
    return response;
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    return (
      <div className="col s12 home-inner" id="body">
        <div className="inner-content">
          <div id="index-banner" className="parallax-container">
            <div className="section no-pad-bot">
              <div className="container">
                <br /><br />
                <h1
                  className="header center teal-text text-lighten-2"
                >
                  Hi Guest!
                </h1>
                <div className="row center">
                  <h5
                    className="header col s12 light"
                    style={{ color: 'white' }}
                  >
                  NewsNinja&trade; brings to you all&nbsp;
                    your favorite news at your comfort. News can&#39;t&nbsp;
                    get any better with 70+ news source!
                  </h5>
                </div>
                <div className="row center">
                  <GoogleLogin
                    clientId={process.env.GOOGLE_CLIENT}
                    onSuccess={this.handleLoginResponse}
                    onFailure={this.handleLoginError}
                    tag="span"
                    disabled="false"
                    style={{ opacity: 1 }}
                  >
                    <span className="waves-effect waves-light btn-large">
                      <i className="fa fa-google" />&nbsp;
                        Login With Google
                      </span>
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

