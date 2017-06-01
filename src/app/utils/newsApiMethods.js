// import required dependencies
import axios from 'axios';
import Firebase from 'firebase';

/**
 * Make an api call to newsapi to get the news sources
 * @function getSourcesFromApi
 * @return {promise} sources
 */
export const getSourcesFromApi = () => (
  axios.get('https://newsapi.org/v1/sources?language=en')
    .then(response => response.data.sources)
);

/**
 * Make an api call to newsapi to get articles from a news source
 * @function getArticlesFromApi
 * @param {string} source - The news source to fetch the articles from
 * @param {string} sortBy - The filter to use on the
 * news source. Default is an empty string
 * @return {promise} callback
 */
export const getArticlesFromApi = (source, sortBy = '') => (
  axios.get('https://newsapi.org/v1/articles?' +
    `source=${source}&sortBy=${sortBy}&apiKey=213327409d384371851777e7c7f78dfe`)
    .then(response => response.data)
);

/**
 * Saves Favorites to the google realtime database
 * @function saveFavoritesToDatabase
 * @param {object} article
 * @param {string} user
 * @param {string} source
 * @return {callback} - Calls firebase api
 */
export const saveFavoritesToDatabase = (article, user, source) => {
  const title = article.title.replace(/\.|-|,|\/|@|#|\$|%|\^\*\(\)!|`|~/g, 'a');
  return Firebase.database().ref(`favorites/${user}/${title}`).update({
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
 * @param {func} callback
 * @return {callback} - promise
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

export /**
 * deletes an article from the list of a user favorites
 * @function deleteFavoriteFromDatabase
 * @param {string} title
 * @param {string} userId
 * @return {void}
 */
const deleteFavoriteFromDatabase = (title, userId) => {
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

export /**
 * Get the content of a specific article from api
 * @function scrapeArticle
 * @param {string} url
 * @return {object} article
 */
const scrapeArticle = url => (
  axios.get('https://document-parser-api.lateral.io/' +
  `?url=${url}&subscription-key=b296f0a1bd55773dde9b5feaee0f6cf1`, {
    responseType: 'json',
  }).then(data => data.data).catch(() => 'error')
);

