// import dispatcher and API call function
import dispatcher from '../dispatcher';
import { getSourcesFromApi,
  getArticlesFromApi,
  getFavoritesFromDatabase,
  deleteFavoriteFromDatabase,
  scrapeArticle } from '../utils/newsApiMethods';

/**
 * This function call the getSourcesFromApi method in the api module
 * @function getAllSources
 * @return {data} - dispatches action and data to the store
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
 * This function call the apiArticlesFromApi method in the api module,
 * @function getArticles
 * @param {string} source - The news source
 * @param {string} sortBy - The news filter
 * @return {data} - dispatches action and data to the store
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
 * This function call the getFavoritesFromDatabase method in the api module,
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

/**
 * This function calls deleteFavoriteFromDatabase function in the api module
 * @function deleteFavorite
 * @export {data} - Dispatch actions to the favorite store
 * @param {any} article - the article id
 * @param {any} userId - the user id
 * @return {null} -
 */
export function deleteFavorite(article, userId) {
  deleteFavoriteFromDatabase(article, userId);
  getFavoritesFromDatabase(userId, (data) => {
    dispatcher.dispatch({
      type: 'GET_FAVORITES',
      favorites: data,
    });
  });
}

/**
 * This method calls scrapeArticle method in the api method and return an object
 * @function getScrappedArticle
 * @param {any} url - url of the article
 * @return {null} -
 */
export function getSrappedArticle(url) {
  scrapeArticle(url, (data) => {
    dispatcher.dispatch({
      type: 'SCRAPPED_ARTICLE',
      scrappedArticle: data,
    });
  });
}
