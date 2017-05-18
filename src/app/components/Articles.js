import React from 'react';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      loading: true,
    };
    this.setArticles = this.setArticles.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setArticles(nextProps.articles);
  }

  setArticles(articles) {
    this.setState({
      articles,
      loading: false,
    });
  }

  render() {
    const excerpt = title => (title.length > 80 ? `${title.substring(0, 50)} ...` : title);

    let allArticles;

    if (this.state.loading) {
      allArticles = (
        <div className="col s12 home-inner" >
          <div className="inner-content center m-auto">
            <span className="center"><img alt="loading" src="imgs/loading.gif" /></span>
            <p className="center">Please Wait .....</p>
          </div>
        </div>
      );
    } else {
      allArticles = this.state.articles.map(article => (
        <div className="col s12 m6 l4 h-500" id="article" key={Math.random + article.title}>
          <div className="card art">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator responsive-img" src={article.urlToImage} alt={article.title} />
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4" id="title">{excerpt(article.title)}<i className="material-icons right">more_vert</i></span>
              <p><a href={article.url} target="blank">Read More</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{article.title}<i className="material-icons right">close</i></span>
              <p>{article.description}</p>
            </div>
            <div className="card-action">
              <span><i className="material-icons">share</i></span>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div className="col s12" id="articles">
        {allArticles}
        <div className="clear" />
      </div>
    );
  }
}
