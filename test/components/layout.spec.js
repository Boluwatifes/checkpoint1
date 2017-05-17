import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {
  Route,
 BrowserRouter as Router, Switch } from 'react-router-dom';
import { shallow } from 'enzyme';
import Header from '../../src/app/components/Header';
import Layout from '../../src/app/components/Layout';
import Body from '../../src/app/components/Body';
import Portal from '../../src/app/components/Portal';
import Favorites from '../../src/app/components/Favorites';

global.localStorage = window.localStorage;
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
    expect(wrapper.find(Router)).to.have.length(1);
  });

  it('contains three <Route /> component', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Route)).to.have.length(3);
  });

  it('display `Body` component if the user is not logged in', () => {
    localStorage.user = null;
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Switch).childAt(0).nodes[0].props.component).to.equal(Body);
  });

  it('display `Portal` component if the user is logged in', () => {
    localStorage.user = 'user';
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Switch).childAt(0).nodes[0].props.component).to.equal(Portal);
  });

  it('display `Favorite` component if the user is logged in', () => {
    localStorage.user = 'user';
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(Switch).childAt(1).nodes[0].props.component).to.equal(Favorites);
  });

  it('display a div with text when user navigates to an alien page', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.node.props.children.props.children[1].props.children.props.children[2].props.component).to.be.function;
  });
});

