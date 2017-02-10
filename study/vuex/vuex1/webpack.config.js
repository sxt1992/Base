let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let WebpackDevServer=require('webpack-dev-server');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: "js/bundle.js"
    },
    module: {
        loaders: [
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test:/\.vue$/,
                loader:'vue'
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('css/[name].css',{allChunks:true}),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            inject:true
        })
    ],
    devServer: {
        contentBase: '../dist',
        hot: true,
        inline: true,
        port: '3000'
    }
};