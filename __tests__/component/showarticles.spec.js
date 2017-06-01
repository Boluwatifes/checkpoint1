import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ArticlesStore from '../../src/app/stores/ArticlesStore';
import * as NewsAction from '../../src/app/actions/NewsAction';
import ShowArticles from '../../src/app/components/ShowArticles';
import localStorageMock from '../../src/app/__mock__/localStorage';
import sampleArticles from '../../src/app/__mock__/sampleArticles.json';

window.localStorage = localStorageMock;

describe('<ShowArticles /> component', () => {
  let wrapper;
  let defaultState;
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    }));
    ArticlesStore.getArticles = jest.fn(() => (
      sampleArticles
    ));
    defaultState = {
      source: '',
      articles: [],
      currentSort: '',
      loading: true,
      sortBy: ['top'],
    };
    wrapper = mount(<ShowArticles />);
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  describe('Test for lifecycles', () => {
    it('calls componentWillMount', () => {
      const spy = sinon
      .spy(ShowArticles.prototype, 'componentWillMount');
      mount(<ShowArticles />);
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentDidMount', () => {
      const spy = sinon
      .spy(ShowArticles.prototype, 'componentDidMount');
      wrapper.node.componentDidMount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentWillUnmount', () => {
      const spy = sinon
      .spy(ShowArticles.prototype, 'componentWillUnmount');
      wrapper.unmount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('gets article if default source is set', () => {
      NewsAction.getArticles = jest.fn(() => {
        //
      });
      const spy = sinon
      .spy(NewsAction, 'getArticles');
      wrapper.node.setState({ source: 'bbc-news' });
      wrapper.node.componentWillMount();
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Test for getArticles method', () => {
    it('should set state when called', () => {
      expect(wrapper.instance().state)
      .toEqual(defaultState);
      wrapper.node.getArticles();
      expect(wrapper.instance().state)
      .toEqual({ articles: sampleArticles.articles,
        loading: false,
        currentSort: 'top',
        source: '',
        sortBy: ['top'],
      });
    });
  });

  describe('Test for handleSourceChange', () => {
    it('should change the state when called', () => {
      expect(wrapper.node.state).toEqual(defaultState);
      const e = { value: 'bbc-news', label: 'top' };
      wrapper.node.handlesSourceChange(e);
      expect(wrapper.node.state)
      .toEqual({ articles: sampleArticles.articles,
        loading: true,
        currentSort: 'top',
        source: 'bbc-news',
        sortBy: ['top'],
      });
      expect(window.localStorage.getItem('defaultNews'))
      .toEqual('bbc-news');
    });
  });

  describe('Test for handlesArticleSorting method', () => {
    it('changes the state when called', () => {
      expect(wrapper.node.state).toEqual(defaultState);
      const e = { value: 'bbc-news', label: 'top' };
      wrapper.node.handlesArticleSorting(e);
      expect(wrapper.node.state)
      .toEqual({ articles: sampleArticles.articles,
        loading: true,
        currentSort: 'top',
        source: '',
        sortBy: ['top'],
      });
    });
  });

  describe('Render method', () => {
    it('renders without crashing', () => {
      expect(wrapper.find('.portal').exists()).toBeTruthy();
    });
  });
});
