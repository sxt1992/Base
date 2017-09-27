// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  // entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, './dist/'),
    // publicPath: 'http://www.baidu.com/',
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: /src/,
        loader: 'eslint-loader',
        options: {
          formatter: EslintFriendlyFormatter,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true,
      //   },
      chunksSortMode: 'dependency',
    }),
  ],
};
