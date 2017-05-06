import { EventEmitter } from 'events';
import axios from 'axios';
import dispatcher from '../dispatcher';

class NewsStore extends EventEmitter {
  constructor() {
    super();
    this.sources = [];
    this.articles = [];
    this.handleActions = this.handleActions.bind(this);
  }

  changeSource(source) {
    const that = this;
    that.sources = source;
  }

  querySource() {
    return axios.get('https://newsapi.org/v1/sources?language=en').then(response => response.data.sources);
  }

  getSources() {
    return this.sources;
  }

  getArticles() {
    return this.articles;
  }

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

const newsStore = new NewsStore();
dispatcher.register(newsStore.handleActions.bind(newsStore));
export default newsStore;
