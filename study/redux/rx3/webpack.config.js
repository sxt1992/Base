var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "js/bundle.js"
    },
    module: {
        loaders: [
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
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
    },    
    plugins: [
        new ExtractTextWebpackPlugin('css/[name].css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            inject: true
        })
    ],
    devtool: '#cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        inline: true,
        port: '3000'
    }
};