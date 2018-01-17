/* eslint-disable dot-notation */
'use strict';

const path = require('path');

const axios = require('axios');
const chalk = require('chalk');
const semver = require('semver');

const globalData = require('./global_data.js');

const localVersion = require(path.resolve(__dirname, '../package.json')).version;

module.exports = {
    run: function (done) {
        done = done || globalData.defaultCallback;

        axios.get('http://registry.npm.souche-inc.com/@souche-f2e/souche-publish', {
            timeout: 5000
        }).then(function (resp) {
            const respData = resp.data;
            const latestVersion = respData['dist-tags']['latest'];

            if (semver.gt(latestVersion, localVersion)) {
                console.log('');
                console.log(chalk.yellow('[Outdated]: A newer version of souche-publish is available.'));
                console.log('  latest:    ' + chalk.green(latestVersion));
                console.log('  installed: ' + chalk.red(localVersion));
                console.log(chalk.yellow('更新命令：'));
                console.log(chalk.yellow('$ npm install -g @souche-f2e/souche-publish --registry=http://registry.npm.souche-inc.com'));
                console.log('');

                return done(new Error('需要更新 souche-publish 版本'));
            }

            done();
        }).catch(function () {
            console.log(chalk.red('检查 souche-publish 版本信息失败\n'));
            done(new Error('检查 souche-publish 最新版本失败'));
        });
    }
};
