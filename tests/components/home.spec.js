import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import GoogleLogin from 'react-google-login';
import Home from '../../src/app/components/Home';

global.localStorage = window.localStorage;

describe('Test for <Home /> components', () => {
  it('should instantiate a Home class when called', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.instance().constructor).to.equal(Home);
  });

  it('should contain a Home div', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('#body')).to.have.length(1);
  }); 

  it('should contain a function that handles login success', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(GoogleLogin).node.props.onSuccess).to.be.defined;
  });

  it('should contain a function that handles login error', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(GoogleLogin).node.props.onFailure).to.be.defined;
  });

  it('`responseGoogle` should process login data when called', () => {
    const profile = {
      getBasicProfile: () => {
        return {
          getName: () => {
            return 'Daniel';
          },
          getEmail: () => {
            return 'email';
          },
          getImageUrl: () => {
            return 'image';
          },
          getId: () => {
            return 23345354534;
          }
        };
      },
    };
    const wrapper = shallow(<Home />);
    expect(wrapper.instance().handleLoginResponse(profile)).to.be.defined;
  });

  it('`errorGoogle` should be called when the login failed', () => {
    const response = '';
    const wrapper = shallow(<Home />);
    expect(wrapper.instance().handleLoginError(response)).to.be.defined;
  });

  it('contains a render method', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.instance().render()).to.be.defined;
  });
});
