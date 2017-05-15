// import required dependencies
import _ from 'lodash';
import React from 'react';
import newsStore from '../stores/NewsStore';
import * as NewsAction from '../actions/NewsAction';

/**
 * Create a react component
 * @class Portal
 */
export default class Portal extends React.Component {
  /**
   * Set default sources to empty and default source to `bbc-news`
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      sources: [],
      source: 'bbc-news',
      articles: [],
      sortBy: [],
      currentSort: '',
      loading: true,
      done: true,
    };

    // bind the methods to the Layout class
    this.getSources = this.getSources.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.processClick = this.processClick.bind(this);
    this.processSort = this.processSort.bind(this);
  }

  // call class methods when the components are mounted
  componentWillMount() {
    // call the getSources method in the NewsAction module and get all the news source
    NewsAction.getSources();
    // call the getArticles method in the NewsAction module and get all
    // articles from `bbc-news`
    NewsAction.getArticles('bbc-news', '');
    newsStore.on('change', this.getSources);
    newsStore.on('change', this.getArticles);
  }

  /**
   * gets the news sources and set the state
   * @method getSources
   */
  getSources() {
    const rawSources = newsStore.getSources();
    if (rawSources) {
      this.setState({
        sources: rawSources,
        done: false,
        sorting: false,
      });
    }
  }

  /**
   * gets the articles for a given source and set the state to reflect the articles
   * @method getArticles
   */
  getArticles() {
    const rawSources = newsStore.getSources();
    if (rawSources) {
      const articles = newsStore.getArticles().articles;
      const currentSort = newsStore.getArticles().sortBy;
      if (articles) {
        const sortBy = _.filter(rawSources, ['id', this.state.source])[0].sortBysAvailable;
        this.setState({
          articles,
          currentSort,
          sortBy,
          loading: false,
          sorting: false,
        });
      }
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
      articles: newsStore.getArticles().articles,
      currentSort: newsStore.getArticles().sortBy,
      loading: false,
      sorting: false,
    });
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
      articles: newsStore.getArticles().articles,
      currentSort: e.target.value,
      loading: false,
      sorting: false,
    });
  }

  // remove event listener from News Store when the component is unmounted
  componentWillUnMount() {
    newsStore.removeListener('change', this.getSources);
    newsStore.removeListener('change', this.getArticles);
  }

  /**
   * Render react component
   * @method render
   */
  render() {
    // set default Display content to empty
    let Display = '';

    // set default Articles content to empty
    let Articles = '';

    // set default sort
    let sortBy = '';

    // checks if the articles are mounted
    if (this.state.done) {
      // sets Display to `please wait` if the news source have not been fetched
      Display = (
        <option value="">Please Wait .....</option>
      );
    } else {
      // sets Display to the news sources if the sources have been fetched
      Display = this.state.sources.map(source => (
        <option value={source.id} key={source.id}>{source.name}</option>
      ));
    }
    if (this.state.loading) {
      // set Articles to `Please wait` if it has not been fetched
      Articles = (
        <h2>Please Wait .....</h2>
      );

      sortBy = (
        <option value="">Please Wait</option>
      );
    } else {
      // map the returned articles and set it to `Articles`
      Articles = this.state.articles.map(article => (
        <div key={article.title} className="col s12 m6 l4">
          <div className="card art">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={article.urlToImage} />
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{article.title}<i className="material-icons right">more_vert</i></span>
              <p><a href={article.url} target="blank">Read More</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{article.title}<i className="material-icons right">close</i></span>
              <p>{article.description}</p>
            </div>
          </div>
        </div>
      ));

      // map the returned sortBy and sest it to SortBy
      sortBy = this.state.sortBy.map((sort) => (
        <option key={Math.random + sort}>{sort}</option>
      ));
    }

    // format the current news source name
    const currentSource = this.state.source.replace('-', ' ').toUpperCase();

    // renders the react component
    return (
      <div className="portal">
        <div className="mySelect col s12">
          <div className="col s12 m12 l4">
            <h5> {this.state.loading ? 'Loading' : 'Showing'} {this.state.loading !== '' ? `'${this.state.currentSort}'` : ''} News from {currentSource} </h5>
          </div>
          <div className="col s12 m6 l4">
            <select onChange={this.processClick}>
              <option value="bbc-news">Please Select a News Source</option>
              {Display}
            </select>
          </div>
          <div className="col s12 m6 l4">
            <select onChange={this.processSort}>
              <option value="">Sort News</option>
              {sortBy}
            </select>
          </div>
          <div className="clear" />
        </div>
        <div className="col s12">
          {Articles}
          <div className="clear" />
        </div>
        <div className="clear" />
      </div>
    );
  }
}
