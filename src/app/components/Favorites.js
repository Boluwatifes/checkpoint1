// import required dependencies
import React from 'react';
import * as Actions from '../actions/NewsAction';
import FavoriteStore from '../stores/FavoriteStore';
import Articles from './Articles';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: {},
      loading: true,
    };
    this.getFavourites = this.getFavourites.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentWillMount() {
    const user = (JSON.parse(localStorage.user).id).toString();
    Actions.getFavorites(user);
  }

  componentDidMount() {
    FavoriteStore.on('change', this.getFavourites);
  }

  componentWillUnmount() {
    FavoriteStore.removeListener('change', this.getFavourites);
  }

  getFavourites() {
    const favorites = FavoriteStore.getFavorites();
    this.setState({
      favorites,
      loading: false,
    });
  }

  deleteFavorite(title) {
    const articleToDelete = title;
    const userId = JSON.parse(localStorage.user).id;
    Actions.deleteFavorite(articleToDelete, userId);
  }

  render() {
    return (
      <div className="portal">
        <div className="background">
          <a className="btn-floating btn-large waves-effect waves-light red" id="floating-button" href="/"><i className="material-icons">keyboard_arrow_left</i></a>
          <Articles articles={this.state.favorites} type="favorite" deleteFavorite={this.deleteFavorite} />
          <div className="clear" />
        </div>
      </div>
    );
  }
}
