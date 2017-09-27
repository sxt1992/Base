const webpack = require('webpack');
const merge = require('webpack-merge');
const baseCfg = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

Object.keys(baseCfg.entry).forEach((name) => {
  baseCfg.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true', 'babel-polyfill'].concat(baseCfg.entry[name]);
});

const htmlWebpackPlugins = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './src/index.pc.html',
  inject: true,
});

module.exports = merge(baseCfg, {
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ].concat(htmlWebpackPlugins),
});
