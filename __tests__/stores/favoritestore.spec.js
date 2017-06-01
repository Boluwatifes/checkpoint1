import FavoriteStore from '../../src/app/stores/FavoriteStore';
import dispatcher from '../../src/app/dispatcher';

jest.mock('../../src/app/dispatcher');
jest.dontMock('../../src/app/stores/FavoriteStore');

describe('Favorites Store', () => {
  describe('Test for getFavorites method', () => {
    let favorites;
    let dispatcherMock;
    beforeEach(() => {
      dispatcherMock = dispatcher.register.mock.calls[0][0];
      favorites = {
        0: {
          title: 'Hello World',
        },
        1: {
          title: 'Welcome to React',
        },
      };
    });

    afterEach(() => {
      FavoriteStore.handleActions({ type: 'GET_FAVORITES', favorites: {} });
    });

    it('should be registered to a dispatcher', () => {
      dispatcherMock({ type: 'GET_FAVORITES', favorites, });
      expect(FavoriteStore.getFavorites()).toEqual(favorites);
    });

    it('should return an empty object on first call', () => {
      expect(FavoriteStore.getFavorites()).toEqual({});
    });

    it('should return an updated favorites after receiving an action', () => {
      FavoriteStore.handleActions({ type: 'GET_FAVORITES', favorites, });
      expect(FavoriteStore.getFavorites()).toEqual(favorites);
    });

    it('should not respond to an action not registered to it', () => {
      FavoriteStore.handleActions({ type: 'GET_ALL_SOURCES', favorites, });
      expect(FavoriteStore.getFavorites()).toEqual({});
    });
  });
});
