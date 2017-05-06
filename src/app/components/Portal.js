import React from 'react';
import newsStore from '../stores/NewsStore';
import * as NewsAction from '../actions/NewsAction';

export default class Portal extends React.Component {
  constructor() {
    super();
    this.state = {
      sources: [],
      loading: true,
      done: true,
      source: 'bbc-news',
      articles: [],
    };
    NewsAction.getSources();
    NewsAction.getArticles('bbc-news');
    this.getSources = this.getSources.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.processClick = this.processClick.bind(this);
  }

  componentDidMount() {
    newsStore.on('change', this.getSources);
    newsStore.on('change', this.getArticles);
  }

  getSources() {
    this.setState({
      sources: newsStore.getSources(),
      done: false,
    });
  }

  getArticles() {
    this.setState({
      articles: newsStore.getArticles(),
      loading: false,
    });
  }

  processClick(e) {
    NewsAction.getArticles(e.target.value)
    this.setState({
      source: e.target.value,
      articles: newsStore.getSources(),
    });
  }

  componentWillUnMount() {
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
    return (
      <div>
        <div className="mySelect col s12">
          <div className="col s12 m6 l7">
            <h5> Showing News from {currentSource} </h5>
          </div>
          <div className="col s12 m6 l5">
            <select onChange={this.processClick}>
              <option value="">Please Select a News Source</option>
              {Display}
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
