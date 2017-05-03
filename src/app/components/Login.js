import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import React from 'react';
import GoogleLogin from 'react-google-login';

export default class Login extends React.Component {
  responseGoogle(response) {
    const profile = response.getBasicProfile();
    let user = {};
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.image = profile.getEmail();
    localStorage.setItem('user', profile.getName());
    console.log(localStorage);
  }

  render() {
    return (
      <div className="col s12 home-inner">
        <div className="inner-content">
          <div>
            <GoogleLogin
              clientId="180417168863-aukt9omvuvpg25ernnc6lgupuv4m3uno.apps.googleusercontent.com"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              tag="span"
              disabled="false"
              style={{ opacity: 1 }}
            >
              <span className="waves-effect waves-light btn-large"><i className="fa fa-google" /> Login With Google</span>
            </GoogleLogin>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}