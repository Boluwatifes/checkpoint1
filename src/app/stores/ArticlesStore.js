// import required dependencies
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

/**
 * Holds the storage, listen to actions and update the stores
 * @class NewsStore
 */
class ArticlesStore extends EventEmitter {
  /**
   * sets the sources, articles to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.articles = {};
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method getArticles
   * @return {object} articles - The articles stored in the constructor
   */
  getArticles() {
    return this.articles;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    if (action.type === 'FETCH_ARTICLES') {
      this.articles = action.articles;
      this.emit('change');
    }
  }
}

// create a new instance of `ArticlesStore`
const articlesStore = new ArticlesStore();

// register a dispatcher and bind it to the `handleAction` method
dispatcher.register(articlesStore.handleActions.bind(articlesStore));

// export an instance of the class
export default articlesStore;
