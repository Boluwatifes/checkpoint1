import sampleSources from './sampleSources.json';
import sampleArticles from './sampleArticles.json';

const axiosMock = {
  get(args) {
    const resolved = false;
    return args.includes('source') ? Promise((resolve, reject) => {
      if (!resolved) reject();
      resolve(sampleArticles);
    }) : Promise((resolve, reject) => {
      if (!resolved) reject();
      resolve(sampleSources);
    });
  }
};

// const getSourcesFromApi = callback => Promise.resolve(callback(sampleData));

export default axiosMock;
