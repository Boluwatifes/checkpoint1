import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from '../../src/app/components/Header';
import NotLoggedIn from '../../src/app/components/header/NotLoggedIn';
import LoggedIn from '../../src/app/components/header/LoggedIn';

global.localStorage = window.localStorage;

describe('Test for <Header /> component', () => {
   it('should return an instance of the class when called', () => {
     const wrapper = shallow(<Header />);
     expect(wrapper.instance.type).to.be.function;
  });

  it('should contain a render method', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.instance().render()).to.be.defined;
  });

  it('should return a loggedIn component if user is logged in', () => {
    localStorage.user = 'user';
    const wrapper = shallow(<Header />);
    expect(wrapper.node.type).to.be.function;
  });

  it('should return `NotLoggedIn` component if the user is not signed in', () => {
    localStorage.user = null;
    const wrapper = shallow(<Header />);
    expect(wrapper.node.type).to.equal(NotLoggedIn);
  });

  it('should return `LoggedIn` component if the user is signed in', () => {
    localStorage.user = 'user';
    const wrapper = shallow(<Header />);
    expect(wrapper.node.type).to.equal(LoggedIn);
  });
});
