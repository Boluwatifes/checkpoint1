import axios from 'axios';

export const apiAll = (callback) => {
  axios.get('https://newsapi.org/v1/sources?language=en')
    .then((response) => {
      callback(response.data.sources);
    });
};

export const apiOne = (source, callback) => {
  axios.get(`https://newsapi.org/v1/articles?source=${source}&apiKey=213327409d384371851777e7c7f78dfe`)
    .then((response) => {
      callback(response.data.articles);
    });
};

