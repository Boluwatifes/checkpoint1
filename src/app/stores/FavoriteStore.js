// import required dependencies
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

/**
 * Holds the storage, listen to actions and update the stores
 * @class NewsStore
 */
class FavoriteStore extends EventEmitter {
  /**
   * sets the sources, articles to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.favorites = {};
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method getFavorites
   * @return {object} favorites - The favorites stored in the constructor
   */
  getFavorites() {
    return this.favorites;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} - Updates the store
   */
  handleActions(action) {
    if (action.type === 'GET_FAVORITES') {
      this.favorites = action.favorites;
      this.emit('change');
    }
  }
}

// create a new instance of `FavoriteStore`
const favoriteStore = new FavoriteStore();

// register a dispatcher and bind it to the `handleAction` method
dispatcher.register(favoriteStore.handleActions.bind(favoriteStore));

// export an instance of the class
export default favoriteStore;
