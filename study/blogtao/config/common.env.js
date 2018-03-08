var path = require('path');
var projectConfig = require('./project.config');

var filenameFormat = projectConfig.hash ? 'js/[name].js?ts=[chunkhash]' : 'js/[name].[chunkhash].js';
var chunkFilenameFormat = projectConfig.hash ? 'js/[id].js?ts=[chunkhash]' :  'js/[id].[chunkhash].js';
var cssFilenameFormat = projectConfig.hash ? 'css/[name].css?ts=[contenthash]' : 'css/[name].[contenthash].css';

module.exports = {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '.',

    filenameFormat: filenameFormat,
    chunkFilenameFormat: chunkFilenameFormat,
    cssFilenameFormat: cssFilenameFormat
};
