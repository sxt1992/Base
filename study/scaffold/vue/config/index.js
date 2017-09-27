const path = require('path');

const env = process.env.BUILD_ENV || 'dev';
// 根据 BUILD_ENV 选择配置
const buildCfg = require(`./${env}.cfg.js`);
const projectCfg = require('./project.cfg');
const urlsCfg = require('./urls.cfg');

module.exports = Object.assign({}, {
  env,
  index: path.resolve(__dirname, '../dist/index.html'),
  assetsPath: path.resolve(__dirname, '../dist'),
  assetsStatic: 'static',
  assetsPublicPath: './',

  filename: projectCfg.hash ? 'js/[name].js?ts=[chunkhash]' : 'js/[name].[chunkhash].js',
  chunkFilename: projectCfg.hash ? 'js/[id].js?ts=[chunkhash]' : 'js/[id].[chunkhash].js',
  cssFilename: projectCfg.hash ? 'css/[name].css?ts=[contenthash]' : 'css/[name].[contenthash].css',

  globalCfg: {
    URLS: JSON.stringify(urlsCfg[env]),
  },
}, buildCfg);
