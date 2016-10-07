const webpack = require('webpack');
module.exports = {
    entry: './src/',
    output: {
        /*path: __dirname + '/dist/',
        filename: 'app.bundle.js'*/
        path:     './dist',
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '../dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                query: { compact: false }
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:false
            },
            output: {
                comments:false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // Move dependencies to our main file
            name: 'main',
            // Look for common dependencies in all children,
            children: true,
            // How many times a dependency must come up before being extracted
            minChunks: 2
        })
    ]
};