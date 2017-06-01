import ScrapeArticleStore from '../../src/app/stores/ScrapeArticleStore';
import dispatcher from '../../src/app/dispatcher';

jest.mock('../../src/app/dispatcher');
jest.dontMock('../../src/app/stores/ScrapeArticleStore');

describe('ScrappedArticles Store', () => {
  describe('Test for getScrappedArticles method', () => {
    let scrappedArticle;
    let dispatcherMock;
    beforeEach(() => {
      dispatcherMock = dispatcher.register.mock.calls[0][0];
      scrappedArticle = {
        0: {
          title: 'Hello World',
        },
        1: {
          title: 'Welcome to React',
        },
      };
    });

    afterEach(() => {
      ScrapeArticleStore.handleActions({
        type: 'SCRAPPED_ARTICLE', scrappedArticle: {} });
    });

    it('should return an empty object on first call', () => {
      expect(ScrapeArticleStore.getSrappedArticle()).toEqual({});
    });

    it('should be registered to a dispatcher', () => {
      dispatcherMock({ type: 'SCRAPPED_ARTICLE', scrappedArticle, });
      expect(ScrapeArticleStore.getSrappedArticle()).toEqual(scrappedArticle);
    });

    it('should return an updated Articles after receiving an action', () => {
      ScrapeArticleStore.handleActions({
        type: 'SCRAPPED_ARTICLE', scrappedArticle, });
      expect(ScrapeArticleStore.getSrappedArticle()).toEqual(scrappedArticle);
    });

    it('should not respond to an action not registered to it', () => {
      ScrapeArticleStore.handleActions({
        type: 'GET_ALL_SOURCES', scrappedArticle, });
      expect(ScrapeArticleStore.getSrappedArticle()).toEqual({});
    });
  });
});
