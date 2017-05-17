// import dispatcher and API call function
import dispatcher from '../dispatcher';
import * as api from '../utils/api';

/**
 * @function getSources
 * This function call the apiAll method in the api module
 * This function call the apiAll method in the api module,
 * returns the news sources and
 * dispatch action to the store
 */

export function getAllSources() {
  api.apiAll((data) => {
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
  api.apiOne(source, sortBy, (data) => {
    dispatcher.dispatch({
      type: 'FETCH_ARTICLES',
      articles: data,
    });
  });
}

