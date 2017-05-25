import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ShowArticles from '../../src/app/components/ShowArticles';
import Articles from '../../src/app/components/Articles';
import SortBy from '../../src/app/components/SortBy';
import Sources from '../../src/app/components/Sources';

global.localStorage = window.localStorage;

describe('Test for <ShowArticles /> component', () => {
  it('should return an instance of a class', () => {
    localStorage.defaultNews = 'bbc-news';
    const wrapper = mount(<ShowArticles />);
    const inst = wrapper.instance();
    expect(inst).to.be.instanceOf(ShowArticles);
  });

  it('should return a default state when called', () => {
    const wrapper = mount(<ShowArticles />);
    const source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    const state = {
      source,
      articles: {},
      currentSort: '',
      loading: true,
      sortBy: ['top'],
    };
    expect(wrapper.nodes[0].state).to.eql(state);
  });

  it('calls componentWillMount', () => {
    sinon.spy(ShowArticles.prototype, 'componentWillMount');
    const wrapper = mount(<ShowArticles />);
    expect(ShowArticles.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('contains a getArticles method', () => {
    localStorage.user = JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    });
    const wrapper = mount(<ShowArticles />);
    expect(wrapper.node.getArticle).to.be.defined;
  });

  it('contains a processSort method', () => {
    const wrapper = shallow(<ShowArticles />);
    expect(wrapper.instance().processSort).to.be.defined;
  });

   it('contains a render method', () => {
    const wrapper = mount(<ShowArticles />);
    expect(wrapper.instance().render()).to.be.defined;
   });

  it('contains an article component', () => {
    const wrapper = shallow(<ShowArticles />);
    expect(wrapper.find(Articles)).to.have.length(1);
  });

  it('contains a sortby component', () => {
    const wrapper = shallow(<ShowArticles />);
    expect(wrapper.find(SortBy)).to.have.length(1);
  });

  it('contains a source component', () => {
    const wrapper = shallow(<ShowArticles />);
    expect(wrapper.find(Sources)).to.have.length(1);
  });
});
