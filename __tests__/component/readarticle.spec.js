import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ReadArticle from '../../src/app/components/ReadArticle';
import ScrapeArticleStore from '../../src/app/stores/ScrapeArticleStore';
import sampleArticles from '../../src/app/__mock__/sampleArticles.json';


describe('ReadArticle component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ReadArticle
        location={{
          search: 'https://newsninja.com/articles?url=' +
          'http://edition.cnn.com/2017/05/23/europe/' +
          'manchester-terror-attack-uk/index.html' }}
      />
    );
    ScrapeArticleStore.processScrappedArticle = jest.fn(() => (
      {
        url: 'url',
        title: 'title',
        image: 'image',
        description: 'description',
        body: 'body',
      }
    ));
  });
  describe('Test for lifecycles', () => {
    it('calls component will mount', () => {
      const spy = sinon.spy(ReadArticle.prototype, 'componentWillMount');
      mount(<ReadArticle
        location={{
          search: 'https://newsninja.com/articles?url=' +
          'http://edition.cnn.com/2017/05/23/europe/' +
          'manchester-terror-attack-uk/index.html' }}
      />);
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentDidMount', () => {
      const spy = sinon
      .spy(ReadArticle.prototype, 'componentDidMount');
      wrapper.node.componentDidMount();
      expect(spy.calledOnce).toBeTruthy();
    });

    it('calls componentWillUnmount', () => {
      const spy = sinon
      .spy(ReadArticle.prototype, 'componentWillUnmount');
      wrapper.unmount();
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Test for states', () => {
    it('displays articles when the page has fully loaded', () => {
      const article = {
        author: 'BBC News',
        title: 'British Airways: Flights' +
        'cancelled amid IT crash',
        description: 'All British Airways flights' +
        'leaving Heathrow and Gatwick are cancelled until 18:00 BST.',
        url: 'http://www.bbc.co.uk/news/uk-40069865',
        urlToImage: 'https://ichef-1.bbci.co.uk' +
        '/news/1024/cpsprodpb/9992/production/_96241393_michaelsingh.jpg',
        publishedAt: '2017-05-27T14:35:52+00:00',
        source: 'bbc-news'
      };
      wrapper.setState({
        article,
        loading: false,
      });
      expect(wrapper.find('.article-body').exists()).toBeTruthy();
    });
  });
});
