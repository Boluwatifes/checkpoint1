import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import SelectDefaultSource from '../../src/app/components/SelectDefaultSource';

global.localstorage = window.localStorage;

describe('Test for <SelectDefaultSource /> component', () => {
  it('should instantiate a class', () => {
    localStorage.user = JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    });
    const wrapper = mount(<SelectDefaultSource props={{ anything: 'anything' }} />);
    expect(wrapper.instance().constructor()).to.be.defined;
  });

  it('calls componentWillMount once', () => {
    sinon.spy(SelectDefaultSource.prototype, 'componentWillMount');
    const wrapper = mount(<SelectDefaultSource props={{ anything: 'anything' }} />);
    expect(SelectDefaultSource.prototype.componentWillMount.calledOnce).to.be.true;
  });

  // it('contains a method that get sources', () => {
  //   const wrapper = mount(<SelectDefaultSource props={{ anything: 'anything' }} />);
  //   wrapper.instance().state.sources = {
  //     0: {
  //       title: 'Hello',
  //     },
  //     1: {
  //       title: 'world',
  //     }
  //   };
  //   console.log(wrapper.instance());
  //   expect(wrapper.instance().getSources()).to.be.func;
  // });
});
