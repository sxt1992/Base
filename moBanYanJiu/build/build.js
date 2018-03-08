require('./check-versions')();

var path = require('path');
var config = require('../config');
var chalk = require('chalk')
var ora = require('ora');
var rm = require('rimraf');
var webpack = require('webpack');
var webpackConfig = require('./webpack.build.conf');

var spinner = ora('building...');
spinner.start();

rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
    if (err) throw err;

    webpack(webpackConfig, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');

        console.log(chalk.cyan('  Build complete.\n'));
    });
});
