import React from 'react';
import { shallow } from 'enzyme';
import NotLoggedIn from '../../src/app/components/header/NotLoggedIn';

describe('Test for <NotLoggedIn /> component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotLoggedIn />);
    expect(wrapper.find('#notLoggedIn').exists()).toBeTruthy();
  });
});
