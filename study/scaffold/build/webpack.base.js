var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
    return path.posix.join(__dirname, '..', dir)
}

module.exports = {
    entry: "./"+entryFile+'/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "js/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: '/font/[name]-[hash:8].[ext]'
                }
            },
            {
    　　　　　　test: /\.(png|jpg)$/,
    　　　　　　loader: 'url-loader',
    　　　　　　query: {
                    limit: 8192,
                    name: '/images2/[hash:8].[name].[ext]'
                }
    　　　　}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    }
};