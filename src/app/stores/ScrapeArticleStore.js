// import required dependencies
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

/**
 * Holds the storage, listen to actions and update the stores
 * @class NewsStore
 */
class ScrapeArticleStore extends EventEmitter {
  /**
   * sets the sources, articles to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.scrappedArticle = {};
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method getSources
   * @return {null} sources - The news source stored in the constructor
   */
  getSrappedArticle() {
    return this.scrappedArticle;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    if (action.type === 'SCRAPPED_ARTICLE') {
      this.scrappedArticle = action.scrappedArticle;
      this.emit('change');
    }
  }
}

// create a new instance of `ScrapeArticleStore`
const scrapeArticleStore = new ScrapeArticleStore();

// register a dispatcher and bind it to the `handleAction` method
dispatcher.register(scrapeArticleStore.handleActions.bind(scrapeArticleStore));

// export an instance of the class
export default scrapeArticleStore;
