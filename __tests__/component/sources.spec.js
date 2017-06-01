import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Sources from '../../src/app/components/Sources';
import SourceStore from '../../src/app/stores/SourceStore';
import sampleSources from '../../src/app/__mock__/sampleSources.json';

describe('Sources component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Sources />);
    SourceStore.getSources = jest.fn(() => (
      sampleSources.sources
    ));
  });

  describe('Test for lifecycles', () => {
    it('calls componentWillMount', () => {
      const spy = sinon
      .spy(Sources.prototype, 'componentWillMount');
      mount(<Sources />);
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentDidMount', () => {
      const spy = sinon
      .spy(Sources.prototype, 'componentDidMount');
      wrapper.node.componentDidMount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentWillUnmount', () => {
      const spy = sinon
      .spy(Sources.prototype, 'componentWillUnmount');
      wrapper.unmount();
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Test for getSources Method', () => {
    it('sets state when called', () => {
      expect(wrapper.node.state.sources)
      .toEqual({});
      wrapper.node.getSources();
      expect(wrapper.node.state.sources)
      .toEqual(sampleSources.sources);
    });
  });
});
