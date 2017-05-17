// import required dependencies
import React from 'react';
import ArticlesStore from '../stores/ArticlesStore';
import * as NewsAction from '../actions/NewsAction';
import Articles from './Articles';
import Sources from './Sources';
import SortBy from './SortBy';

/**
 * Create a react component
 * @class Portal
 */
export default class Portal extends React.Component {
  constructor() {
    super();
    this.source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    // call the getSources method in the NewsAction module and get all the news source
    // this.allSources = null;
    // this.allSources = NewsAction.getSources();
    // if (this.allSources !== null) {
    //   const source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    //   NewsAction.getArticles(source, '');
    //   console.log('done');
    // }
    this.state = {
      source: this.source,
      articles: null,
      currentSort: '',
      loading: true,
      sortBy: ['top'],
    };

    // bind the methods to the Layout class
    this.getArticles = this.getArticles.bind(this);
    this.processClick = this.processClick.bind(this);
    this.processSort = this.processSort.bind(this);
  }

  componentWillMount() {
    const source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    NewsAction.getArticles(source, '');
  }

    // call class methods when the components are mounted
  componentDidMount() {
    // NewsAction.getSources();
    // const source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    // NewsAction.getArticles(source, '');
    ArticlesStore.on('change', this.getArticles);
    // ArticlesStore.on('change', this.getArticles);
  }

  componentWillUnmount() {
    ArticlesStore.removeListener('change', this.getArticles);
  }

  /**
   * gets the articles for a given source and set the state to reflect the articles
   * @method getArticles
   */
  getArticles() {
    let articles = null;
    articles = ArticlesStore.getArticles().articles;
    const currentSort = ArticlesStore.getArticles().sortBy;
    if (articles) {
      this.setState({
        articles,
        currentSort,
        loading: false,
      });
    }
  }

   /**
   * Changes the news source when a news source is clicked, get articles for the
   * news sources and update the state accordingly
   * @method processClick
   * @param e - Click event
   */
  processClick(e) {
    NewsAction.getArticles(e.target.value, '');
    this.setState({
      source: e.target.value,
      articles: ArticlesStore.getArticles().articles,
      currentSort: ArticlesStore.getArticles().sortBy,
    });
    localStorage.setItem('defaultNews', e.target.value);
  }

  /**
   * Changes the news source when a news source is clicked, get articles for the
   * news sources and update the state accordingly
   * @method processSort
   * @param e - Click event
   */
  processSort(e) {
    NewsAction.getArticles(this.state.source, e.target.value);
    this.setState({
      articles: ArticlesStore.getArticles().articles,
      currentSort: e.target.value,
    });
  }


  render() {
    return (
      <div className="portal">
        <div className="mySelect col s12">
          <div className="col s12 m12 l4">
            <h5> {this.state.currentSort.toUpperCase()} News From {this.state
              .source.toUpperCase()} </h5>
          </div>
          <div className="col s12 m6 l4">
            <Sources sources={this.state.sources} processClick={this.processClick} />
          </div>
          <div className="col s12 m6 l4">
            <SortBy processSort={this.processSort} currentSource={this.state.source} />
          </div>
          <div className="clear" />
        </div>
        <Articles articles={this.state.articles} />
        <div className="clear" />
      </div>

    );
  }
}
