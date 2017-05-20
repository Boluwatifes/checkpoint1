import axios from 'axios';
import jsonp from 'jsonp';
import AYLIENTextAPI from 'aylien_textapi';

/**
 * create excerpt from title
 * @function excerpt
 * @param {any} title
 * @returns {string} title
 */
export function excerpt(title) {
  return title.length > 80 ? `${title.substring(0, 50)} ...` : title;
}

/**
 * removes hyphen from source and capitalize it
 * @method cleanSource
 * @export
 * @param {any} source
 * @returns {string} - Processed source
 */
export function cleanSource(source) {
  const newSource = source.replace('-', ' ');
  return newSource.toUpperCase();
}

export function testScrape() {
  // const textapi = new AYLIENTextAPI({
  //   application_id: 'b2be1314',
  //   application_key: '1d5eee3549920bf09b95447f15f370b5'
  // });
  // textapi.extract({
  //   url: 'http://techcrunch.com/2015/04/06/john-oliver-just-changed-the-surveillance-reform-debate',
  //   best_image: true
  // }, (error, response) =>  {
  //   if (error === null) {
  //     console.log(response);
  //   }
  // });
  axios.get('https://document-parser-api.lateral.io/?url=http://www.bbc.co.uk/news/world-middle-east-39984066&subscription-key=b296f0a1bd55773dde9b5feaee0f6cf1', {
    responseType: 'json',
  }).then((data) => {
    console.log(data.data);
  }).catch((error) => {
    console.log(error);
  });
  console.log('here');
  // jsonp('http://newsify.herokuapp.com/api/article?url=https://www.bbc.co.uk/news/world-africa-16377824', null, (err, data) => {
  //   if (err) {
  //     console.error(err.message);
  //   } else {
  //     console.log(data);
  //   }
  // });
}
