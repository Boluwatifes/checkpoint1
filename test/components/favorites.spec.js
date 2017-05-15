import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Favorites from '../../src/app/components/Favorites';

describe('Test for <Favorites /> component', () => {
  it('should return an instance of the class when called', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper.instance.type).to.be.function;
  });

  it('should return an instance of the class when called', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper.instance().render()).to.be.defined;
  });
});