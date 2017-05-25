import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import '../utils/firebase-config';
import Articles from '../../src/app/components/Articles';

global.localStorage = window.localStorage;
describe('Test for <Article /> component', () => {
  it('should be an instance of a class', () => {
    const wrapper = mount(<Articles />);
    const inst = wrapper.instance();
    expect(inst).to.be.instanceOf(Articles);
  });

  it('should contain a default state', () => {
    const wrapper = mount(<Articles />);
    const state = {
      articles: [],
      loading: true,
    };
    expect(wrapper.node.state).to.eql(state);
  });

  it('contains a setArticle method', () => {
    const article = [
      {
        title: 'Hello World',
        source: 'Testing App',
        description: 'This is so cool',
        url: 'https://newsninja.herokuapp.com',
        urlToImage: '',
        author: 'Bamidele Daniel',
        publishedAt: '',
      },
    ];
    const wrapper = mount(<Articles />);
    expect(wrapper.instance().setArticles(article)).to.be.defined;
  });
  it('should save articles to database', () => {
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

    localStorage.user = JSON.stringify({
      name: 'Bamidele Daniel',
      email: 'andela-dbamidele@andela.com',
      id: 458655605656956,
    });

    const articleIndex = 0;
    const wrapper = shallow(<Articles />);
    expect(wrapper.instance().saveUsersFavorites(articleIndex)).to.be.defined;
  });
});
