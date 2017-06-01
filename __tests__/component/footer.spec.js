import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../src/app/components/Footer';

describe('Test for Footer component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.footer').exists()).toBeTruthy();
  });
});

