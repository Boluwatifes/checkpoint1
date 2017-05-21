import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { saveFavoritesToDatabase } from '../utils/newsApiMethods';
import { excerpt, cleanSource } from '../utils/helpers';


$('body').on('click', '#addFav', () => {
  swal({
    title: 'Success!',
    text: 'The article has been added to your favorite',
    type: 'success',
  });
});

$('body').on('click', '#deleteFav', () => {
  swal({
    title: 'Success!',
    text: 'The article has been removed from your favorite',
    type: 'success',
  });
});
/**
 * Create a react component
 * @class Article
 */
export default class Article extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
    };
    this.setArticles = this.setArticles.bind(this);
    this.saveUsersFavorites = this.saveUsersFavorites.bind(this);
  }

  /**
   * Set state when a new prop is received
   * @method componentWilReceiveProps
   * @param {object} nextProps - New props
   * @return {state} - Set states
   */
  componentWillReceiveProps(nextProps) {
    this.setArticles(nextProps.articles);
  }

  /**
   * gets the news sources and set the state
   * @method setArticles
   * @param {object} articles
   * @return {state} - Set the sources to the state
   */
  setArticles(articles) {
    this.setState({
      articles,
      loading: false,
    });
    this.deleteFavorite = this.props.deleteFavorite;
    localStorage.setItem('articles', JSON.stringify(articles));
  }

   /**
   * Saves users favorites to firebase database
   * @method savesUsersFavorites
   * @param {int} articleIndex
   * @return {object} data
   * @memberof ShowArticles
   */
  saveUsersFavorites(articleIndex) {
    const articles = JSON.parse(localStorage.articles);
    const articleToSave = articles[articleIndex];
    const userId = JSON.parse(localStorage.user).id;
    const source = localStorage.defaultNews;
    saveFavoritesToDatabase(articleToSave, userId, source);
  }



  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    let allArticles;
    if (this.state.loading) {
      allArticles = (
        <div className="col s12 home-inner-white">
          <div className="inner-content center m-auto">
            <span className="center"><img alt="loading" src="imgs/loading.gif" /></span>
            <p className="center">Please Wait .....</p>
          </div>
        </div>
      );
    } else if ((this.state.articles).length === 0) {
      allArticles = (
        <div className="col s12 home-inner" >
          <div className="inner-content center m-auto">
            <span className="center"><img alt="Not Available" src="imgs/na.png" /></span>
            <p className="center">No Favorites to show yet. Click the <span style={{ color: 'red' }}><i id="favorites" className="material-icons">favorite</i></span> button to add. </p>
          </div>
        </div>
      );
    } else {
      const newsSource = source => (
        <span className="card-title">{cleanSource(source)}</span>
      );
      const favoriteButton = i => (
        <i
          id="addFav"
          onClick={this.saveUsersFavorites.bind(this, i)}
          className="material-icons"
          title="Add to Favorite"
        >
            favorite
        </i>
      );
      const deleteButton = key => (
        <i
          id="deleteFav"
          onClick={this.deleteFavorite.bind(this, key)}
          className="material-icons"
          title="Delete from Favorite"
        >
            delete_forever
        </i>
      );
      allArticles = this.state.articles.map((article, i) => (
        <div className="col s12 m6 l4 h-500" id="article" key={Math.random + article.title}>
          <div className="card art">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                className="activator responsive-img"
                src={article.urlToImage} alt={article.title}
              />
              {this.props.type === 'favorite' ? newsSource(article.source) : ''}
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4" id="title">
                {excerpt(article.title)}<i className="material-icons right">more_vert</i>
              </span>
              <p><a href={`/article?url=${article.url}`}>Read More</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                {article.title}<i className="material-icons right">close</i>
              </span>
              <p>{article.description}</p>
            </div>
            <div className="card-action">
              <span className="favorite">{this.props.type === 'favorite' ? deleteButton(article.title) : favoriteButton(i)}</span>
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

Article.propTypes = {
  articles: PropTypes.any,
};
