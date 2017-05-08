const path = require('path');
const express = require('express');

module.exports = {
  app: () => {
    const app = express();
    const indexPath = path.join(__dirname, '/src/public/index.html');
    const publicPath = express.static(path.join(__dirname, '/src/public'));

    app.use('/', publicPath);
    app.get('*', (_, res) => { res.sendFile(indexPath); });
    return app;
  },
};
