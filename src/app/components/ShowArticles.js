// import required dependencies
import React from 'react';
import $ from 'jquery';
import { cleanSource } from '../utils/helpers';
import ArticlesStore from '../stores/ArticlesStore';
import * as NewsAction from '../actions/NewsAction';
import Articles from './Articles';
import Sources from './Sources';
import SortBy from './SortBy';

/**
 * Create a react component
 * @class ShowArticles
 */
export default class ShowArticles extends React.Component {
  /**
   * Create a constructor
   * @constructor
   */
  constructor() {
    super();
    this.source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    this.state = {
      source: this.source,
      articles: {},
      currentSort: '',
      loading: true,
      sortBy: ['top'],
    };

    // bind the methods to the Layout class
    this.getArticles = this.getArticles.bind(this);
    this.handlesSourceChange = this.handlesSourceChange.bind(this);
    this.handlesArticleSorting = this.handlesArticleSorting.bind(this);
    this.saveUsersFavorites = this.saveUsersFavorites.bind(this);
  }

  /**
   * Calls NewsAction when the component is about to mount
   * @method componentWilMount
   * @returns {function} - calls news action and dispatch an action
   */
  componentWillMount() {
    NewsAction.getArticles(this.state.source, '');
  }

  /**
   * Add event Listener to the Article Store and fires when the component is fully mounted
   * @method componentDidMount
   * @returns {event} - register event
   */
  componentDidMount() {
    ArticlesStore.on('change', this.getArticles);
  }

  /**
   * Remove event listener from the Article store
   * @method componentWilUnMount
   * @return {event} - removes event
   */
  componentWillUnmount() {
    ArticlesStore.removeListener('change', this.getArticles);
  }

  /**
   * gets the articles for a given source and set the state to reflect the articles
   * @method getArticles
   * @return {state} - Redeclare the state
   */
  getArticles() {
    const articles = ArticlesStore.getArticles().articles;
    const currentSort = ArticlesStore.getArticles().sortBy;
    this.setState({
      articles,
      currentSort,
      loading: false,
    });
  }

   /**
   * Changes the news source when a news source is clicked, get articles for the
   * news sources and update the state accordingly
   * @method handlesSourceChange
   * @param {object} e - Click event
   * @return {state} - Redeclare the state
   */
  handlesSourceChange(e) {
    if (e !== undefined) {
      NewsAction.getArticles(e.value, '');
      this.setState({
        source: e.value,
        articles: ArticlesStore.getArticles().articles,
        currentSort: ArticlesStore.getArticles().sortBy,
      });
      localStorage.setItem('defaultNews', e.value);
    }
  }

  /**
   * Changes the news source when a news source is clicked, get articles for the
   * news sources and update the state accordingly
   * @method handlesArticleSorting
   * @param {object} e - Click event
   * @return {state} - Redeclare the state
   */
  handlesArticleSorting(e) {
    NewsAction.getArticles(this.state.source, e.label);
    this.setState({
      articles: ArticlesStore.getArticles().articles,
      currentSort: e.label,
    });
  }

  /**
   * Saves users favorites to firebase database
   * @method savesUsersFavorites
   * @param {object} e
   * @return {object} data
   * @memberof ShowArticles
   */
  saveUsersFavorites(e) {
    console.log(e);
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    return (
      <div className="portal">
        <div className="mySelect col s12">
          <div className="col s12 m12 l4">
            <h5>
              {this.state.currentSort.toUpperCase()} News From {cleanSource(this.state
              .source)} </h5>
          </div>
          <div className="col s12 m6 l4">
            <Sources
              sources={this.state.sources}
              handlesSourceChange={this.handlesSourceChange}
            />
          </div>
          <div className="col s12 m6 l4">
            <SortBy
              handlesArticleSorting={this.handlesArticleSorting}
              currentSource={this.state.source}
            />
          </div>
          <div className="clear" />
        </div>
        <Articles articles={this.state.articles} />
        <div className="clear" />
      </div>

    );
  }
}
