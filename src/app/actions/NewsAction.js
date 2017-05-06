import dispatcher from '../dispatcher';
import { apiAll, apiOne } from '../utils/api';

export function getSources() {
  apiAll((data) => {
    dispatcher.dispatch({
      type: 'GET_ALL_SOURCES',
      sources: data,
    });
  });
}

export function getArticles(source) {
  apiOne(source, (data) => {
    dispatcher.dispatch({
      type: 'FETCH_ARTICLES',
      articles: data,
    });
  });
}

export function getSort(source) {
  dispatcher.dispatch({
    type: 'GET_SORT',
    source,
  });
}

export function sortArticle(source, sortBy) {
  dispatcher.dispatch({
    type: 'SORT_ARTICLES',
    sortBy,
    source,
  });
}
