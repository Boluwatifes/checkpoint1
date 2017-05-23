// import required dependencies
import React from 'react';
import * as Actions from '../actions/NewsAction';
import FavoriteStore from '../stores/FavoriteStore';
import Articles from './Articles';

/**
 * Creates a Favorites component
 * @export
 * @class Favorites
 * @extends {React.Component}
 */
export default class Favorites extends React.Component {
  /**
   * Creates an instance of Favorites.
   * @constructor
   * @memberof Favorites
   */
  constructor() {
    super();
    this.state = {
      favorites: {},
      loading: true,
    };
    this.getFavourites = this.getFavourites.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  /**
   * Call action on initial page load
   * @method componentWillMount
   * @memberof Favorites
   * @return {null} -
   */
  componentWillMount() {
    const user = (JSON.parse(localStorage.user).id).toString();
    Actions.getFavorites(user);
  }

  /**
   * Attach an event listener to favorite store
   * @method componentDidMount
   * @memberof Favorites
   * @return {null} -
   */
  componentDidMount() {
    FavoriteStore.on('change', this.getFavourites);
  }

  /**
   * Remove event listener from favorite store
   * @method componentWillUnount
   * @memberof Favorites
   * @return {null} -
   */
  componentWillUnmount() {
    FavoriteStore.removeListener('change', this.getFavourites);
  }

  /**
   * Get the user's favorites from the store and update the state
   * @method getFavorites
   * @memberof Favorites
   * @return {null} -
   */
  getFavourites() {
    const favorites = FavoriteStore.getFavorites();
    this.setState({
      favorites,
      loading: false,
    });
  }

  /**
   * Get the user's favorites from the store and update the state
   * @method deleteFavorite
   * @memberof Favorites
   * @param {string} title
   * @return {null} -
   */
  deleteFavorite(title) {
    const articleToDelete = title;
    const userId = JSON.parse(localStorage.user).id;
    Actions.deleteFavorite(articleToDelete, userId);
  }

  /**
   * Render to the dom
   * @method render
   * @memberof Favorites
   * @returns {any} -
   */
  render() {
    return (
      <div className="portal">
        <div className="background">
          <a
            className="btn-floating btn-large waves-effect waves-light red"
            id="floating-button" href="/"
          >
            <i className="material-icons">keyboard_arrow_left</i></a>
          <Articles
            articles={this.state.favorites}
            type="favorite"
            deleteFavorite={this.deleteFavorite}
          />
          <div className="clear" />
        </div>
      </div>
    );
  }
}
