import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Footer from '../../src/app/components/Footer';

describe('Test for <Footer /> component', () => {
  it('should contain a footer class', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.footer')).to.have.length(1);
  });
});
