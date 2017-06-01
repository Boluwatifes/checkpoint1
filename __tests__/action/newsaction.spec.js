import sinon from 'sinon';
import axios from 'axios';
import dispatcher from '../../src/app/dispatcher';
import '../../src/app/__mock__/firebase-config';
import sampleSources from '../../src/app/__mock__/sampleSources.json';
import sampleArticles from '../../src/app/__mock__/sampleArticles.json';
import { getAllSources,
  getArticles,
  getFavorites,
  deleteFavorite,
  getSrappedArticle } from '../../src/app/actions/NewsAction';

describe('News Action', () => {
  let mockAxios;
  let dispatchSpy;

  beforeEach(() => {
    mockAxios = sinon.stub(axios, 'get').callsFake(() => (
      Promise.resolve({
        data: { sources:
          sampleSources,
          articles: sampleArticles } })
    ));
    dispatchSpy = sinon.spy(dispatcher, 'dispatch');
  });

  afterEach(() => {
    axios.get.restore();
    dispatcher.dispatch.restore();
  });

  describe('Test for getAllSources Method', () => {
    it('should dispatch an action', () => (
        getAllSources().then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          dispatcher.dispatch({
            action: 'GET_ALL_SOURCES',
            sources: sampleSources,
          });
          expect(dispatchSpy.getCall(0).args[0].type).toBe('GET_ALL_SOURCES');
        })
    ));
  });

  describe('Test for getArticles Method', () => {
    it('should dispatch an action', () => (
        getArticles('bbc-news', '').then(() => {
          expect(mockAxios.called).toBe(true);
          expect(dispatchSpy.called).toEqual(true);
          dispatcher.dispatch({
            action: 'FETCH_ARTICLES',
            sources: sampleArticles,
          });
          expect(dispatchSpy.getCall(0).args[0].type).toBe('FETCH_ARTICLES');
        })
    ));
  });

  describe('Test for getFavorites Method', () => {
    it('should contain a getFavorite method', () => {
      expect(getFavorites('1203223490342')).toBeTruthy();
    });
  });

  describe('Test for deleteFavorites Method', () => {
    it('should contain a deleteFavoriteMethod', () => {
      expect(deleteFavorite('', '1203223490342')).toBeTruthy();
    });
  });

  describe('Test for getScrappedArticle Method', () => {
    it('should dispatch an action', () => (
        getSrappedArticle('bbc-news').then(() => {
          expect(mockAxios.calledOnce).toBe(true);
          expect(dispatchSpy.calledOnce).toEqual(true);
          dispatcher.dispatch({
            action: 'SCRAPPED_ARTICLE',
            sources: sampleSources,
          });
          expect(dispatchSpy.getCall(0).args[0].type).toBe('SCRAPPED_ARTICLE');
        })
    ));
  });
});
