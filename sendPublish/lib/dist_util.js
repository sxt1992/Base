'use strict';

/**
 * 1. 校验 dist 文件夹是否存在
 * 2. 检查 js 文件名是否存在于 html 中
 */
const fs = require('fs');

const glob = require('glob');

const globalData = require('./global_data.js');

module.exports = {
    checkAsync: function (done) {
        done = done || globalData.defaultCallback;

        if (this._checkDistFolder() &&
            this._checkAssetsExist() &&
            this._checkAssetsInHtml()) {
            return done();
        }

        return done(new Error('校验 dist 文件夹失败'));
    },

    /**
     * 获取 dist 下 html 名称
     */
    getHtmlNames () {
        return glob.sync('**/*.html', {
            cwd: globalData.DIST_FOLDER
        });
    },

    /**
     * 检查 js css 文件是否存在
     */
    _checkAssetsExist () {
        // TODO
        return true;
    },

    /**
     * 检查 js css 文件名是否存在于 html 中
     */
    _checkAssetsInHtml () {
        // TODO
        return true;
    },

    /**
     * 检查 dist 文件夹目录是否存在
     */
    _checkDistFolder () {
        try {
            const distStatus = fs.statSync(globalData.DIST_FOLDER);
            if (!distStatus.isDirectory()) {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
};
