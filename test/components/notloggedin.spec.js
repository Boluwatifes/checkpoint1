import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import NotLoggedIn from '../../src/app/components/header/NotLoggedIn';

describe('Test for <NotLoggedIn /> components', () => {
  it('should return an instance of a class', () => {
    const wrapper = shallow(<NotLoggedIn />);
   expect(wrapper.unrendered.type).to.equal(NotLoggedIn);
  });

   it('contains an header component', () => {
     const wrapper = shallow(<NotLoggedIn />);
     expect(wrapper.node.type).to.equal('header');
  });
})