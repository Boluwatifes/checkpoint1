import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Portal from '../../src/app/components/ShowArticles';

describe('Test for <Portal /> component', () => {
  it('should return an instance of a class', () => {
    const wrapper = mount(<Portal />);
    const inst = wrapper.instance();
    expect(inst).to.be.instanceOf(Portal);
  });

  it('should return a default state when called', () => {
    const wrapper = mount(<Portal />);
    const source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    const state = {
      source,
      articles: null,
      currentSort: '',
      loading: true,
      sortBy: ['top'],
    };
    expect(wrapper.nodes[0].state).to.eql(state);
  });

  it('calls componentWillMount', () => {
    sinon.spy(Portal.prototype, 'componentWillMount');
    const wrapper = mount(<Portal />);
    expect(Portal.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('contains a getArticles method', () => {
    const wrapper = shallow(<Portal />);
    expect(wrapper.instance().getArticles()).to.be.defined;
  });

  it('contains a processClick method', () => {
    const wrapper = shallow(<Portal />);
    expect(wrapper.instance().processClick).to.be.defined;
  });

  it('contains a processSort method', () => {
    const wrapper = shallow(<Portal />);
    expect(wrapper.instance().processSort).to.be.defined;
  });

   it('contains a render method', () => {
    const wrapper = mount(<Portal />);
    expect(wrapper.instance().render()).to.be.defined;
  });

  it('contains an article component', () => {
    const wrapper = shallow(<Portal />);
    expect(wrapper.find('.portal')).to.have.length(1);
  });

  it('contains an article component', () => {
    const wrapper = shallow(<Portal />);
    expect(wrapper.instance().render().props.children).to.have.length(3);
  });
});
