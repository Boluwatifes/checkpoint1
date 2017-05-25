import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import '../utils/firebase-config';
import Favorites from '../../src/app/components/Favorites';

global.localStorage = window.localStorage;

describe('Test for <Favorites /> component', () => {
  it('contains a constructor method', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper.instance().constructor()).to.be.defined;
  });

  it('should return an instance of the class when called', () => {
    localStorage.user = JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    });

    localStorage.article = JSON.stringify({
      0: {
        title: 'Hello World',
        source: 'bbc-news',
        description: 'This is so cool',
        url: 'https://newsninja.herokuapp.com',
        urlToImage: '',
        author: 'Bamidele Daniel',
        publishedAt: '',
      },
    });

    localStorage.defaultNews = 'bbc-news';
    const wrapper = shallow(<Favorites />);
    const inst = wrapper.instance();
    expect(inst).to.be.instanceOf(Favorites);
  });

  it('should return an instance of the class when called', () => {
    localStorage.user = JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    });

    localStorage.article = JSON.stringify({
      0: {
        title: 'Hello World',
        source: 'bbc-news',
        description: 'This is so cool',
        url: 'https://newsninja.herokuapp.com',
        urlToImage: '',
        author: 'Bamidele Daniel',
        publishedAt: '',
      },
    });

    localStorage.defaultNews = 'bbc-news';

    const wrapper = shallow(<Favorites />);
    expect(wrapper.instance().render()).to.be.defined;
  });

  it('calls componentWillMount', () => {
    sinon.spy(Favorites.prototype, 'componentWillMount');
    const wrapper = mount(<Favorites />);
    expect(Favorites.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('calls componentDidMount', () => {
    sinon.spy(Favorites.prototype, 'componentDidMount');
    const wrapper = mount(<Favorites />);
    expect(Favorites.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('calls componentWillUnmount', () => {
    sinon.spy(Favorites.prototype, 'componentWillUnmount');
    const wrapper = mount(<Favorites />);
    Favorites.prototype.componentWillUnmount();
    expect(Favorites.prototype.componentWillUnmount.calledOnce).to.equal(true);
  });

  it('contains a getFavourites method', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper.instance().getFavourites()).to.be.defined;
  });

  it('contains a deleteFavorites method', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper.instance().deleteFavorite()).to.be.defined;
  });
});
