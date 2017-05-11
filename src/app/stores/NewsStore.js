// import required dependencies
import { EventEmitter } from 'events';
import axios from 'axios';
import dispatcher from '../dispatcher';

/**
 * Holds the storage, listen to actions and update the stores
 * @class NewsStore
 */
class NewsStore extends EventEmitter {
  /**
   * sets the sources, articles to an empty []
   * @constructor
   */

  constructor() {
    super();
    this.sources = [];
    this.articles = [];
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method getSources
   * @return sources - The news source stored in the constructor
   */
  getSources() {
    return this.sources;
  }

  /**
   * @method getArticles
   * @return articles - The articles stored in the constructor
   */
  getArticles() {
    return this.articles;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} - Action type and data
   */
  handleActions(action) {
    switch (action.type) {
      case 'GET_ALL_SOURCES': {
        this.sources = action.sources;
        this.emit('change');
        break;
      }
      case 'FETCH_ARTICLES': {
        this.articles = action.articles;
        this.emit('change');
        break;
      }
      default: {
        this.sources = 'Default';
        return this.sources;
      }
    }
  }
}

// create a new instance of `NewsStore`
const newsStore = new NewsStore();

// register a dispatcher and bind it to the `handleAction` method
dispatcher.register(newsStore.handleActions.bind(newsStore));

// export an instance of the class
export default newsStore;
