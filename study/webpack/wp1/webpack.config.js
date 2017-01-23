var webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob');

const debug = process.env.NODE_ENV !== 'production';

function entries(globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }

    return entries;
}

module.exports = {
    entry: entries('src/**/*.js'),
    output: {
        path: path.join(__dirname, '..', 'public', 'assets', 'build'),
        publicPath: '/assets/build/',
        filename: '[name]' + (debug ? '' : '-[chunkhash]') + '.js',
        chunkFilename: '[id]' + (debug ? '' : '-[chunkhash]') + '.js'
    },
    module: {
        loaders: [
            {}
        ]
    },
    plugins: []
};