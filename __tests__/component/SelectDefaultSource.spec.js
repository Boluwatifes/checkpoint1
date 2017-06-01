import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import SourceStore from '../../src/app/stores/SourceStore';
import SelectDefaultSource from '../../src/app/components/SelectDefaultSource';
import localStorageMock from '../../src/app/__mock__/localStorage';
import sampleSources from '../../src/app/__mock__/sampleSources.json';

window.localStorage = localStorageMock;

describe('SelectDefaultSource component', () => {
  let wrapper;
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    }));
    wrapper = mount(<SelectDefaultSource />);
    SourceStore.getSources = jest.fn(() => (
      sampleSources.sources
    ));
  });

  describe('Test for components lifecycle', () => {
    it('calls componentWillMount', () => {
      const spy = sinon
      .spy(SelectDefaultSource.prototype, 'componentWillMount');
      mount(<SelectDefaultSource />);
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentDidMount', () => {
      const spy = sinon
      .spy(SelectDefaultSource.prototype, 'componentDidMount');
      wrapper.node.componentDidMount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentWillUnmount', () => {
      const spy = sinon
      .spy(SelectDefaultSource.prototype, 'componentWillUnmount');
      wrapper.unmount();
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Test for getSources method', () => {
    it('change state when called', () => {
      expect(wrapper.instance().state).toEqual({ sources: {}, loading: true, });
      wrapper.node.getSources();
      const expectedState = { sources: sampleSources.sources, loading: false };
      expect(wrapper.instance().state).toEqual(expectedState);
    });
  });

  describe('Test for setDefaultNews method', () => {
    it('sets default news to localStorage when called', () => {
      expect(window.localStorage.getItem('defaultNews'))
        .toEqual(undefined);
      const e = { value: 'bbc-news' };
      wrapper.node.setDefaultNews(e);
      expect(window.localStorage.getItem('defaultNews'))
        .toEqual('bbc-news');
    });

    it('reloads the page after setting default news', () => {
      const spy = sinon.spy(location, 'reload');
      const e = { value: 'bbc-news' };
      wrapper.node.setDefaultNews(e);
      expect(spy.calledOnce).toBeTruthy();
    });
  });
});
