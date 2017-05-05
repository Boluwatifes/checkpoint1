import dispatcher from '../dispatcher';
import apiAll from '../utils/api';

export function getSources() {
  apiAll((data) => {
    dispatcher.dispatch({
      type: 'GET_ALL_SOURCES',
      sources: data,
    });
  });
}
window.no = getSources;

export function getArticle(source) {
  dispatcher.dispatch({
    type: 'FETCH_SOURCE',
    source,
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
