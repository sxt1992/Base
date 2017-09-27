const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const opn = require('opn');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

let webpackConfig = require('./webpack.dev');
const config = require('../config');

webpackConfig = merge(webpackConfig, {
  output: {
    publicPath: '/',
  },
});

const compiler = webpack(webpackConfig);

const app = express();

const staticPath = path.posix.join(webpackConfig.output.publicPath, config.assetsStatic);
app.use(staticPath, express.static('./static'));

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: { colors: true },
  publicPath: webpackConfig.output.publicPath,
});

const hotMiddleware = WebpackHotMiddleware(compiler, {
  log: console.log,
});

app.use(devMiddleware);
app.use(hotMiddleware);

const router = express.Router();
router.get('/', (req, res, next) => {
  // res.render('index', { message: 'Hey there!' });
  next();
});
app.use(router);

const uri = 'http://localhost:8080';

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
  opn(uri);
});

app.listen(8080, () => {
  console.log('Listening on 8080');
});
