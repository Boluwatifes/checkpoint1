import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import SortBy from '../../src/app/components/SortBy';
import SourceStore from '../../src/app/stores/SourceStore';
import localStorageMock from '../../src/app/__mock__/localStorage';
import sampleSources from '../../src/app/__mock__/sampleSources.json';

window.localStorage = localStorageMock;

describe('SortBy component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SortBy />);
    SourceStore.getSources = jest.fn(() => (
      sampleSources.sources
    ));
  });

  describe('Test for lifecycles', () => {
    it('calls componentWillMount', () => {
      const spy = sinon
      .spy(SortBy.prototype, 'componentWillMount');
      mount(<SortBy />);
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentDidMount', () => {
      const spy = sinon
      .spy(SortBy.prototype, 'componentDidMount');
      wrapper.node.componentDidMount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('receives props', () => {
      expect(wrapper.node.state.currentSource)
      .toEqual('');
      const spy = sinon
      .spy(SortBy.prototype, 'componentWillReceiveProps');
      wrapper.node.componentWillReceiveProps({ currentSource: 'cnn' });
      expect(spy.calledOnce).toBeTruthy();
      expect(wrapper.node.state.currentSource)
      .toEqual('cnn');
    });

    it('calls componentWillUnmount', () => {
      const spy = sinon
      .spy(SortBy.prototype, 'componentWillUnmount');
      wrapper.unmount();
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Test for getSources Method', () => {
    it('sets state when called', () => {
      expect(wrapper.node.state.currentSource)
      .toEqual('');
      wrapper.node.getSources();
      expect(wrapper.node.state.sources)
      .toEqual(sampleSources.sources);
    });
  });
});
