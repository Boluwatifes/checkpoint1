import SourceStore from '../../src/app/stores/SourceStore';
import dispatcher from '../../src/app/dispatcher';

jest.mock('../../src/app/dispatcher');
jest.dontMock('../../src/app/stores/ArticlesStore');

describe('Sources Store', () => {
  describe('Test for getSource method', () => {
    let sources;
    let dispatcherMock;
    beforeEach(() => {
      dispatcherMock = dispatcher.register.mock.calls[0][0];
      sources = {
        0: {
          id: 'bbc-news',
        },
        1: {
          id: 'aljazeera',
        },
      };
    });

    afterEach(() => {
      SourceStore.handleActions({ type: 'GET_ALL_SOURCES', sources: {} });
    });

    it('should return an empty object on first call', () => {
      expect(SourceStore.getSources()).toEqual({});
    });

    it('should be registered to a dispatcher', () => {
      dispatcherMock({ type: 'GET_ALL_SOURCES', sources, });
      expect(SourceStore.getSources()).toEqual(sources);
    });

    it('should return an updated sources after receiving an action', () => {
      SourceStore.handleActions({ type: 'GET_ALL_SOURCES', sources, });
      expect(SourceStore.getSources()).toEqual(sources);
    });

    it('should not respond to an action not registered to it', () => {
      SourceStore.handleActions({ type: 'GET_ALL_ARTICLES', sources, });
      expect(SourceStore.getSources()).toEqual({});
    });
  });
});
