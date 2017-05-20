// import required dependencies
import axios from 'axios';
import Firebase from 'firebase';

/**
 * Make an api call to newsapi to get the news sources
 * @function apiAll
 * @param {function} callback - Function to process the data
 * @return {promise} callback
 */
export const getSourcesFromApi = (callback) => {
  axios.get('https://newsapi.org/v1/sources?language=en')
    .then(response => callback(response.data.sources));
};

/**
 * Make an api call to newsapi to get articles from a news source
 * @function apiOne
 * @param {string} source - The news source to fetch the articles from
 * @param {string} sortBy - The filter to use on the news source. Default is an empty string
 * @param {function} callback - Function to process the data
 * @return {promise} callback
 */
export const getArticlesFromApi = (source, sortBy = '', callback) => {
  axios.get(`https://newsapi.org/v1/articles?source=${source}&sortBy=${sortBy}&apiKey=213327409d384371851777e7c7f78dfe`)
    .then(response => callback(response.data));
};

/**
 * Saves Favorites to the google realtime database
 * @param {object} article
 * @param {string} user
 * @return {callback} - Calls firebase api
 */
export const saveFavoritesToDatabase = (article, user, source) => {
  const title = article.title.replace(/\.|-|,|\/|@|#|\$|%|\^\*\(\)!|`|~/g, 'a');
  Firebase.database().ref(`favorites/${user}/${title}`).update({
    title,
    source,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    author: article.author,
    publishedAt: article.publishedAt,
  });
};

/**
 * Gets Favorites from database
 * @param {string} user
 * @return {callback} - Calls firebase api
 */
export const getFavoritesFromDatabase = (user, callback) => {
  const ref = Firebase.database().ref().child(`favorites/${user}`);
  ref.once('value', (snap) => {
    const dataFromDb = snap.val();
    const processedData = [];
    for (const data in dataFromDb) {
      const tempData = {};
      tempData.title = dataFromDb[data].title;
      tempData.description = dataFromDb[data].description;
      tempData.url = dataFromDb[data].url;
      tempData.urlToImage = dataFromDb[data].urlToImage;
      tempData.author = dataFromDb[data].author;
      tempData.publishedAt = dataFromDb[data].publishedAt;
      tempData.source = dataFromDb[data].source;
      processedData.push(tempData);
    }
    callback(processedData);
  });
};

export const deleteFavoriteFromDatabase = (title, userId) => {
  Firebase.database().ref(`favorites/${userId}/${title}`).update({
    title: null,
    source: null,
    description: null,
    url: null,
    urlToImage: null,
    author: null,
    publishedAt: null,
  });
};

