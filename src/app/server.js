const Server = require('../../server.js');

const port = (process.env.PORT || 8000);

const app = Server.app();

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  const webpack = require('webpack');
  /* eslint-disable import/no-extraneous-dependencies */
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../../webpack.config.js');
  const compiler = webpack(config);
  /* eslint-disable global-require */

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist,
  }));
}

app.listen(port);
