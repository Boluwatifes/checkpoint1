import React from 'react';
import { mount, shallow } from 'enzyme';
import Layout from '../../src/app/components/Layout';
import Home from '../../src/app/components/Home';
import ShowArticles from '../../src/app/components/ShowArticles';
import Favorites from '../../src/app/components/Favorites';
import localStorageMock from '../../src/app/__mock__/localStorage';

window.localStorage = localStorageMock;

describe('Test for Layout components', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Layout />);
    expect(wrapper.find('#header').exists()).toBeTruthy();
    expect(wrapper.find('.footer').exists()).toBeTruthy();
  });

  it('displays Home component if user is not logged in', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.node
    .props.children.props
    .children[1].props.children
    .props.children[0].props.component).toEqual(Home);
    expect(wrapper.node
    .props.children.props
    .children[1].props.children
    .props.children[1].props.component).toEqual(Home);
  });

  it('displays articles if user is not logged in', () => {
    window.localStorage.setItem('user', 'user');
    const wrapper = shallow(<Layout />);
    expect(wrapper.node
    .props.children.props
    .children[1].props.children
    .props.children[0].props.component).toEqual(ShowArticles);
    expect(wrapper.node
    .props.children.props
    .children[1].props.children
    .props.children[1].props.component).toEqual(Favorites);
  });
});
