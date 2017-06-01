import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import '../../src/app/test_files/firebase-config';
import Favorites from '../../src/app/components/Favorites';
import FavoriteStore from '../../src/app/stores/FavoriteStore';
import localStorageMock from '../../src/app/__mock__/localStorage';
import sampleFavorite from '../../src/app/__mock__/sampleFavorite.json';

// jest.mock('sweetalert2');
window.localStorage = localStorageMock;

describe('Favorites', () => {
  let wrapper;
  beforeEach(() => {
    FavoriteStore.getFavorites = jest.fn(() => (
      sampleFavorite
    ));
    window.localStorage.setItem('user', JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    }));
    window.localStorage.setItem('articles', JSON.stringify([
      {
        title: 'Hello World',
        source: 'bbc-news',
        description: 'This is so cool',
        url: 'https://newsninja.herokuapp.com',
        urlToImage: '',
        author: 'Bamidele Daniel',
        publishedAt: '',
      },
    ]));
    window.localStorage.setItem('defaultNews', 'aljazerra');
    wrapper = mount(<Favorites />);
  });

  describe('Test for life cycles', () => {
    it('calls component will mount', () => {
      const spy = sinon.spy(Favorites.prototype, 'componentWillMount');
      mount(<Favorites />);
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentDidMount', () => {
      const spy = sinon.spy(Favorites.prototype, 'componentDidMount');
      wrapper.instance().componentDidMount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentWillUnmount', () => {
      const spy = sinon.spy(Favorites.prototype, 'componentWillUnmount');
      wrapper.instance().componentWillUnmount();
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Tests for class methods', () => {
    it('sets state when getFavorites is called', () => {
      expect(wrapper.node.state).toEqual({
        favorites: [],
        loading: true,
      });
      wrapper.node.getFavourites();
      expect(wrapper.node.state).toEqual({
        favorites: sampleFavorite,
        loading: false,
      });
    });

    it('deletes a favorite when deleteFavorites is called', () => {
      expect(wrapper.node.deleteFavorite('hello')).toBeTruthy();
    });
  });
});

