const path = require('path');
const EslintFriendlyFormatter = require('eslint-friendly-formatter');
const config = require('../config');
const utils = require('./utils');


function resolve(dir) {
    return path.posix.join(__dirname, '..', dir);
}
const entry = { main: './src/main.js' };

module.exports = {
    entry,
    output: {
        path: config.assetsPath,
        publicPath: config.assetsPublicPath,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join(config.assetsStatic, 'img/[name].[hash:7].[ext]'),
                },
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join(config.assetsStatic, 'fonts/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css', '.scss', '.sass', '.less'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': resolve('src')
        }
    },
};