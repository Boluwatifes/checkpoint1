import React from 'react';
import GoogleLogin from 'react-google-login';

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      user: localStorage.getItem('user') ? localStorage.getItem('user') : 'Guest',
      buttonText: localStorage.getItem('user') ? 'Go To Portal' : 'Get Started',
      url: localStorage.getItem('user') ? '/portal' : '/login',
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.errorGoogle = this.errorGoogle.bind(this);
  }

  responseGoogle(response) {
    const profile = response.getBasicProfile();
    const user = {};
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.image = profile.getImageUrl();
    localStorage.setItem('user', JSON.stringify(user));
    location.reload();
  }

  errorGoogle(response) {
    console.log(response);
  }

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
