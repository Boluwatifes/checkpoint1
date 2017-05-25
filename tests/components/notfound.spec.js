import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NotFound from '../../src/app/components/NotFound';

describe('Test for <NotFound /> component', () => {
  it('should contain a #notFound div', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('#notFound')).to.have.length(1);
  });
});
