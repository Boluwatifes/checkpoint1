import axios from 'axios';

// export default function apiAll() {
//   axios.get('https://newsapi.org/v1/sources?language=en').then((response) => {
//     return response.data.source;
//   });
// }

const apiAll = (callback) => {
  axios.get('https://newsapi.org/v1/sources?language=en')
    .then((response) => {
      callback(response.data.sources);
    });
};

export default apiAll;
