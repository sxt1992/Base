var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const entryFile="c1";

module.exports = {
    entry: "./"+entryFile+'/app.js',
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
        extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
    },    
    plugins: [
        new ExtractTextWebpackPlugin('css/[name].css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, entryFile+"/index.html"),
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from:path.join(__dirname, entryFile+"/images"),
                to:path.join(__dirname, 'dist'+"/images")
            }
        ])
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        inline: true,
        port: '3000',
        outputPath: path.join(__dirname,'dist')
    }
};