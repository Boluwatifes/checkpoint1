// import required dependencies
import axios from 'axios';

/**
 * Make an api call to newsapi to get the news sources
 * @function apiAll
 * @param {function} callback - Function to process the data
 */
export const apiAll = (callback) => {
  axios.get('https://newsapi.org/v1/sources?language=en')
    .then(response => callback(response.data.sources));
};

/**
 * Make an api call to newsapi to get articles from a news source
 * @function apiOne
 * @param {string} source - The news source to fetch the articles from
 * @param {string} sortBy - The filter to use on the news source. Default is an empty string
 * @param {function} callback - Function to process the data
 */
export const apiOne = (source, sortBy = '', callback) => {
  axios.get(`https://newsapi.org/v1/articles?source=${source}&sortBy=${sortBy}&apiKey=213327409d384371851777e7c7f78dfe`)
    .then(response => callback(response.data));
};


