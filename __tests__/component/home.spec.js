import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Home from '../../src/app/components/Home';
import localStorageMock from '../../src/app/__mock__/localStorage';

window.localStorage = localStorageMock;

describe('Test for Home component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('should render without crashing', () => {
    expect(wrapper.find('#body').exists()).toBeTruthy();
  });

  it('should log in a user on successful log in', () => {
    const profile = {
      getBasicProfile: () => (
        {
          getName: () => (
            'Daniel'
          ),
          getEmail: () => (
            'email'
          ),
          getImageUrl: () => (
            'image'
          ),
          getId: () => (
            23345354534
          )
        }
      ),
    };
    const spy = sinon.spy(location, 'reload');
    wrapper.instance().handleLoginResponse(profile);
    expect(spy.calledOnce).toBeTruthy();
    expect(window.localStorage.getItem('user')).toBeDefined();
  });

  it('returns an error when login fails', () => {
    const error = 'Error logging in';
    expect(wrapper.instance().handleLoginError(error)).toEqual(error);
  });
});
