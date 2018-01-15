var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var projectConfig = require('../config/project.config');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

var htmlWebpackPlugins = utils.generateDevHtmls(projectConfig.singlePage,
    projectConfig.multiPageNames).map(function (config) {
        return new HtmlWebpackPlugin(config)
    });

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: false })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.globalConfig
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ].concat(htmlWebpackPlugins)
});
