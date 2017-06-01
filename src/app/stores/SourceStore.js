// import required dependencies
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

/**
 * Holds the storage, listen to actions and update the stores
 * @class NewsStore
 */
class SourceStore extends EventEmitter {
  /**
   * sets the sources, articles to an empty []
   * @constructor
   */
  constructor() {
    super();
    this.sources = {};
    this.handleActions = this.handleActions.bind(this);
  }

  /**
   * @method getSources
   * @return {object} sources - The news source stored in the constructor
   */
  getSources() {
    return this.sources;
  }

  /**
   * Receives actions and update the stores accordingly
   * @method handleActions
   * @param {object} action - Action type and data
   * @return {null} -
   */
  handleActions(action) {
    if (action.type === 'GET_ALL_SOURCES') {
      this.sources = action.sources;
      this.emit('change');
    }
  }
}

// create a new instance of `SourceStore`
const sourceStore = new SourceStore();

// register a dispatcher and bind it to the `handleAction` method
dispatcher.register(sourceStore.handleActions.bind(sourceStore));

// export an instance of the class
export default sourceStore;
