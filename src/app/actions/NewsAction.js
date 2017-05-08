import dispatcher from '../dispatcher';
import * as api from '../utils/api';

export function getSources() {
  api.apiAll((data) => {
    dispatcher.dispatch({
      type: 'GET_ALL_SOURCES',
      sources: data,
    });
  });
}

export function getArticles(source, sortBy) {
  api.apiOne(source, sortBy, (data) => {
    dispatcher.dispatch({
      type: 'FETCH_ARTICLES',
      articles: data,
    });
  });
}

export function getSort(source, sortBy) {
  api.apiSortBy(source, sortBy, (data) => {
    dispatcher.dispatch({
      type: 'GET_SORT',
      sortBy: data,
    });
  });
}

export function sortArticle(source, sortBy) {
  dispatcher.dispatch({
    type: 'SORT_ARTICLES',
    sortBy,
    source,
  });
}
