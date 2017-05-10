import _ from 'lodash';
import React from 'react';
import newsStore from '../stores/NewsStore';
import * as NewsAction from '../actions/NewsAction';

export default class Portal extends React.Component {
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
    NewsAction.getSources();
    NewsAction.getArticles('bbc-news', '');
    this.getSources = this.getSources.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.processClick = this.processClick.bind(this);
    this.processSort = this.processSort.bind(this);
  }

  componentDidMount() {
    newsStore.on('change', this.getSources);
    newsStore.on('change', this.getArticles);
  }

  getSources() {
    const rawSources = newsStore.getSources();
    const sortBy = _.filter(rawSources, ['id', 'bbc-news'])[0].sortBysAvailable;
    this.setState({
      sources: rawSources,
      sortBy,
      done: false,
      sorting: false,
    });
  }

  getArticles() {
    const rawSources = newsStore.getSources();
    const sortBy = _.filter(rawSources, ['id', this.state.source])[0].sortBysAvailable;
    this.setState({
      articles: newsStore.getArticles().articles,
      currentSort: newsStore.getArticles().sortBy,
      sortBy,
      loading: false,
      sorting: false,
    });
  }

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

  processSort(e) {
    NewsAction.getArticles(this.state.source, e.target.value);
    this.setState({
      articles: newsStore.getArticles().articles,
      currentSort: e.target.value,
      loading: false,
      sorting: false,
    });
  }

  componentDidUnMount() {
    newsStore.removeListener('change', this.getSources);
    newsStore.removeListener('change', this.getArticles);
  }

  render() {
    let Display = '';
    let Articles = '';
    if (this.state.done) {
      Display = (
        <option value="">Please Wait .....</option>
      );
    } else {
      Display = this.state.sources.map(source => (
        <option value={source.id} key={source.id}>{source.name}</option>
      ));
    }
    if (this.state.loading) {
      Articles = (
        <h2>Please Wait .....</h2>
      );
    } else {
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
    }

    const currentSource = this.state.source.replace('-', ' ').toUpperCase();

    let sortBy = '';
    if (this.state.loading) {
      sortBy = (
        <option value="">Please Wait</option>
      );
    } else {
      sortBy = this.state.sortBy.map((sort) => (
        <option key={Math.random + sort}>{sort}</option>
      ));
    }
    return (
      <div>
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
