// import dispatcher and API call function
import dispatcher from '../dispatcher';
import { getSourcesFromApi,
  getArticlesFromApi,
  getFavoritesFromDatabase,
  deleteFavoriteFromDatabase } from '../utils/newsApiMethods';

/**
 * @function getSources
 * This function call the apiAll method in the api module
 * This function call the apiAll method in the api module,
 * returns the news sources and
 * dispatch action to the store
 */
export function getAllSources() {
  getSourcesFromApi((data) => {
    dispatcher.dispatch({
      type: 'GET_ALL_SOURCES',
      sources: data,
    });
  });
}

/**
 * @function getArticles
 * This function call the apiAll method in the api module,
 * returns the news articles and
 * dispatch action to the store
 * @param {string} source - The news source
 * @param {string} sortBy - The news filter
 */
export function getArticles(source, sortBy) {
  getArticlesFromApi(source, sortBy, (data) => {
    dispatcher.dispatch({
      type: 'FETCH_ARTICLES',
      articles: data,
    });
  });
}

/**
 * This function call the apiAll method in the api module,
 * returns the news articles and
 * dispatch action to the store
 * @function getFavorites
 * @param {string} user - The news filter
 * @return {null} - Dispatches Action
 */
export function getFavorites(user) {
  getFavoritesFromDatabase(user, (data) => {
    dispatcher.dispatch({
      type: 'GET_FAVORITES',
      favorites: data,
    });
  });
}

export function deleteFavorite(article, userId) {
  deleteFavoriteFromDatabase(article, userId);
  getFavoritesFromDatabase(userId, (data) => {
    dispatcher.dispatch({
      type: 'GET_FAVORITES',
      favorites: data,
    });
  });
}
