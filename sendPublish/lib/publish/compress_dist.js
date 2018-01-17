/* eslint-disable max-len */
'use strict';

const execSync = require('child_process').execSync;

const debug = require('debug')('lib/compress_dist');

const globalData = require('../global_data.js');

module.exports = {
    run: function (done) {
        done = done || globalData.defaultCallback;

        try {
            this._generateGzFile();
            return done();
        } catch (e) {
            return done(new Error('生成压缩包失败'));
        }
    },

    /**
     * 生成需要发布的压缩文件
     *
     *  1. 生成 projectName-version 的文件夹
     *  2. dist 目录放入这个文件夹
     *  3. meta 信息放入这个文件夹
     */
    _generateGzFile () {
        try {
            execSync(`mkdir -p ${globalData.GZ_FILES_FOLDER}`);
        } catch (e) {

        }

        execSync(`cd ${globalData.PROJECT_ROOT} && cp -r ${globalData.DIST_FOLDER} ${globalData.GZ_FILES_FOLDER}/dist`);

        // tar 命令打包，打包的文件名不能有 / 开头
        const cmd = `cd ${globalData.GZ_FOLDER_NAME} && zip -qr ${globalData.GZ_FILENAME} dist meta.json && mv ./${globalData.GZ_FILENAME} ../`;
        debug(`生成压缩包命令: ${cmd}`);

        execSync(cmd, { stdio: 'inherit' });
    },

    /**
     * 删除发布的 gz 压缩文件，以及临时生成的目录
     */
    removeGzipFile () {
        // TODO 可以在升级脚本中，添加到 gitignore 中
        try {
            execSync(`rm -rf ${globalData.GZ_FILES_FOLDER}`);
            execSync(`rm ${globalData.GZ_FULL_FILENAME}`, { stdio: 'inherit' });
        } catch (e) {

        }
    }
};
