import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import LoggedIn from '../../src/app/components/header/LoggedIn';

describe('Test for <LoggedIn /> component', () => {
  it('should contain a constructor', () => {
    localStorage.user = JSON.stringify({ name: 'Daniel', email: 'greatbolutife@gmail.com' });
    const wrapper = shallow(<LoggedIn />);
    expect(wrapper.instance().constructor().logMeOut).to.be.defined;
  });

  it('should be an instance of a class', () => {
    localStorage.user = JSON.stringify({ name: 'Daniel', email: 'greatbolutife@gmail.com' });
    const wrapper = shallow(<LoggedIn />);
    expect(wrapper.unrendered.type).to.equal(LoggedIn);
  });

  it('contains an header component', () => {
    const wrapper = shallow(<LoggedIn />);
    expect(wrapper.node.type).to.equal('header');
  });

  it('contains a method that log users out', () => {
    const e = {
      preventDefault() {
        return 'PreventDefault';
      },
    };
    const wrapper = shallow(<LoggedIn />);
    expect(wrapper.instance().logMeOut(e)).to.be.defined;
  });
});
