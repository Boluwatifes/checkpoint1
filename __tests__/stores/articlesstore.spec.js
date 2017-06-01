import ArticlesStore from '../../src/app/stores/ArticlesStore';
import dispatcher from '../../src/app/dispatcher';

jest.mock('../../src/app/dispatcher');
jest.dontMock('../../src/app/stores/ArticlesStore');

describe('Articles Store', () => {
  describe('Test for getArticles method', () => {
    let articles;
    let dispatcherMock;
    beforeEach(() => {
      dispatcherMock = dispatcher.register.mock.calls[0][0];
      articles = {
        0: {
          title: 'Hello World',
        },
        1: {
          title: 'Welcome to React',
        },
      };
    });

    afterEach(() => {
      ArticlesStore.handleActions({ type: 'FETCH_ARTICLES', articles: {} });
    });

    it('should return an empty object on first call', () => {
      expect(ArticlesStore.getArticles()).toEqual({});
    });

    it('should be registered to a dispatcher', () => {
      dispatcherMock({ type: 'FETCH_ARTICLES', articles, });
      expect(ArticlesStore.getArticles()).toEqual(articles);
    });

    it('should return an updated Articles after receiving an action', () => {
      ArticlesStore.handleActions({ type: 'FETCH_ARTICLES', articles, });
      expect(ArticlesStore.getArticles()).toEqual(articles);
    });

    it('should not respond to an action not registered to it', () => {
      ArticlesStore.handleActions({ type: 'GET_ALL_SOURCES', articles, });
      expect(ArticlesStore.getArticles()).toEqual({});
    });
  });
});
