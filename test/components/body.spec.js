import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import GoogleLogin from 'react-google-login';
import Body from '../../src/app/components/Body';

global.localStorage = window.localStorage;

describe('Test for <Body /> components', () => {
  it('should instantiate a body class when called', () => {
    const wrapper = shallow(<Body />);
    expect(wrapper.instance().constructor).to.equal(Body);
  });

  it('should contain a body div', () => {
    const wrapper = shallow(<Body />);
    expect(wrapper.find('#body')).to.have.length(1);
  }); 

  it('should contain a function that handles login success', () => {
    const wrapper = shallow(<Body />);
    expect(wrapper.find(GoogleLogin).node.props.onSuccess).to.be.defined;
  });

  it('should contain a function that handles login error', () => {
    const wrapper = shallow(<Body />);
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
        };
      },
    };
    const wrapper = shallow(<Body />);
    expect(wrapper.instance().responseGoogle(profile)).to.be.defined;
  });

  it('`errorGoogle` should be called when the login failed', () => {
    const response = '';
    const wrapper = shallow(<Body />);
    expect(wrapper.instance().errorGoogle(response)).to.be.defined;
  });
});
