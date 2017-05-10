import React from 'react';
import { expect } from 'chai';
import {
  Route,
 Switch } from 'react-router-dom';
import { shallow } from 'enzyme';
import Header from '../../src/app/components/Header';
import Layout from '../../src/app/components/Layout';

describe('Test for <Layout /> components', () => {
  it('renders one <Header /> components', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders an `.width-100` div', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('.width-100')).to.have.length(1);
  });

  it('contains `.home-div`', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('.home-div')).to.have.length(1);
  });

  it('contains one <Switch /> component', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Switch)).to.have.length(1);
  });

  it('contains four <Route /> component', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Route)).to.have.length(4);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <Foo onButtonClick={onButtonClick} />
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});

