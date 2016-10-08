const webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/main.jsx'
    },
    output: {
        /*path: __dirname + '/dist/',
        filename: 'app.bundle.js', */
        filename: '[name].js',
        path:'./src/'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                query: { compact: false }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss/,
                //loader: 'style!css!sass',
                // Or
                loaders: ['style', 'css', 'sass'],
            },
            {
                test: /\.html/,
                loader: 'html',
            }
        ]
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:false
            },
            output: {
                comments:false
            }
        })*/
        /*new HtmlwebpackPlugin({
            title: 'Webpack-demos',
            filename: 'index.html'
        }),*/
        new OpenBrowserPlugin({
            url: 'http://localhost:8080/src/'
        })
    ]
};